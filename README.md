# IT-1030SEF Group 24 - Food Wise Kitchen System

## Overview
This is a web application designed to help users discover and filter recipes based on their current mood and the ingredients they have available. 

## Features
- **Ingredient Management:** Keep track of available ingredients.
- **Mood Selector:** Filter and recommend recipes based on your desired mood.
- **Recipe Database:** Loads recipe data from CSV files.

## Installation & Usage

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, etc.).
- *(Optional)* A local development server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code.

### Installation Steps

1. **Clone the repository to your local machine:**
   ```bash
   git clone <repository-url>
   ```
   *(Alternatively, you can download the source code as a ZIP file and extract it.)*

2. **Navigate to the project folder:**
   ```bash
   cd IT-1030SEF-Group24
   ```
   
>[!NOTE]
>## Demo data
>- **Default Ingredients:** The application automatically loads a set of default ingredients upon first launch using the ingredients.js file.
>- **Removing Default Ingredients:** If you want to start with a blank list of ingredients, you can do so by deleting the ingredients.js file and clearing your browser's local storage. By doing this, the default ingredients will not load when you first open the website.


### Running the Application

Because this application is built with standard web technologies (HTML, CSS, JavaScript), you don't need any complex build tools to run it. Here are two ways to start the app:

**Method 1: Direct File Opening (Quickest)**
1. Locate the cloned or downloaded folder on your computer.
2. Double-click the `index.html` file. It will automatically open in your default web browser.

**Method 2: Using a Local Web Server in VScode (Recommended)**
1. Open the project in Visual Studio Code.
2. If you have the "Live Server" extension installed, click **"Go Live"** in the bottom right corner.
3. The app will launch automatically in your browser (usually at `http://127.0.0.1:5500/index.html`).


<<<<<<< HEAD
=======
## Customization & Troubleshooting
- **Default Ingredients:** The application automatically loads a set of default ingredients upon first launch using the ingredients.js file.
>[!NOTE]
>**Removing Default Ingredients:** If you want to start with a blank list of ingredients, you can do so by deleting the ingredients.js file and clearing your browser's local storage. By doing this, the default ingredients will not load when you first open the website.
>>>>>>> 94669440ee8e0ee9468db97957e8760664c36b4e

## File Structure
- index.html / home.html: Main entry points of the application.
- style.css: Stylesheet for the UI.
- system.js / mood.js : Core logic for the web application and mood functionality.
- ingredients.js: Contains the initial default ingredients.
- recipes.csv: Data source files containing recipe details.
- *pluralize.js: Third-party javascript for pluralizing and singularizing English words.

## Dependencies *
- [pluralize](https://github.com/plurals/pluralize): A robust pluralization library for Node.js and browsers.
