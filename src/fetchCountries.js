// export class APICountriesServer {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)

}
    // incrementPage() {
    //     this.page + 1;
    // }

    // resetPage() {
    //     this.page = 1;
    // }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }