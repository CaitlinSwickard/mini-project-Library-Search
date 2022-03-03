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



function getParams() {
  // get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format = searchParamsArr[1].split('=').pop();

  searchApi(query, format);
}



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
          printResults(res.results[i])
        }
      }
    })

    .catch(function (err) {
      console.log(err);
    });
}



// function to post results to page, creating html elements for results 
function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  const resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  const resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  const titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  // highlighting specific content from the api request
  const bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

// adding button to link to search results to view entire article, takes user to acutal search results page
  const linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}




