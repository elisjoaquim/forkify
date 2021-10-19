import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    //Hashchange
    const id = window.location.hash.slice(1);
    console.log();

    //guard clause
    if (!id) return;

    recipeView.renderSpinner();
    //  1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(error);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await model.loadSearchResults(query);

    //3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  //1) Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render New paginations buttons
  paginationView.render(model.state.search);
};

const controlServing = function () {
  //Update the recioe servings (in state)
  model.updateServings(8);

  //Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
