# IT-1030SEF Group 24 - Recipe & Mood Web Application

## Overview
This is a web application designed to help users discover and filter recipes based on their current mood and the ingredients they have available. 

## Features
- **Ingredient Management:** Keep track of available ingredients.
- **Mood Selector:** Filter and recommend recipes based on your desired mood.
- **Recipe Database:** Loads recipe data from CSV files.

## Getting Started
1. Clone or download this repository.
2. Open index.html in any modern web browser to start the application.

## Customization & Troubleshooting
- **Default Ingredients:** The application automatically loads a set of default ingredients upon first launch using the ingredients.js file.
- **Removing Default Ingredients:** If you want to start with a blank list of ingredients, you can do so by deleting the ingredients.js file and clearing your browser's local storage. By doing this, the default ingredients will not load when you first open the website.

## File Structure
- index.html / home.html: Main entry points of the application.
- style.css: Stylesheet for the UI.
- system.js / mood.js / pluralize.js: Core logic for the web application and mood functionality.
- ingredients.js: Contains the initial default ingredients.
- ecipesv1.csv - ecipesv4.csv: Data source files containing recipe details.
- docs_not_in_use/: Contains previous iterations and testing modules.
