import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '/fetchCountries.js';
var debounce = require('lodash.debounce');

import template from '/template.hbs';
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list')
}
// const apiCountriesServer = new APICountriesServer();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
refs.input.addEventListener('keypress', CheckEnglish);

function onSearch(e) {
    e.preventDefault;
    // apiCountriesServer.query = (refs.input.value).trim();
    // apiCountriesServer.resetPage();
    fetchCountries(refs.input.value.trim())
        .then(r => r.json())
        .then(countries => {
            // apiCountriesServer.incrementPage();
            if (countries.status === 404) {
                return Promise.reject();
            }
            limitCountries(countries);

        }).catch(error =>
            Notiflix.Notify.failure("Oops, there is no country with that name", {
                timeout: 6000,
            }));
}

function limitCountries(countries) {
    refs.countryList.innerHTML = "";
    if (countries.length >= 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {
            timeout: 3000,
        })
    }
    if (countries.length < 10 && countries.length >= 2) {
        countries.forEach(country => {
            refs.countryList.insertAdjacentHTML('beforeend', `<li><img src="${country.flags.png}"></li><li>${country.name}</li>`);

        });
    }
    if (countries.length === 1) {
        // countries.languages.split(' ');
        refs.countryList.insertAdjacentHTML(
            'beforeend', template({ countries: countries }));
    }
}

function CheckEnglish(e) {

    if (e.charCode < 33 || e.charCode > 122) {
        Notiflix.Notify.failure('Please, switch keyboard layout', {
            timeout: 6000,
        })
    }
}