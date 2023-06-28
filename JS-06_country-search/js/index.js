const DefaultURL = 'https://restcountries.com/v3.1/'
const QueriesURL = 'fields=region,flags,population,capital,name'

const setDataListOfCountries = (data) => {
    const datalist = document.querySelector('#datalist-countries');
    datalist.innerHTML = '';
    data.map(( {name: {common} } ) => {
        const option = document.createElement('option');
        option.value = common;
        datalist.appendChild(option);
    })

}

const initDarkModeState = () => {
    if (localStorage.getItem('dark')) {
        document.body.setAttribute('dark', '')
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun');
        darkModeDescr.textContent = 'Light Mode';
    }
}
const start = async () => {
    initDarkModeState()
    await renderCountryData();
    await renderDataListOfCounies();
}

const fetchData = async (url) => {
    const fetchData = await fetch(url);
    return fetchData.json();
}


const renderCountryData = async (region = '', country = '') => {
    try{
        if (!region && !country){
            const url = `${DefaultURL}all?${QueriesURL}`;
            render( await fetchData(url) );
        }else if ( (region && !country) || (region && country) ){
            const url = `${DefaultURL}region/${region}?${QueriesURL}`
            render(await fetchData(url), country);
        } else if (!region && country){
            const url = `${DefaultURL}name/${country}?${QueriesURL}`
            render( await fetchData(url) )
        }

    } catch(e) {
        return e;
    }
    
}

const renderDataListOfCounies = async (region = '') => {
    try{
        if (!region){
            const url = `${DefaultURL}all?${QueriesURL}`
            setDataListOfCountries(await fetchData(url));
        }else if (region){
            const url = `${DefaultURL}region/${region}?${QueriesURL}`
            setDataListOfCountries(await fetchData(url));
        }

    } catch(e) {
        return e;
    }
}


const createComponentForRender = (svg, common, population, region, capital) => {
    
    const country = document.createElement('div');

    const countryFlag = document.createElement('div');
    countryFlag.classList.add('flag');
    countryFlag.setAttribute('style',`background-image: url(${svg})`);

    const countryDescription = document.createElement('div');
    countryDescription.classList.add('description');
    countryDescription.innerHTML = `<h3 class='country-name'>${common}</h3> 
    <div><b>Population:</b> ${population.toLocaleString()}</div>
    <div><b>Region:</b> ${region}</div>
    <div><b>Capital:</b> ${capital[0] || 'Has no Capital'}</div>`;

    country.appendChild(countryFlag);
    country.appendChild(countryDescription);
    return country
}

async function render  (data, countryInRegion = '') {
    const countriesContainer = document.querySelector('.country-container');
    countriesContainer.innerHTML = '';
    if (!(data.status && data.status >= 400) && !countryInRegion) {
        const fullHtmlDOM = document.createElement('div');
        data.map(( {flags: { svg }, name: { common },population, region, capital} ) => {
            fullHtmlDOM.appendChild(createComponentForRender(svg, common, population, region,capital))
        })
        countriesContainer.appendChild(fullHtmlDOM);


    } else if (!(data.status && data.status >= 400) && countryInRegion){
        const searchCountryInRegion = data.filter( ( {name: { common } } ) => common === countryInRegion);
        if (searchCountryInRegion.length > 0) {
            const fullHtmlDOM = document.createElement('div');
            searchCountryInRegion.map(( {flags: { svg }, name: { common },population, region, capital} ) => {
                fullHtmlDOM.appendChild(createComponentForRender(svg, common, population, region,capital))          
            })
            countriesContainer.appendChild(fullHtmlDOM);
        }else{
            const emptyHtmlDOM = document.createElement('div');
            emptyHtmlDOM.innerHTML = 'Country Is Not Found In This Region';
            countriesContainer.appendChild(emptyHtmlDOM);
        }
    }else{
        const emptyHtmlDOM = document.createElement('div');
        emptyHtmlDOM.innerHTML = `Country Is ${data.message}`;
        countriesContainer.appendChild(emptyHtmlDOM);
    }
}


const searchSectionInput = document.querySelector('.search-section-input');
searchSectionInput.addEventListener('change', () => {
    const region = document.querySelector('#filter-section-region')
    if (searchSectionInput.value){
        
        setTimeout( async () => await renderCountryData(region.value, searchSectionInput.value), 500);

    } else if (!searchSectionInput.value){
        
        setTimeout( async () => await renderCountryData(region.value), 500);
    }
})


const filterSectionSelect = document.querySelector('#filter-section-region');
filterSectionSelect.addEventListener ('change', async () =>{
    const region = filterSectionSelect.value;
    await renderDataListOfCounies(region);
    await renderCountryData(region);
    searchSectionInput.value = '';
})

const darkModeIcon = document.getElementById('header-dark-mode-icon-i');
const darkModeDescr = document.getElementById('header-dark-mode-descr');

const darkMode = () => {
    if (!localStorage.getItem('dark')) {
        document.body.setAttribute('dark', '');
        localStorage.setItem('dark', 'true');
        darkModeIcon.classList.remove('bi-moon-fill');
        darkModeIcon.classList.add('bi-sun');
        darkModeDescr.textContent = 'Light Mode';
    }else{
        document.body.removeAttribute('dark');
        localStorage.clear()
        darkModeIcon.classList.remove('bi-sun');
        darkModeIcon.classList.add('bi-moon-fill');
        darkModeDescr.textContent = 'Dark Mode';
    }
    
}





const darkModeToggle = document.querySelector('.header-dark-mode');
darkModeToggle.addEventListener('click', darkMode);


start()