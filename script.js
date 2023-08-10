var container = document.getElementById("show");

function fetchAPi() {
    var country = document.getElementById("input").value;
    var info = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    let timerInterval;
    
    Swal.fire({
        title: 'FETCHING!',
        html: 'Fetching country\'s info in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then(() => {
        return fetch(info).then(response => response.json()); // Fetch and parse JSON
    }).then((data) => {
        var data = data[0];
        try {
            const countryFlag = data.flags.svg;
            const countryName = data.name.common;
            const countryOfficialName = data.name.official;
            const countryCapital = data.capital ? Object.values(data.capital) : "Has No Capital";
            const countryTotalArea = data.area;
            const countryTotalPopulation = data.population;
            const countryLanguage = Object.values(data.languages);
            const countryRegion = data.region;
            const countryMap = data.maps.googleMaps;
            const countryCurrencies = Object.keys(data.currencies);
            const countryTimeZone = Object.values(data.timezones);
            console.log(data);

            document.getElementById("flag").src = countryFlag;
            document.getElementById("name").innerHTML = countryName;
            document.getElementById("official").innerHTML = countryOfficialName;
            document.getElementById("capital").innerHTML = countryCapital;
            document.getElementById("total").innerHTML = countryTotalArea;
            document.getElementById("population").innerHTML = countryTotalPopulation;
            document.getElementById("lang").innerHTML = countryLanguage;
            document.getElementById("region").innerHTML = countryRegion;
            document.getElementById("map").href = countryMap;
            document.getElementById("currency").innerHTML = countryCurrencies;
            document.getElementById("timeZone").innerHTML = countryTimeZone;
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'May be the Country You Wrote has a spelling error in its name',
            });
        }
    }).catch(error => {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while fetching the data.',
        });
    });
}

fetchAPi();
