let latDiv = document.getElementById('lat');
let lngDiv = document.getElementById('lng');

let logradouroDiv = window.document.getElementById('logradouro');
let bairroDiv = window.document.getElementById('bairro');
let ufDiv = window.document.getElementById('uf');

let weatherDiv = window.document.getElementById('weather');
let cepData;

document.getElementById('button')

const submitCep = () => {
    let cep = window.document.getElementById('cep');

    if (cep.value === '' || cep.value === undefined)
        return;

    cep = cep.value;
    cep = cep.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    
    getLocation(cep);
    getWeather(cep);
}

const getLocation = (cep) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
       .then(response => response.json())
       .then(data => {
            cepData = {
                logradouro: data.logradouro,
                bairro: data.bairro,
                uf: data.uf,
                cidade: data.localidade
            };

            logradouroDiv.innerHTML = data.logradouro;
            bairroDiv.innerHTML = data.bairro;
            ufDiv.innerHTML = data.uf;
        })
       .catch(error => {
            console.log(error);
        });
}

const getWeather = async (cep) => {
    let coordinates = {
        lat: 0,
        lng: 0
    };

    if (latDiv.value === '' || latDiv.value === undefined || lngDiv.value === '' ||lngDiv.value === undefined) {
        let result = await getCoordinates(cep);
        
        coordinates = {
            lat: result.lat,
            lng: result.lng
        }

    } else {
        coordinates = {
            lat: parseFloat(latDiv.value),
            lng: parseFloat(lngDiv.value)
        }
    }
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=temperature_2m&current=temperature_2m`)
        .then(response => response.json())
        .then(data => {
            weatherDiv.innerHTML = `Previsão de tempo de acordo com a região: ${data.current.temperature_2m} C°`
        })
        .catch(error => {
            console.log(error);
        });
}

const getCoordinates = async (cep) => {0
    let result;

    await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
        .then(response => response.json())
        .then(data => {
            result = {
                lat: data.lat,
                lng: data.lng
            };
        })
        .catch(error => {
            console.log(error);
        });

    return result;
}
