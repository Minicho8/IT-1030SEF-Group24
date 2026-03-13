var pluralize = typeof require === "function" ? require("pluralize") : window.pluralize;

//Data handeling
const IMG_STORAGE_KEY = "recipeApp.ingredients";
const RECIPE_STORAGE_KEY = "recipeApp.recipes";
const recipeCSV = 'recipes.csv';


function loadMainScript() {
    if (window.__mainScriptLoaded) return;
    window.__mainScriptLoaded = true;
    const script = document.createElement('script');
    script.defer = true;
    document.body.appendChild(script);
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    result.push(current.trim());
    return result;
}


fetch(recipeCSV, { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.text();
}).then(text => {
    try {
        const lines = text.trim().split('\n');
        const objects = lines.slice(1).map(line => {
            const row = parseCSVLine(line);
            return {recipeName: row[0],timeSlot: row[1],source: row[2],ingredients: row[3],cuisine: row[4],difficulty: row[5],recipeUrl: row[6],recipeImg: row[7] || '',  };
        });

        localStorage.removeItem(RECIPE_STORAGE_KEY);
        localStorage.setItem(RECIPE_STORAGE_KEY, JSON.stringify(objects));

        console.log(`✅ 已自动从 ${recipeCSV} 导入数据`);
    } catch (e) {
        console.error('解析 recipeApp.recipes 时出错', e);
    } finally {
        loadMainScript();
    }
})
.catch(err => {
    console.warn(`自动导入 recipeApp.Recipes 失败 (${err.message})，将使用现有 localStorage 数据或空列表。`);
    loadMainScript();
});



