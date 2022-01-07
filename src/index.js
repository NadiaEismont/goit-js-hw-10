import './css/styles.css';
import Notiflix from 'notiflix';
import { APICountriesServer } from '/fetchCountries.js';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list')
}
const apiCountriesServer = new APICountriesServer();

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
refs.input.addEventListener('keypress', CheckEnglish);

function onSearch(e) {
    e.preventDefault;
    apiCountriesServer.query = (refs.input.value).trim();
    apiCountriesServer.resetPage();
    apiCountriesServer.fetchCountries(refs.input.value)
        .then(r => r.json())
        .then(countries => {
            apiCountriesServer.incrementPage();
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
    if (countries.length >= 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {
            timeout: 3000,
        })
    }
    if (countries.length < 10 && countries.length >= 2) {
        refs.countryList.innerHTML = "";
        countries.forEach(country => {
            refs.countryList.insertAdjacentHTML('beforeend', `<li><img src="${country.flags.png}"></li><li>${country.name}</li>`);

        });
    }
    if (countries.length === 1) {
        refs.countryList.innerHTML = "";
        const languages = countries[0].languages.map(language => language.name);
        refs.countryList.insertAdjacentHTML(
            'beforeend',
            `<li><img src="${countries[0].flags.png}"></li>
             <li>${countries[0].name}</li><li class="countiesAttribute"><b>Capital:</b>&nbsp;${countries[0].capital}</li>
             <li class="countiesAttribute"><b>Population:</b>&nbsp;${countries[0].population}</li><li class="countiesAttribute"><b>Languages:</b>&nbsp;${languages.join()}</li>`);


    }
}

function CheckEnglish(e) {

    if (e.charCode < 33 || e.charCode > 122) {
        Notiflix.Notify.failure('Please, switch keyboard layout', {
            timeout: 6000,
        })
    }
}