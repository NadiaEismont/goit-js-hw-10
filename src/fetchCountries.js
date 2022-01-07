export class APICountriesServer {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchCountries(name) {
        return fetch(`https://restcountries.com/v2/name/${this.searchQuery}?fields=name,capital,population,flags,languages&page=${this.page}`)


    }
    incrementPage() {
        this.page + 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}