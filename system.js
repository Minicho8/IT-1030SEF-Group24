
const STORAGE_KEY = "recipeApp.ingredients";

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

// Search bar 
function clearSearch(inputId) {
    const searchInput = document.getElementById(inputId);
    searchInput.value = '';
    //filterList('');
    document.getElementsByClassName('search')[0].classList.remove('show');
}

// Ingredients left panel

function uid() {
    return Math.random().toString(16).slice(2) + Date.now().toString(16);
}
function isLowStock(ingredient) {
    return ingredient.qty <= ingredient.minQty;
}
function daysleft(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysDiff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysDiff;
}
function expiryTag(ingredient) {
    if (ingredient.expiry === "") return { text: "No expiry", status: "tag-g" };
    const d = daysleft(ingredient.expiry);
    if (d < 0) return { text: "Expired", status: "tag-r" };
    if (d <= 7) return { text: "≤ 1 week", status: "tag-r" };
    if (d <= 30) return { text: "≤ 1 month", status: "tag-y" };
    return { text: `${d} days`, status: "tag-g" };
}
function addNewIngredient(data) {
  const item = {
    id: uid(),
    name: data.name.trim().toLowerCase(),
    category: data.category,
    qty: Number(data.qty),
    unit: data.unit,
    expiry: data.expiry || "",
    minQty: Number(data.minQty ?? 1),
  };
  ingredients = [item, ...ingredients];
  saveIngredientsToStorage(ingredients);
  buildView('left');
}

function deleteExistingIngredient(id) {
  ingredients = ingredients.filter((x) => x.id !== id);
  saveIngredientsToStorage(ingredients);
  buildView('left');
}

function filterIngredients(list, {category, expiry, search, lowStockOnly}) {
    const searchkey = (search || "").trim().toLowerCase();
    return list.filter((i) => {
        if (category && category !== "all" && i.category !== category) return false;
        if (searchkey && !i.name.toLowerCase().includes(searchkey)) return false;
        if (lowStockOnly && !isLowStock(i)) return false;
        if (expiry === "all") return true;
        if (expiry) {
            const d = daysleft(i.expiry);
            if (expiry === "expired" && d <= 0) return false;
            if (expiry === "week" && d > 7) return false;
            if (expiry === "month" && d > 30) return false;
            if (expiry === "halfYear" && d > 183) return false;
        }
        return true;
    });
}
function sortIngredients(list,sortBy) {
    const temp = [...list];
    switch (sortBy) {
    case "nameAsc":
      temp.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "expiryDesc":
      temp.sort((a, b) => (daysleft(b.expiry)) - (daysleft(a.expiry)));
      break;
    case "stockLowFirst":
      temp.sort((a, b) => a.qty - b.qty);
      break;
    case "expiryAsc":
    default:
      temp.sort((a, b) => (daysleft(a.expiry)) - (daysleft(b.expiry)));
      break;
  }

  return temp;

}
function updateIngredientsView() {
    const filtered = filterIngredients(ingredients, {
        category: document.getElementById('filterCategory').value,
        expiry: document.getElementById('filterExpiry').value,
        search: document.getElementById('ingredientSearch').value,
        lowStockOnly: document.getElementById('lowStockOnly').checked
    });

    return sortIngredients(filtered, document.getElementById('sortBy').value);
}
function buildView(view) {
    switch (view) {
        case 'left':
        const viewdata = updateIngredientsView();
        let viewlist = "";
            for (const item of viewdata) {
                const tag = expiryTag(item);
                const lowStock = isLowStock(item);
                viewlist += `
                <li class="ingredient" data-id="${item.id}">
                    <div>
                        <div class="ingredient-top">
                            <div class="ingredient-title">
                                <span class="ingredient-name" title="${item.name}">${item.name}</span>
                                <span class="tag ${tag.status}">${tag.text}</span>
                                ${lowStock ? `<span class="tag tag-y">Low stock</span>` : ``}
                                
                            </div>
                            <div class="ingredient-actions">
                                <button class="ingredient-delete" data-action="delete" type="button">Delete</button>
                            </div>
                        </div>
                        <div class="ingredient-subtitle">
                            ${item.category} · <strong>${item.qty}</strong> ${item.unit}
                            ${item.expiry ? `· expires ${item.expiry}` : ``}
                        </div>

                        <div class="stock-controls">
                            <label class="stock-label">Adjust</label>
                            <button class="stock-btn" data-action="useAmount" type="button">Use</button>
                            <button class="stock-btn" data-action="addAmount" type="button">Add</button>
                            
                            <input class="stock-input" id="adj-${item.id}" data-role="adjustAmount" type="number" min="0" step="1" value="1" inputmode="decimal">
                            <span class="stock-unit">${item.unit}</span>
                        </div>
                    </div> 
                </li>`;
            }
            document.getElementById("ingredientsList").innerHTML = viewlist;
            break;
            
        case 'right':

    }
}

function openAddModal() {
    document.getElementById("ingredientForm").reset();
    document.getElementById("ingQty").value = "1";
    document.getElementById("ingMinQty").value = "0";
    document.getElementById("ingredientModal").showModal();
}

function closeModal() {
  if (document.getElementById("ingredientModal").open) {
    document.getElementById("ingredientModal").close();
  }
}
//** */
function filterform() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && li.length > 0) {
        li[i].style.display = "";
        } else {
        li[i].style.display = "none";
        }
    }
}


const leftView = document.getElementById('ingredientsList');
const rightView = document.getElementById('ingredientDetails');

//Left view functions
document.getElementById('search-btn').addEventListener('click', function() {
    document.getElementsByClassName('search')[0].classList.toggle('show');
    if (document.getElementsByClassName('search')[0].classList.contains('show')) {
        document.getElementById('ingredientSearch').focus();
    }
});
document.getElementById('filter-btn').addEventListener('click', function() {
    document.getElementsByClassName('filter')[0].classList.toggle('show');
});
document.addEventListener('click', function(event) {

});

//Add new ingredient modal
document.getElementById('add-btn').addEventListener("click", openAddModal);
document.getElementById('btnCancelModal').addEventListener("click", closeModal);

document.getElementById("ingredientForm").addEventListener("submit", (s) => {
  s.preventDefault();

  addNewIngredient({
    name: document.getElementById("ingName").value,
    category: document.getElementById("ingCategory").value,
    qty: document.getElementById("ingQty").value,
    unit: document.getElementById("ingUnit").value,
    expiry: document.getElementById("ingExpiry").value,
    minQty: document.getElementById("ingMinQty").value,
  });

  closeModal();
});

//Initial build
buildView('left');