var pluralize = typeof require === "function" ? require("pluralize") : window.pluralize;

//Data handeling
const IMG_STORAGE_KEY = "recipeApp.ingredients";
const RECIPE_STORAGE_KEY = "recipeApp.recipes";
const recipeCSV = 'recipesv4.csv';


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
            return {
                recipeName: row[0],
                timeSlot: row[1],
                source: row[2],
                ingredients: row[3],
                cuisine: row[4],
                difficulty: row[5],
                recipeUrl: row[6],
                recipeImg: row[7] || '',
            };
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

// default ingredients data for demo use & default ingredients in ingredients.js 
if (ingredients.length === 0 && typeof defaultIngredients !== 'undefined') {
    ingredients = defaultIngredients;
    saveIngredientsToStorage(ingredients);
}

// Left panel - default filter/sort values for reset button check
const FILTER_DEFAULTS = {
    filterCategory: 'all',
    filterExpiry: 'all',
    sortBy: 'expiryAsc',
    lowStockOnly: false,
    ingredientSearch: ''
};

//Left panel - top controls (search, filter, sort)
// clear search bar 
function clearSearch(inputId) {
    const searchInput = document.getElementById(inputId);
    searchInput.value = '';
    document.getElementsByClassName('search')[0].classList.remove('show');
    buildView('left');
}

//Left panel - ingredient functions
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

//add ingredient function
function addNewIngredient(data) {
    const item = {
        id: uid(),
        name: data.name.trim()[0].toUpperCase() + data.name.trim().slice(1).toLowerCase(),
        category: data.category,
        qty: Number(data.qty),
        unit: String("Servings"),
        expiry: data.expiry || "",
        minQty: Number(3)
    };
    ingredients = [item, ...ingredients];
    saveIngredientsToStorage(ingredients);
    buildView('left');
}

//delete ingredient function
function deleteExistingIngredient(id) {
    ingredients = ingredients.filter((x) => x.id !== id);
    saveIngredientsToStorage(ingredients);
    buildView('left');
}

//edit ingredient expiry function
function updateIngredientExpiry(id, expiry) {
    ingredients = ingredients.map((item) => item.id === id ? { ...item, expiry } : item);
    saveIngredientsToStorage(ingredients);
    buildView('left');
}

