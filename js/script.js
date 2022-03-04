const searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  // grabbing input values from form
  let searchInputVal = document.querySelector('#search-input').value;
  let formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }
  // creating query string for search results ot load on next page
  let queryString = 'results.html?q=' + searchInputVal + '&format=' + formatInputVal;
 
  location.assign(queryString);

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);