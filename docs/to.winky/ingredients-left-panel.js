const STORAGE_KEY = "recipeApp.ingredients.v1";

function loadIngredientsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIngredientsToStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

let ingredients = loadIngredientsFromStorage();

const els = {
  list: document.getElementById("ingredientsList"),
  summaryTotal: document.getElementById("countTotal"),
  summaryExpiring: document.getElementById("countExpiring"),

  search: document.getElementById("ingredientSearch"),
  filterCategory: document.getElementById("filterCategory"),
  filterExpiry: document.getElementById("filterExpiry"),
  sortBy: document.getElementById("sortBy"),
  lowStockOnly: document.getElementById("toggleLowStock"),

  modal: document.getElementById("ingredientModal"),
  form: document.getElementById("ingredientForm"),
  modalTitle: document.getElementById("ingredientModalTitle"),
  btnOpenAdd: document.getElementById("btnOpenAddIngredient"),
  btnCancel: document.getElementById("btnCancelModal"),

  ingName: document.getElementById("ingName"),
  ingCategory: document.getElementById("ingCategory"),
  ingQty: document.getElementById("ingQty"),
  ingUnit: document.getElementById("ingUnit"),
  ingExpiry: document.getElementById("ingExpiry"),
  ingMinQty: document.getElementById("ingMinQty"),
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function parseDateOrNull(iso) {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

function daysUntil(isoDate) {
  const d = parseDateOrNull(isoDate);
  if (!d) return null;
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const ms = d.getTime() - startToday.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function expiryBadge(ingredient) {
  const d = daysUntil(ingredient.expiry);
  if (d === null) return { text: "No expiry", cls: "badge badge--ok" };
  if (d < 0) return { text: "Expired", cls: "badge badge--danger" };
  if (d <= 7) return { text: "≤ 1 week", cls: "badge badge--danger" };
  if (d <= 30) return { text: "≤ 1 month", cls: "badge badge--warn" };
  return { text: `${d} days`, cls: "badge badge--ok" };
}

function isLowStock(ingredient) {
  return (ingredient.minQty ?? 0) > 0 && ingredient.qty <= ingredient.minQty;
}

function clampToZero(n) {
  return Math.max(0, n);
}

function readRowAmount(li) {
  const input = li.querySelector('input[data-role="adjustAmount"]');
  if (!input) return 0;
  const n = Number(input.value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

// add
function addNewIngredient(data) {
  const item = {
    id: uid(),
    name: data.name.trim(),
    category: data.category,
    qty: Number(data.qty),
    unit: data.unit,
    expiry: data.expiry || "",
    minQty: Number(data.minQty ?? 0),
  };
  ingredients = [item, ...ingredients];
  saveIngredientsToStorage(ingredients);
  render();
}

// delete
function deleteExistingIngredient(id) {
  ingredients = ingredients.filter((x) => x.id !== id);
  saveIngredientsToStorage(ingredients);
  render();
}

// filter
function filterIngredients(list, { category, expiryWindow, search, lowStockOnly }) {
  const q = (search || "").trim().toLowerCase();

  return list.filter((x) => {
    if (category && category !== "all" && x.category !== category) return false;
    if (q && !x.name.toLowerCase().includes(q)) return false;
    if (lowStockOnly && !isLowStock(x)) return false;

    if (!expiryWindow || expiryWindow === "all") return true;

    const d = daysUntil(x.expiry);
    if (d === null) return false;

    if (expiryWindow === "expired") return d < 0;
    if (expiryWindow === "week") return d >= 0 && d <= 7;
    if (expiryWindow === "month") return d >= 0 && d <= 30;
    if (expiryWindow === "halfYear") return d >= 0 && d <= 183;

    return true;
  });
}

// sort
function sortIngredients(list, sortBy) {
  const copy = [...list];

  switch (sortBy) {
    case "nameAsc":
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "expiryDesc":
      copy.sort((a, b) => (daysUntil(b.expiry) ?? 999999) - (daysUntil(a.expiry) ?? 999999));
      break;
    case "stockLowFirst":
      copy.sort((a, b) => a.qty - b.qty);
      break;
    case "expiryAsc":
    default:
      copy.sort((a, b) => (daysUntil(a.expiry) ?? 999999) - (daysUntil(b.expiry) ?? 999999));
      break;
  }

  return copy;
}

// update stock
function updateIngredientStockStatus(id, { deltaQty, setQty } = {}) {
  ingredients = ingredients.map((x) => {
    if (x.id !== id) return x;

    const current = Number(x.qty);
    const next =
      typeof setQty === "number"
        ? clampToZero(setQty)
        : clampToZero(current + Number(deltaQty || 0));

    return { ...x, qty: next };
  });

  saveIngredientsToStorage(ingredients);
  render();
}

function getViewModel() {
  const filtered = filterIngredients(ingredients, {
    category: els.filterCategory.value,
    expiryWindow: els.filterExpiry.value,
    searchText: els.search.value,
    lowStockOnly: els.lowStockOnly.checked,
  });

  return sortIngredients(filtered, els.sortBy.value);
}

function render() {
  const vm = getViewModel();

  els.list.innerHTML = vm
    .map((x) => {
      const badge = expiryBadge(x);
      const low = isLowStock(x);
      const step = x.unit === "pcs" ? "1" : "0.01";

      return `
      <li class="ingredient" data-id="${x.id}">
        <div>
          <div class="ingredient__titleRow">
             <span class="ingredient__name" title="${x.name}">${x.name}</span>
            <span class="${badge.cls}">${badge.text}</span>
            ${low ? `<span class="badge badge--warn">Low stock</span>` : ``}
          </div>

          <div class="ingredient__meta">
            ${x.category} · <strong>${x.qty}</strong> ${x.unit}
            ${x.expiry ? `· expires ${x.expiry}` : ``}
          </div>

          <div class="stockAdjust" aria-label="Adjust ingredient stock">
            <label class="stockAdjust__label" for="adj-${x.id}">Adjust</label>
            <input
              class="stockAdjust__input"
              id="adj-${x.id}"
              data-role="adjustAmount"
              type="number"
              min="0"
              step="${step}"
              value="${x.unit === "pcs" ? "1" : "0.1"}"
              inputmode="decimal"
              aria-label="Adjustment amount"
            />
            <span class="stockAdjust__unit" aria-hidden="true">${x.unit}</span>

            <button class="rowBtn" data-action="useAmount" type="button">Use</button>
            <button class="rowBtn" data-action="addAmount" type="button">Add</button>
            <button class="rowBtn" data-action="setAmount" type="button">Set</button>
          </div>
        </div>

        <div class="ingredient__actions">
          <button class="rowBtn rowBtn--danger" data-action="delete" type="button">Delete</button>
        </div>
      </li>`;
    })
    .join("");

  els.summaryTotal.textContent = String(vm.length);

  const expiringSoon = vm.filter((x) => {
    const d = daysUntil(x.expiry);
    return d !== null && d >= 0 && d <= 7;
  }).length;
  els.summaryExpiring.textContent = String(expiringSoon);
}

function openAddModal() {
  els.modalTitle.textContent = "Add ingredient";
  els.form.reset();
  els.ingQty.value = "1";
  els.ingMinQty.value = "0";
  els.modal.showModal();
}

function closeModal() {
  if (els.modal.open) els.modal.close();
}

els.btnOpenAdd.addEventListener("click", openAddModal);
els.btnCancel.addEventListener("click", closeModal);

[els.search, els.filterCategory, els.filterExpiry, els.sortBy, els.lowStockOnly].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

els.form.addEventListener("submit", (e) => {
  e.preventDefault();

  addNewIngredient({
    name: els.ingName.value,
    category: els.ingCategory.value,
    qty: els.ingQty.value,
    unit: els.ingUnit.value,
    expiry: els.ingExpiry.value,
    minQty: els.ingMinQty.value,
  });

  closeModal();
});

els.list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const li = e.target.closest("li[data-id]");
  const id = li?.dataset?.id;
  if (!id) return;

  const action = btn.dataset.action;

  if (action === "delete") {
    deleteExistingIngredient(id);
    return;
  }

  const amount = readRowAmount(li);

  if (action === "useAmount") {
    updateIngredientStockStatus(id, { deltaQty: -amount });
    return;
  }

  if (action === "addAmount") {
    updateIngredientStockStatus(id, { deltaQty: +amount });
    return;
  }

  if (action === "setAmount") {
    updateIngredientStockStatus(id, { setQty: amount });
    return;
  }
});

render();