//update ingredient stock function (use)
function updateIngredientStock(id, use) {
    ingredients = ingredients.map((x) => {
        if (x.id !== id) return x;
        const current = Number(x.qty);
        const next = current - Number(use);
        return { ...x, qty: next };
    });
    ingredients = ingredients.filter(x => x.qty > 0);

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

//filter function
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

//sort function
function sortIngredients(list, sortBy) {
    const temp = [...list];
    switch (sortBy) {
        case "nameAsc":
            temp.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "nameDesc":
            temp.sort((a, b) => b.name.localeCompare(a.name));
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

//update left view with filters and sorting applied
function updateIngredientsView() {
    const filtered = filterIngredients(ingredients, {
        category: document.getElementById('filterCategory').value,
        expiry: document.getElementById('filterExpiry').value,
        search: document.getElementById('ingredientSearch').value,
        lowStockOnly: document.getElementById('lowStockOnly').checked
    });
    return sortIngredients(filtered, document.getElementById('sortBy').value);
}

//check if reset button should be shown
function checkResetBtn() {
    const changed =
        document.getElementById('filterCategory').value !== FILTER_DEFAULTS.filterCategory ||
        document.getElementById('filterExpiry').value !== FILTER_DEFAULTS.filterExpiry ||
        document.getElementById('sortBy').value !== FILTER_DEFAULTS.sortBy ||
        document.getElementById('lowStockOnly').checked !== FILTER_DEFAULTS.lowStockOnly ||
        document.getElementById('ingredientSearch').value !== FILTER_DEFAULTS.ingredientSearch;
    document.getElementById('resetFiltersBtn').hidden = !changed;
}

// ===== RIGHT PANEL: Meal & Difficulty Selector + Analyse =====
function scrollRightPanelToTop() {
    const rightControls = document.querySelector('.right-controls');
    if (!rightControls) return;
    rightControls.scrollTo({ top: 0, behavior: 'smooth' });
}

function suggestRecipes() {
    const mealValue = document.getElementById('mealGroup').value;
    const selectedMeals = mealValue ? [mealValue] : [];
    const currentMood = localStorage.getItem(MOOD_VAL_KEY);

    const selectedDifficulties = [...document.querySelectorAll('#difficultyGroup .selector-btn.active')].map(b => b.dataset.value);
    if (selectedDifficulties.length === 0) {
        alert('Please select at least 1 difficulty level.');
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
    const moodSuggest = document.getElementById('moodSuggest').checked;
    let moodIngredientSet = new Set();

    if (moodSuggest) {
        if (!currentMood) {
            alert('Please select your mood first.');
            moodModal.open();
            return;
        }
        if (typeof moodING !== 'function') {
            alert('Mood data is not available right now.');
            return;
        }
        const moodProfile = new moodING(currentMood);
        const moodIngredients = Array.isArray(moodProfile.ingredients) ? moodProfile.ingredients : [];
        moodIngredientSet = new Set(
            moodIngredients
                .map(ing => pluralize.singular(String(ing).trim().toLowerCase()))
                .filter(Boolean)
        );
    }

    // Build a lookup: ingredient name (lowercase) → days left
    const expiryMap = {};
    for (const ing of ingredients) {
        expiryMap[ing.name.toLowerCase()] = ing.expiry ? daysleft(ing.expiry) : Infinity;
    }

    let results = filtered.map(r => {
        const formatIngs = (r.ingredients || '').split(",").map(s => pluralize.singular(s.trim().toLowerCase())).filter(Boolean);
        const matched = formatIngs.filter(ri => matchingIngs.some(p => ri.includes(p)));
        const matchRatio = formatIngs.length > 0 ? matched.length / formatIngs.length : 0;
        const moodList = [...moodIngredientSet];
        const moodMatchedList = moodList.filter(ri => formatIngs.some(p => ri.includes(p)));
        const moodMatched = (moodMatchedList.length > 0);
        const urgencyScore = matched.length > 0
            ? Math.min(...matched.map(ri => {
                const key = Object.keys(expiryMap).find(p => ri.includes(p));
                return key !== undefined ? expiryMap[key] : Infinity;
            }))
            : Infinity;
        return { ...r, matched, formatIngs, matchRatio, urgencyScore, moodMatched };
    });

    if (moodSuggest && moodSuggest !== 'na' && expiryFirst) {
        results = results.filter(r => !r.moodMatched);
        results.sort((a, b) => a.urgencyScore - b.urgencyScore || b.matchRatio - a.matchRatio);
    } else if (moodSuggest && moodSuggest !== 'na') {
        results = results.filter(r => !r.moodMatched);
        results.sort((a, b) => b.matchRatio - a.matchRatio || Math.random() - 0.5);
    } else if (expiryFirst) {
        results.sort((a, b) => a.urgencyScore - b.urgencyScore || b.matchRatio - a.matchRatio);
    } else {
        results.sort((a, b) => b.matchRatio - a.matchRatio || Math.random() - 0.5);
    }
    return results;
}

function buildView(view) {
    switch (view) {
        case 'left': {
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
                            <input class="stock-input" id="adj-${item.id}" data-role="adjustAmount" type="number" min="0" step="1" value="1" inputmode="decimal">
                            <span class="stock-unit">${item.unit}</span>
                            <button class="red-btn" data-action="setExpiry" type="button"><i class='fa fa-pencil'></i> Expires</button>
                        </div>
                    </div>
                </li>`;
            }
            document.getElementById("ingredientsList").innerHTML = viewlist;
            document.getElementById("countTotal").textContent = String(ingredients.length);
            document.getElementById("countExpiring").textContent = String(ingredients.filter(i => i.expiry && daysleft(i.expiry) <= 7).length);
            break;
        }

        case 'right': {
    const results = suggestRecipes();
    let html = `<p class="results-heading">Showing top ${Math.min(10, results.length)} suggested recipe(s) of ${results.length} found recipe(s)</p>`;
    if (results.length === 0) {
        html += `<p class="no-results">No recipes found for the selected filters.</p>`;
    }
    for (const r of results.slice(0, 10)) {
        html += `
        <div class="recipe-card">

            ${r.recipeImg
                ? `<div class="recipe-card-img-wrap">
                       <img src="${r.recipeImg}" class="recipe-img" onerror="this.parentElement.style.display='none'">
                   </div>`
                : ''}

            <div class="recipe-card-info">

                <!-- ✅ 標題 + View Recipe 同一行 -->
                <div class="recipe-card-header">
                    <strong>${r.recipeName || 'Unknown'}</strong>
                    ${r.recipeUrl
                        ? `<a href="${r.recipeUrl}" target="_blank" class="view-recipe-btn">View Recipe →</a>`
                        : ''}
                </div>

                <span>${r.source || 'Internet'} · ${r.cuisine || 'Unknown'} Cuisine <br> Difficulty: ${r.difficulty == '0' ? 'Easy' : r.difficulty === '1' ? 'Normal' : 'Hard'}</span>

                <div class="ing-chips">
                    ${r.formatIngs.sort((a, b) => a.localeCompare(b)).map(ing => {
                        const isMatched = r.matched.includes(ing);
                        return `<span class="ing-chip ${isMatched ? 'ing-chip-ok' : 'ing-chip-missing'}">${ing}</span>`;
                    }).join('')}
                </div>

            </div>
        </div>`;
    }
    document.getElementById('analyseResults').innerHTML = html;
    break;
}
    }
}

function model(name) {
    this.name = name;
    this.open = (item) => openModal(this.name, item);
    this.close = () => closeModal(this.name);
}

function openModal(action, item) {
    switch (action) {
        case "add":
            document.getElementById("ingredientForm").reset();
            document.getElementById("ingredientModal").showModal();
            break;
        case "mood":
            const questions = [
                "How are you feeling right now?",
                "What's your mood today?",
                "How's your day going so far?"
            ];
            document.getElementById('moodQuestion').textContent = questions[Math.floor(Math.random() * questions.length)];
            document.querySelectorAll('input[name="mood"]').forEach(r => r.checked = false);
            document.getElementById('moodModal').showModal();
            break;
        case "setExpiry":
            document.getElementById('setExpiryIngredientId').value = item.id;
            document.getElementById('setExpiryDate').value = item.expiry || '';
            document.getElementById('setExpiryTarget').textContent = `Ingredient: ${item.name}`;
            document.getElementById('setExpiryModal').showModal();
            break;
    }
}

function closeModal(action) {
    switch (action) {
        case "add":
            if (document.getElementById("ingredientModal").open) {
                document.getElementById("ingredientModal").close();
            }
            break;
        case "mood":
            document.getElementById('moodModal').close();
            break;
        case "setExpiry":
            if (document.getElementById('setExpiryModal').open) {
                document.getElementById('setExpiryModal').close();
            }
            break;
    }
}

// Initialize Models
const addIngredientModal = new model("add");
const moodModal = new model("mood");
const setExpiryModal = new model("setExpiry");

// LEFT PANEL Initial and AddEventListener
document.getElementById('search-btn').addEventListener('click', function () {
    document.getElementsByClassName('search')[0].classList.toggle('show');
    if (document.getElementsByClassName('search')[0].classList.contains('show')) {
        document.getElementById('ingredientSearch').focus();
    }
});

document.getElementById('filter-btn').addEventListener('click', function () {
    document.getElementsByClassName('filter')[0].classList.toggle('show');
});

document.getElementById('ingredientsList').addEventListener('click', function (event) {
    const element = event.target.closest('[data-action]');
    if (!element) return;

    const action = element.getAttribute('data-action');
    const item = element.closest('li[data-id]');
    if (!item) return;
    const id = item.getAttribute('data-id');

    switch (action) {
        case "delete": {
            deleteExistingIngredient(id);
            break;
        }
        case "setExpiry": {
            const ingredient = ingredients.find((x) => x.id === id);
            if (!ingredient) return;
            setExpiryModal.open(ingredient);
            break;
        }
        case "useAmount": {
            const amount = item.querySelector('input[data-role="adjustAmount"]').value;
            updateIngredientStock(id, amount);
            break;
        }
    }
});

document.getElementById('filterCategory').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('filterExpiry').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('ingredientSearch').addEventListener('input', buildView.bind(null, 'left'));
document.getElementById('lowStockOnly').addEventListener('change', buildView.bind(null, 'left'));
document.getElementById('sortBy').addEventListener('change', buildView.bind(null, 'left'));

document.getElementById('add-btn').addEventListener("click", addIngredientModal.open);
document.getElementById('btnCancelModal').addEventListener("click", addIngredientModal.close);

document.getElementById('btnCancelSetExpiry').addEventListener('click', setExpiryModal.close);
document.getElementById('btnClearSetExpiry').addEventListener('click', function () {
    const id = document.getElementById('setExpiryIngredientId').value;
    if (!id) return;
    updateIngredientExpiry(id, '');
    setExpiryModal.close();
});

document.getElementById('setExpiryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('setExpiryIngredientId').value;
    if (!id) return;
    const nextExpiry = document.getElementById('setExpiryDate').value || '';
    updateIngredientExpiry(id, nextExpiry);
    setExpiryModal.close();
});

document.getElementById("ingredientForm").addEventListener("submit", function (s) {
    s.preventDefault();
    addNewIngredient({
        name: document.getElementById("ingName").value,
        category: document.getElementById("ingCategory").value,
        qty: document.getElementById("ingQty").value,
        expiry: document.getElementById("ingExpiry").value,
    });
    addIngredientModal.close();
});

document.getElementById('resetFiltersBtn').addEventListener('click', function () {
    document.getElementById('filterCategory').value = FILTER_DEFAULTS.filterCategory;
    document.getElementById('filterExpiry').value = FILTER_DEFAULTS.filterExpiry;
    document.getElementById('sortBy').value = FILTER_DEFAULTS.sortBy;
    document.getElementById('lowStockOnly').checked = FILTER_DEFAULTS.lowStockOnly;
    document.getElementById('ingredientSearch').value = FILTER_DEFAULTS.ingredientSearch;
    document.getElementsByClassName('search')[0].classList.remove('show');
    buildView('left');
});

buildView('left');

// MOOD CHECK
const MOOD_DATE_KEY = 'food_wise_date';
const MOOD_VAL_KEY  = 'food_wise_mood';
const today = new Date().toLocaleDateString('en-GB');

document.getElementById('moodForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="mood"]:checked');
    if (!selected) { alert('Please select your mood.'); return; }
    localStorage.setItem(MOOD_VAL_KEY, selected.value);
    localStorage.setItem(MOOD_DATE_KEY, today);
    moodModal.close();
});

const lastDate = localStorage.getItem(MOOD_DATE_KEY);
if (lastDate !== today && localStorage.getItem(MOOD_VAL_KEY)) window.location.replace('/');
if (!localStorage.getItem(MOOD_VAL_KEY)) { moodModal.open(); }
document.getElementById('changeMoodBtn').addEventListener('click', moodModal.open);

// RIGHT PANEL Initial and AddEventListener
document.getElementById('difficultyGroup').addEventListener('click', function (e) {
    const btn = e.target.closest('.selector-btn');
    if (!btn) return;
    btn.classList.toggle('active');
});

document.getElementById('analyseBtn').addEventListener('click', function () {
    buildView('right');
    const mealLabel = document.getElementById('mealGroup').options[document.getElementById('mealGroup').selectedIndex].text;
    document.querySelector('.right-title').textContent = 'Recipe — ' + mealLabel;
    document.querySelector('.right-controls .form').style.display = 'none';
    const titleActions = document.getElementById('rightTitleActions');
    titleActions.innerHTML = '';

    const againBtn = document.createElement('button');
    againBtn.id = 'analyseAgainBtn';
    againBtn.type = 'button';
    againBtn.className = 'analyse-again-btn';
    againBtn.innerHTML = '<i class="fa fa-refresh"></i> Analyse Again';
    againBtn.addEventListener('click', function () {
        document.getElementById('analyseResults').innerHTML = '';
        document.querySelector('.right-title').textContent = 'Recipe';
        document.querySelector('.right-controls .form').style.display = '';
        titleActions.innerHTML = '';
    });
    titleActions.appendChild(againBtn);
    scrollRightPanelToTop();
});