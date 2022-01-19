import './css/styles.css';

import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countrysList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) { 
    const country = evt.target.value.trim();
    console.log(country);
    clearInputValue();
    if (!country) return;
    
    fetchCountries(country)
        .then(names => {
            if (names.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (names.length === 1) {
                renderCountryCard(names); 
            } else {
                renderCountrysList(names);
            }
        
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    
};


function renderCountryCard(names) {
    const markup = names.map(({ flags, name, capital, population, languages }) => {
        return `
        <div class="country-card">
            <img class="flag" src = "${flags.svg}" alt = "${name.official}" />
            <h2 class="main-title"> ${name.official} </h2>
        </div>
        <p> <span class="card-text"> Capital: </span> ${capital}</p>
        <p> <span class="card-text"> Population:</span> ${population} </p>
        <p> <span class="card-text"> Languages: </span>  ${Object.values(languages)} </p>`
    }).join('');
    console.log(markup);
    refs.countryInfo.innerHTML = markup;
};


function renderCountrysList(names) {
    const markup = names.map(({ flags, name }) => {
        return `
        <li class="country-item">
        <img class="flag" src = "${flags.svg}" alt = "${name.official}" />
        <p class="title"> ${name.official} </p>
        </li>`
    }).join('');

    refs.countrysList.innerHTML = markup;
};

function clearInputValue() {
    refs.countryInfo.innerHTML = '';
    refs.countrysList.innerHTML = '';
};


