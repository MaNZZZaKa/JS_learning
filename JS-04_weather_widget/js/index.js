const wrapper = document.querySelector('#wrapper');


const countriesID = [ 
    {name: 'Afghanistan', code: 'AF'}, 
    {name: 'Åland Islands', code: 'AX'}, 
    {name: 'Albania', code: 'AL'}, 
    {name: 'Algeria', code: 'DZ'}, 
    {name: 'American Samoa', code: 'AS'}, 
    {name: 'AndorrA', code: 'AD'}, 
    {name: 'Angola', code: 'AO'}, 
    {name: 'Anguilla', code: 'AI'}, 
    {name: 'Antarctica', code: 'AQ'}, 
    {name: 'Antigua and Barbuda', code: 'AG'}, 
    {name: 'Argentina', code: 'AR'}, 
    {name: 'Armenia', code: 'AM'}, 
    {name: 'Aruba', code: 'AW'}, 
    {name: 'Australia', code: 'AU'}, 
    {name: 'Austria', code: 'AT'}, 
    {name: 'Azerbaijan', code: 'AZ'}, 
    {name: 'Bahamas', code: 'BS'}, 
    {name: 'Bahrain', code: 'BH'}, 
    {name: 'Bangladesh', code: 'BD'}, 
    {name: 'Barbados', code: 'BB'}, 
    {name: 'Belarus', code: 'BY'}, 
    {name: 'Belgium', code: 'BE'}, 
    {name: 'Belize', code: 'BZ'}, 
    {name: 'Benin', code: 'BJ'}, 
    {name: 'Bermuda', code: 'BM'}, 
    {name: 'Bhutan', code: 'BT'}, 
    {name: 'Bolivia', code: 'BO'}, 
    {name: 'Bosnia and Herzegovina', code: 'BA'}, 
    {name: 'Botswana', code: 'BW'}, 
    {name: 'Bouvet Island', code: 'BV'}, 
    {name: 'Brazil', code: 'BR'}, 
    {name: 'British Indian Ocean Territory', code: 'IO'}, 
    {name: 'Brunei Darussalam', code: 'BN'}, 
    {name: 'Bulgaria', code: 'BG'}, 
    {name: 'Burkina Faso', code: 'BF'}, 
    {name: 'Burundi', code: 'BI'}, 
    {name: 'Cambodia', code: 'KH'}, 
    {name: 'Cameroon', code: 'CM'}, 
    {name: 'Canada', code: 'CA'}, 
    {name: 'Cape Verde', code: 'CV'}, 
    {name: 'Cayman Islands', code: 'KY'}, 
    {name: 'Central African Republic', code: 'CF'}, 
    {name: 'Chad', code: 'TD'}, 
    {name: 'Chile', code: 'CL'}, 
    {name: 'China', code: 'CN'}, 
    {name: 'Christmas Island', code: 'CX'}, 
    {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
    {name: 'Colombia', code: 'CO'}, 
    {name: 'Comoros', code: 'KM'}, 
    {name: 'Congo', code: 'CG'}, 
    {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
    {name: 'Cook Islands', code: 'CK'}, 
    {name: 'Costa Rica', code: 'CR'}, 
    {name: 'Cote D\'Ivoire', code: 'CI'}, 
    {name: 'Croatia', code: 'HR'}, 
    {name: 'Cuba', code: 'CU'}, 
    {name: 'Cyprus', code: 'CY'}, 
    {name: 'Czech Republic', code: 'CZ'}, 
    {name: 'Denmark', code: 'DK'}, 
    {name: 'Djibouti', code: 'DJ'}, 
    {name: 'Dominica', code: 'DM'}, 
    {name: 'Dominican Republic', code: 'DO'}, 
    {name: 'Ecuador', code: 'EC'}, 
    {name: 'Egypt', code: 'EG'}, 
    {name: 'El Salvador', code: 'SV'}, 
    {name: 'Equatorial Guinea', code: 'GQ'}, 
    {name: 'Eritrea', code: 'ER'}, 
    {name: 'Estonia', code: 'EE'}, 
    {name: 'Ethiopia', code: 'ET'}, 
    {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
    {name: 'Faroe Islands', code: 'FO'}, 
    {name: 'Fiji', code: 'FJ'}, 
    {name: 'Finland', code: 'FI'}, 
    {name: 'France', code: 'FR'}, 
    {name: 'French Guiana', code: 'GF'}, 
    {name: 'French Polynesia', code: 'PF'}, 
    {name: 'French Southern Territories', code: 'TF'}, 
    {name: 'Gabon', code: 'GA'}, 
    {name: 'Gambia', code: 'GM'}, 
    {name: 'Georgia', code: 'GE'}, 
    {name: 'Germany', code: 'DE'}, 
    {name: 'Ghana', code: 'GH'}, 
    {name: 'Gibraltar', code: 'GI'}, 
    {name: 'Greece', code: 'GR'}, 
    {name: 'Greenland', code: 'GL'}, 
    {name: 'Grenada', code: 'GD'}, 
    {name: 'Guadeloupe', code: 'GP'}, 
    {name: 'Guam', code: 'GU'}, 
    {name: 'Guatemala', code: 'GT'}, 
    {name: 'Guernsey', code: 'GG'}, 
    {name: 'Guinea', code: 'GN'}, 
    {name: 'Guinea-Bissau', code: 'GW'}, 
    {name: 'Guyana', code: 'GY'}, 
    {name: 'Haiti', code: 'HT'}, 
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
    {name: 'Holy See (Vatican City State)', code: 'VA'}, 
    {name: 'Honduras', code: 'HN'}, 
    {name: 'Hong Kong', code: 'HK'}, 
    {name: 'Hungary', code: 'HU'}, 
    {name: 'Iceland', code: 'IS'}, 
    {name: 'India', code: 'IN'}, 
    {name: 'Indonesia', code: 'ID'}, 
    {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
    {name: 'Iraq', code: 'IQ'}, 
    {name: 'Ireland', code: 'IE'}, 
    {name: 'Isle of Man', code: 'IM'}, 
    {name: 'Israel', code: 'IL'}, 
    {name: 'Italy', code: 'IT'}, 
    {name: 'Jamaica', code: 'JM'}, 
    {name: 'Japan', code: 'JP'}, 
    {name: 'Jersey', code: 'JE'}, 
    {name: 'Jordan', code: 'JO'}, 
    {name: 'Kazakhstan', code: 'KZ'}, 
    {name: 'Kenya', code: 'KE'}, 
    {name: 'Kiribati', code: 'KI'}, 
    {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
    {name: 'Korea, Republic of', code: 'KR'}, 
    {name: 'Kuwait', code: 'KW'}, 
    {name: 'Kyrgyzstan', code: 'KG'}, 
    {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
    {name: 'Latvia', code: 'LV'}, 
    {name: 'Lebanon', code: 'LB'}, 
    {name: 'Lesotho', code: 'LS'}, 
    {name: 'Liberia', code: 'LR'}, 
    {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
    {name: 'Liechtenstein', code: 'LI'}, 
    {name: 'Lithuania', code: 'LT'}, 
    {name: 'Luxembourg', code: 'LU'}, 
    {name: 'Macao', code: 'MO'}, 
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
    {name: 'Madagascar', code: 'MG'}, 
    {name: 'Malawi', code: 'MW'}, 
    {name: 'Malaysia', code: 'MY'}, 
    {name: 'Maldives', code: 'MV'}, 
    {name: 'Mali', code: 'ML'}, 
    {name: 'Malta', code: 'MT'}, 
    {name: 'Marshall Islands', code: 'MH'}, 
    {name: 'Martinique', code: 'MQ'}, 
    {name: 'Mauritania', code: 'MR'}, 
    {name: 'Mauritius', code: 'MU'}, 
    {name: 'Mayotte', code: 'YT'}, 
    {name: 'Mexico', code: 'MX'}, 
    {name: 'Micronesia, Federated States of', code: 'FM'}, 
    {name: 'Moldova, Republic of', code: 'MD'}, 
    {name: 'Monaco', code: 'MC'}, 
    {name: 'Mongolia', code: 'MN'}, 
    {name: 'Montserrat', code: 'MS'}, 
    {name: 'Morocco', code: 'MA'}, 
    {name: 'Mozambique', code: 'MZ'}, 
    {name: 'Myanmar', code: 'MM'}, 
    {name: 'Namibia', code: 'NA'}, 
    {name: 'Nauru', code: 'NR'}, 
    {name: 'Nepal', code: 'NP'}, 
    {name: 'Netherlands', code: 'NL'}, 
    {name: 'Netherlands Antilles', code: 'AN'}, 
    {name: 'New Caledonia', code: 'NC'}, 
    {name: 'New Zealand', code: 'NZ'}, 
    {name: 'Nicaragua', code: 'NI'}, 
    {name: 'Niger', code: 'NE'}, 
    {name: 'Nigeria', code: 'NG'}, 
    {name: 'Niue', code: 'NU'}, 
    {name: 'Norfolk Island', code: 'NF'}, 
    {name: 'Northern Mariana Islands', code: 'MP'}, 
    {name: 'Norway', code: 'NO'}, 
    {name: 'Oman', code: 'OM'}, 
    {name: 'Pakistan', code: 'PK'}, 
    {name: 'Palau', code: 'PW'}, 
    {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
    {name: 'Panama', code: 'PA'}, 
    {name: 'Papua New Guinea', code: 'PG'}, 
    {name: 'Paraguay', code: 'PY'}, 
    {name: 'Peru', code: 'PE'}, 
    {name: 'Philippines', code: 'PH'}, 
    {name: 'Pitcairn', code: 'PN'}, 
    {name: 'Poland', code: 'PL'}, 
    {name: 'Portugal', code: 'PT'}, 
    {name: 'Puerto Rico', code: 'PR'}, 
    {name: 'Qatar', code: 'QA'}, 
    {name: 'Reunion', code: 'RE'}, 
    {name: 'Romania', code: 'RO'}, 
    {name: 'Russian Federation', code: 'RU'}, 
    {name: 'RWANDA', code: 'RW'}, 
    {name: 'Saint Helena', code: 'SH'}, 
    {name: 'Saint Kitts and Nevis', code: 'KN'}, 
    {name: 'Saint Lucia', code: 'LC'}, 
    {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
    {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
    {name: 'Samoa', code: 'WS'}, 
    {name: 'San Marino', code: 'SM'}, 
    {name: 'Sao Tome and Principe', code: 'ST'}, 
    {name: 'Saudi Arabia', code: 'SA'}, 
    {name: 'Senegal', code: 'SN'}, 
    {name: 'Serbia and Montenegro', code: 'CS'}, 
    {name: 'Seychelles', code: 'SC'}, 
    {name: 'Sierra Leone', code: 'SL'}, 
    {name: 'Singapore', code: 'SG'}, 
    {name: 'Slovakia', code: 'SK'}, 
    {name: 'Slovenia', code: 'SI'}, 
    {name: 'Solomon Islands', code: 'SB'}, 
    {name: 'Somalia', code: 'SO'}, 
    {name: 'South Africa', code: 'ZA'}, 
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
    {name: 'Spain', code: 'ES'}, 
    {name: 'Sri Lanka', code: 'LK'}, 
    {name: 'Sudan', code: 'SD'}, 
    {name: 'Suriname', code: 'SR'}, 
    {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
    {name: 'Swaziland', code: 'SZ'}, 
    {name: 'Sweden', code: 'SE'}, 
    {name: 'Switzerland', code: 'CH'}, 
    {name: 'Syrian Arab Republic', code: 'SY'}, 
    {name: 'Taiwan, Province of China', code: 'TW'}, 
    {name: 'Tajikistan', code: 'TJ'}, 
    {name: 'Tanzania, United Republic of', code: 'TZ'}, 
    {name: 'Thailand', code: 'TH'}, 
    {name: 'Timor-Leste', code: 'TL'}, 
    {name: 'Togo', code: 'TG'}, 
    {name: 'Tokelau', code: 'TK'}, 
    {name: 'Tonga', code: 'TO'}, 
    {name: 'Trinidad and Tobago', code: 'TT'}, 
    {name: 'Tunisia', code: 'TN'}, 
    {name: 'Turkey', code: 'TR'}, 
    {name: 'Turkmenistan', code: 'TM'}, 
    {name: 'Turks and Caicos Islands', code: 'TC'}, 
    {name: 'Tuvalu', code: 'TV'}, 
    {name: 'Uganda', code: 'UG'}, 
    {name: 'Ukraine', code: 'UA'}, 
    {name: 'United Arab Emirates', code: 'AE'}, 
    {name: 'United Kingdom', code: 'GB'}, 
    {name: 'United States', code: 'US'}, 
    {name: 'United States Minor Outlying Islands', code: 'UM'}, 
    {name: 'Uruguay', code: 'UY'}, 
    {name: 'Uzbekistan', code: 'UZ'}, 
    {name: 'Vanuatu', code: 'VU'}, 
    {name: 'Venezuela', code: 'VE'}, 
    {name: 'Viet Nam', code: 'VN'}, 
    {name: 'Virgin Islands, British', code: 'VG'}, 
    {name: 'Virgin Islands, U.S.', code: 'VI'}, 
    {name: 'Wallis and Futuna', code: 'WF'}, 
    {name: 'Western Sahara', code: 'EH'}, 
    {name: 'Yemen', code: 'YE'}, 
    {name: 'Zambia', code: 'ZM'}, 
    {name: 'Zimbabwe', code: 'ZW'} 
]
    
async function reverseGeocoding(latitude, longitude) {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=132802a7616de8df494e28b6992f54fc`)
        const data = await response.json();
        // console.log('our DATA', data);
        if (!document.querySelector('input').value){
            document.querySelector('input').value = data.name;
            async function fetchData() {
                inputValue = input.value;
                const dataHolder = await fetchCityWeather(inputValue);
                const preparedData = await preperingData(dataHolder);
                await render(preparedData, inputValue);
            }
            await fetchData();
        }
        return
    }catch(status) {
        console.log('Request failed.  Returned status of', status)
    }
}

function getLocation () {
    if (!navigator.geolocation){
        alert('Your browser do not support geolocation, please enter city manualy')
        return
    }
    const successCallback = async (position) => {
        await reverseGeocoding(position.coords.latitude, position.coords.longitude);
    };
    const errorCallback = (error) => {
        console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

const preperingData = (data) => {
    if (data && Object.keys(data).length !== 0 && (+data.cod < 400) ){
        document.querySelector('input').classList.remove('error-input');
        document.querySelector('.input-button').classList.remove('error-input-button');
        const { list, city } = data;
        const unzipData = list
            .map(({ dt, dt_txt, main: {temp, feels_like }, weather }) => ({
                dt,
                city: city.name, 
                country: city.country, 
                date: dt_txt.slice(0, -6), 
                feels_like, 
                temp, 
                weather: weather[0]['main'], 
                weather_details: weather[0]['description'], 
                weather_icon: weather[0]['icon']
            }))
        
        function preperingData(unzipData){
            const dataContainer = [[unzipData[0]]];
            let dateAsCheker = +(unzipData[0]['date'].slice(0, -3).replaceAll(/\D/g, ''));
            let tempArray = [];
    
            // prepering array to easy grabing from  preperingData to DOM
            for (let x = 0; x < unzipData.length; x++) {
                let nextDateAscheker = +(unzipData[x]['date'].slice(0, -3).replaceAll(/\D/g, ''))
    
                if ((dateAsCheker + 1) === nextDateAscheker){
                    tempArray.push(unzipData[x]);
                    if (x === unzipData.length - 1) {
                        dataContainer.push(tempArray);
                    }
                    continue
                } else if (((dateAsCheker + 1) < nextDateAscheker)) {
                    dataContainer.push(tempArray);
                    dateAsCheker += 1;
                    tempArray = [];
                    tempArray.push(unzipData[x]);
    
                    continue
                }
            }
            return dataContainer
        }

        function sorting (data) {
            // console.log('======',data);
            let dataNew = data.map(array => {
                // console.log(array.length)
                if (array.length > 1){
                    // console.log(array);
                    let max = -Infinity;
                    let min = Infinity;
                    let tempArray = [];
                    array.map((element) => {
                        // console.log(element)
                        (element['temp'] > max) ? max = element['temp'] : (element['temp'] < min) ? min = element['temp'] : element['temp'];
                        if((element['date'].slice(-3).replaceAll(/\D/g, '')) === '12'){
                            tempArray = element;
                            // console.log(tempArray);
                        }
                    })
                    tempArray.temp_max = max;
                    tempArray.temp_min = min;
                    // console.log('================================',tempArray);
                    array = tempArray;

                } else if (array.length == 1) {
                    array = array[0];
                }
                return array
            })
            return dataNew
            
        }
        const preperedData = preperingData(unzipData)
        return sorting(preperedData)
    } else {
        console.error('Reseived not valid information from server');
        document.querySelector('input').value = '';
        document.querySelector('input').classList.add('error-input');
        document.querySelector('.input-button').classList.add('error-input-button');
        document.querySelector('input').placeholder = 'Не має такого міста';
    }
}

const render = (data, enteredCity = 'Київ') => {
    const objData = new Date();
    const currentDay = objData.getDate();
    const weatherContainer  = document.querySelector('.future-weather-section');
    const fullCountryName = countriesID.filter(({code}) => code === data[0].country);
    document.querySelector('input').value = ``;
    document.querySelector('input').placeholder = `${data[0].city}, ${enteredCity}, ${fullCountryName[0].name}`;

    document.querySelector('.search-dicript').innerHTML = `${data[0].city}, ${enteredCity}, ${fullCountryName[0].name}`
    
    weatherContainer.innerHTML = ``;
    if (data.length > 5) {
        data = data.slice(0, 5);
    }

    data.map(element => {
        const {city, country, date, feels_like, temp, temp_max, temp_min, weather_details, weather_icon} = element;
        const elementDay = +(element.date.slice(-5, -3));

        if ( !(currentDay === elementDay) ) {
            const weatherSection = document.createElement('div');
            weatherSection.classList.add('future-weather-container');
            weatherSection.innerHTML = `
            <div>
             ${(String(new Date(date.slice(0, -3))).slice(0, 4).toUpperCase())}
            </div>
            
            <div>
                <img src='./img/${weather_icon}.png'>
            </div>
            
            <div>
                ${weather_details}
            </div>
            
            <div class='max-min-temp-contaner'>
                <div width='max-content' height='max-content'>${Math.floor(temp_max)}&#8451</div>
                <div width='max-content' height='max-content'>${Math.floor(temp_min)}&#8451</div>
            
            </div> 
            `
            
            weatherContainer.appendChild(weatherSection);
        }else {
            document.querySelector('.today-section').innerHTML = `
            <div class='today-section-container'>
                <div class ='centered'>
                    <span class='today-section-container-now'>
                    ${Math.floor(temp)}&#8451
                    </span>
                </div> 
                <div class='centered'> 
                    Feels Like ${Math.floor(feels_like)}&#8451
                </div>
            </div>
            <div class='today-section-container'>
                <div>
                    ${(weather_details.charAt(0).toUpperCase() + weather_details.slice(1))}
                </div> 
                <div> 
                    ${city}, ${(countriesID.filter(({code}) => code === country))[0].name}
                </div>
            </div>    
            <div class='today-section-container centered'>
                <img src='./img/${weather_icon}.png'>
            </div>    
            `;
            
        }
        
    })

}

async function fetchCityWeather (city) {
    const urlWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=132802a7616de8df494e28b6992f54fc`;
    try{
        const response = await fetch(urlWeather);
        const data = await response.json();
        return data;
    }catch (e){
        console.error(e);

    }
    
}

const input = document.querySelector('input');
let inputValue = document.getElementById('get-location');
const button = document.querySelector('.input-button');
button.addEventListener('click', () => input.value ? input.value = '' : '');
input.addEventListener('keypress', (event) => {    
    if (event.key === 'Enter'){
        async function fetchData() {
            inputValue = input.value.trim();
            let dataHolder = await fetchCityWeather(inputValue);
            let preparedData = await preperingData(dataHolder);
            await render(preparedData, inputValue);
        }
        fetchData();
    }
})



getLocation()





