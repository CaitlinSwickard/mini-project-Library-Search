// grabbing form input from html 
const searchFormEl = document.querySelector('#search-form');
// grabbing html elements for search results
const resultTextEl = document.querySelector("#result-text");
const resultContentEl = document.querySelector("#result-content");



// function to capture info from the search form
function handleSearchFormSubmit(event) {
  event.preventDefault();

  // grabbing input values from form
  let searchInputVal = document.querySelector('#search-input').value;
  let formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    alert('You need a search input value!');
    return;
  }
  // calling the API and giving it the search values from the form
  searchApi(searchInputVal, formatInputVal)
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



// api GET request with params for query/search and format/search
function searchApi(query, format) {
  let apiUrl = 'https://www.loc.gov/search/?fo=json';

  // if they selected a format add to query params
  if (format) {
    apiUrl = 'https://www.loc.gov/' + format + '/?fo=json';
  }
  // creating full query api url
  apiUrl = apiUrl + '&q=' + query;

  fetch(apiUrl)
    .then(function (response) {
      // if response is not ok throw error
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (res) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = res.search.query;
      console.log(res);

      // if no results found on search change html to the h3
      if (!res.results.length) {
        console.log('No results found');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>'
      } else {
        resultContentEl.textContent = '';
        for (let i = 0; i < res.results.length; i++) {
          // return (res.results[i])
        }
      }
    })

    .catch(function (err) {
      console.log(err);
    });
}