function loadIngredientsFromStorage() {
  try {
    const raw = localStorage.getItem(IMG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveIngredientsToStorage(list) {
  localStorage.setItem(IMG_STORAGE_KEY, JSON.stringify(list));
}

let ingredients = loadIngredientsFromStorage();
if (ingredients.length === 0 && typeof defaultIngredients !== 'undefined') {
  ingredients = defaultIngredients;
  saveIngredientsToStorage(ingredients);
}

// Search bar 
function clearSearch(inputId) {
    const searchInput = document.getElementById(inputId);
    searchInput.value = '';
    document.getElementsByClassName('search')[0].classList.remove('show');
    buildView('left');
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
    name: data.name.trim()[0].toUpperCase() + data.name.trim().slice(1).toLowerCase(),
    category: data.category,
    qty: Number(data.qty),
    unit: data.unit,
    expiry: data.expiry || "",
    minQty: Number(3),
    //minQty: Number(data.minQty ?? 1),
  };
  ingredients = [item, ...ingredients];
  saveIngredientsToStorage(ingredients);
  buildView('left');
}

// async function fetchIngData(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching JSON:', error);
//     }
// }

// fetchIngData('./ingredients.txt').then(data => {
//     ingredients = new Set([...data]);
// });
// function searchIngredients(key) {
//     const lowerKeyword = key.trim().toLowerCase();
//     return ingredients.filter(i => i.name.toLowerCase().includes(lowerKeyword));
// }

function deleteExistingIngredient(id) {
    ingredients = ingredients.filter((x) => x.id !== id);
    saveIngredientsToStorage(ingredients);
    buildView('left');
}

function updateIngredientExpiry(id, expiry) {
        ingredients = ingredients.map((item) => item.id === id ? { ...item, expiry } : item);
        saveIngredientsToStorage(ingredients);
        buildView('left');
}

function openSetExpiryModal(item) {
    document.getElementById('setExpiryIngredientId').value = item.id;
    document.getElementById('setExpiryDate').value = item.expiry || '';
    document.getElementById('setExpiryTarget').textContent = `Ingredient: ${item.name}`;
    document.getElementById('setExpiryModal').showModal();
}

function closeSetExpiryModal() {
    if (document.getElementById('setExpiryModal').open) {
        document.getElementById('setExpiryModal').close();
    }
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
            console.log('Filtering', i.name, 'with expiry', i.expiry, 'which is in', d, 'days');
            if ((expiry === "expired" && d <= 0) || i.expiry === "") return false;
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

const FILTER_DEFAULTS = {
    filterCategory: 'all',
    filterExpiry: 'all',
    sortBy: 'expiryAsc',
    lowStockOnly: false,
    ingredientSearch: ''
};

function checkResetBtn() {
    const changed =
        document.getElementById('filterCategory').value !== FILTER_DEFAULTS.filterCategory ||
        document.getElementById('filterExpiry').value !== FILTER_DEFAULTS.filterExpiry ||
        document.getElementById('sortBy').value !== FILTER_DEFAULTS.sortBy ||
        document.getElementById('lowStockOnly').checked !== FILTER_DEFAULTS.lowStockOnly ||
        document.getElementById('ingredientSearch').value !== FILTER_DEFAULTS.ingredientSearch;
    document.getElementById('resetFiltersBtn').hidden = !changed;
}

function buildView(view) {
    switch (view) {
        case 'left':
        checkResetBtn();
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
                                <button class="red-btn" data-action="delete" type="button">Delete</button>
                            </div>
                        </div>
                        <div class="ingredient-subtitle">
                            ${item.category} · <strong>${item.qty}</strong> ${item.unit}
                            ${item.expiry ? `· expires ${item.expiry}` : ``}
                        </div>

                        <div class="stock-controls">
                            <label class="stock-label">Adjust</label>
                            <button class="stock-btn" data-action="useAmount" type="button">Use</button>
                            <!-- <button class="stock-btn" data-action="addAmount" type="button">Add</button> -->
                            
                            <input class="stock-input" id="adj-${item.id}" data-role="adjustAmount" type="number" min="0" step="1" value="1" inputmode="decimal">
                            <span class="stock-unit">${item.unit}</span>
                            <button class="red-btn" data-action="setExpiry" type="button"><i class='fa fa-pencil'></i> Expires</button>
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
    //document.getElementById("ingMinQty").value = "0";
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
        txtValue = (a.textContent || a.innerText);
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
document.getElementById('ingredientsList').addEventListener('click', function(event) {
    const actionEl = event.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.getAttribute('data-action');
    const itemEl = actionEl.closest('li[data-id]');
    if (!itemEl) return;

    const id = itemEl.getAttribute('data-id');
    console.log('Clicked element action:', action);

    switch (action) {
        case "delete": {
            deleteExistingIngredient(id);
            console.log('Deleted ingredient with id:', id);
            break;
        }
        case "setExpiry": {
            const item = ingredients.find((x) => x.id === id);
            if (!item) return;

            openSetExpiryModal(item);
            break;
        }
        case "useAmount": {
            const useId = id;
            break;
        }
    }
});
document.getElementById('filterCategory').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('filterExpiry').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('ingredientSearch').addEventListener('input', buildView.bind(null, 'left'));
document.getElementById('lowStockOnly').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('sortBy').addEventListener('change', buildView.bind(null, 'left'));


//Add new ingredient modal
document.getElementById('add-btn').addEventListener("click", openAddModal);
document.getElementById('btnCancelModal').addEventListener("click", closeModal);
document.getElementById('btnCancelSetExpiry').addEventListener('click', closeSetExpiryModal);

document.getElementById('btnClearSetExpiry').addEventListener('click', function () {
    const id = document.getElementById('setExpiryIngredientId').value;
    if (!id) return;

    updateIngredientExpiry(id, '');
    closeSetExpiryModal();
});

document.getElementById('setExpiryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('setExpiryIngredientId').value;
    if (!id) return;

    const nextExpiry = document.getElementById('setExpiryDate').value || '';
    updateIngredientExpiry(id, nextExpiry);
    closeSetExpiryModal();
});

document.getElementById("ingredientForm").addEventListener("submit", function(s) {
  s.preventDefault();

  addNewIngredient({
    name: document.getElementById("ingName").value,
    category: document.getElementById("ingCategory").value,
    qty: document.getElementById("ingQty").value,
    unit: document.getElementById("ingUnit").value,
    expiry: document.getElementById("ingExpiry").value,
    //minQty: document.getElementById("ingMinQty").value,
  });

  closeModal();
});

//Initial build
buildView('left');

document.getElementById('resetFiltersBtn').addEventListener('click', function () {
    document.getElementById('filterCategory').value  = FILTER_DEFAULTS.filterCategory;
    document.getElementById('filterExpiry').value    = FILTER_DEFAULTS.filterExpiry;
    document.getElementById('sortBy').value          = FILTER_DEFAULTS.sortBy;
    document.getElementById('lowStockOnly').checked  = FILTER_DEFAULTS.lowStockOnly;
    document.getElementById('ingredientSearch').value = FILTER_DEFAULTS.ingredientSearch;
    document.getElementsByClassName('search')[0].classList.remove('show');
    buildView('left');
});

// ===== MOOD CHECK =====
function openMoodModal() {
    const questions = [
        "How are you feeling right now?",
        "What's your mood today?",
        "How's your day going so far?"
    ];
    document.getElementById('moodQuestion').textContent =
        questions[Math.floor(Math.random() * questions.length)];
    // clear any previous selection
    document.querySelectorAll('input[name="mood"]').forEach(r => r.checked = false);
    document.getElementById('moodModal').showModal();
}

function initMood() {
    const MOOD_DATE_KEY = 'food_wise_date';
    const MOOD_VAL_KEY  = 'food_wise_mood';
    const today = new Date().toLocaleDateString('en-GB');

    document.getElementById('moodForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="mood"]:checked');
        if (!selected) { alert('Please select your mood.'); return; }
        localStorage.setItem(MOOD_VAL_KEY, selected.value);
        localStorage.setItem(MOOD_DATE_KEY, today);
        document.getElementById('moodModal').close();
    });

    document.getElementById('btnSkipMood').addEventListener('click', function () {
        localStorage.setItem(MOOD_DATE_KEY, today);
        document.getElementById('moodModal').close();
    });

    const lastDate = localStorage.getItem(MOOD_DATE_KEY);
    if (lastDate !== today) openMoodModal();
};
initMood();

document.getElementById('changeMoodBtn').addEventListener('click', openMoodModal);


// ===== RIGHT PANEL: Meal & Difficulty Selector + Analyse =====

document.getElementById('analyseBtn').addEventListener('click', function () {
    const mealValue = document.getElementById('mealGroup').value;
    const selectedMeals = mealValue ? [mealValue] : [];

    const difficultyLevel = parseInt(document.getElementById('difficultyGroup').value, 10);
    // Cascade: level N includes all levels 0..N
    const selectedDifficulties = Array.from({ length: difficultyLevel + 1 }, (_, i) => String(i));

    if (selectedMeals.length === 0) {
        alert('Please select a meal time.');
        return;
    }

    let recipes = [];
    try {
        const raw = localStorage.getItem('recipeApp.recipes');
        recipes = raw ? JSON.parse(raw) : [];
    } catch (e) { recipes = []; }
    const analyseIngs = [...ingredients];
    const matchingIngs = analyseIngs.map(i => i.name.toLowerCase());

    const filtered = recipes.filter(r => {
        const mealMatch = selectedMeals.some(m => String(r.timeSlot) === String(m));
        const diffMatch = selectedDifficulties.includes(String(r.difficulty));
        return mealMatch && diffMatch;
    });

  const expiryFirst = document.getElementById('expiryFirst').checked;

  // Build a lookup: ingredient name (lowercase) → days left
  const expiryMap = {};
  for (const ing of ingredients) {
    expiryMap[ing.name.toLowerCase()] = ing.expiry ? daysleft(ing.expiry) : Infinity;
  }

  const results = filtered.map(r => {
    const formatIngs = (r.ingredients || '')
      .split(",")
      .map(s => pluralize.singular(s.trim().toLowerCase()))
      .filter(Boolean);
    console.log('Checking recipe:', r.recipeName, 'with ingredients', formatIngs);
    const matched = formatIngs.filter(ri =>
      matchingIngs.some(p => ri.includes(p))
    );
    const matchRatio = formatIngs.length > 0 ? matched.length / formatIngs.length : 0;
    // Urgency: minimum days-left among matched ingredients (lower = more urgent)
    const urgencyScore = matched.length > 0
      ? Math.min(...matched.map(ri => {
          const key = Object.keys(expiryMap).find(p => ri.includes(p));
          return key !== undefined ? expiryMap[key] : Infinity;
        }))
      : Infinity;
    return { ...r, matched, formatIngs, matchRatio, urgencyScore };
  });

  if (expiryFirst) {
    results.sort((a, b) => a.urgencyScore - b.urgencyScore || b.matchRatio - a.matchRatio);
  } else {
    results.sort((a, b) => b.matchRatio - a.matchRatio || Math.random() - 0.5);
  }

  let html = `<h3 class="results-heading">Showing top 10 suggested recipe(s) of ${results.length} found  recipe(s)</h3>`;
  if (results.length === 0) {
    html += `<p class="no-results">No recipes found for the selected filters.</p>`;
  }
  for (const r of results.slice(0, 10)) {
    const pct = Math.round(r.matchRatio * 100);
    html += `
      <div class="recipe-card">
        ${r.recipeImg
          ? `<img src="${r.recipeImg}" class="recipe-img" onerror="this.style.display='none'">`
          : ''}
        <div class="recipe-info">
          <div class="recipe-title">${r.recipeName || 'Unknown'}</div>
          <div class="recipe-meta">
            ${r.timeSlot || ''} · ${r.cuisine || 'Unknown'} Cuisine · Difficulty: ${r.difficulty ?? ''}
          </div>
          <div class="recipe-match">
            <div class="match-bar">
              <div class="match-fill" style="width:${pct}%"></div>
            </div>
            <span class="match-pct">${pct}% match (${r.matched.length}/${r.formatIngs.length})</span>
          </div>
          <div class="ing-chips">
            ${r.formatIngs.map(ing => {
              const isMatched = r.matched.includes(ing);
              return `<span class="ing-chip ${isMatched ? 'ing-chip-ok' : 'ing-chip-missing'}">${ing}</span>`;
            }).join('')}
          </div>
          ${r.recipeUrl
            ? `<a href="${r.recipeUrl}" target="_blank" class="recipe-link">View Recipe →</a>`
            : ''}
        </div>
      </div>`;
  }
  document.getElementById('analyseResults').innerHTML = html;

  // Switch right panel to results view
  const mealLabel = document.getElementById('mealGroup').options[document.getElementById('mealGroup').selectedIndex].text;
  document.querySelector('.right-title').textContent = 'Recipe — ' + mealLabel;
  document.querySelector('.right-controls .form').style.display = 'none';

  // Add Analyse Again button
  const againBtn = document.createElement('button');
  againBtn.id = 'analyseAgainBtn';
  againBtn.type = 'button';
  againBtn.className = 'analyse-again-btn';
  againBtn.innerHTML = '<i class="fa fa-refresh"></i> Analyse Again';
  againBtn.addEventListener('click', function () {
      document.getElementById('analyseResults').innerHTML = '';
      document.querySelector('.right-title').textContent = 'Recipe';
      document.querySelector('.right-controls .form').style.display = '';
  });
  document.getElementById('analyseResults').prepend(againBtn);
});