let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let d = new Date();
let today = d.getDay();
let dayDate = d.getDate();
let month = d.getMonth();

let inputSearch = document.querySelector("#inputSerach");

inputSearch.addEventListener("input", function () {
    let city = inputSearch.value;
    
    getData(city);
});


getData("Cairo");

async function getData(city) {
    try {
        let myHttp = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=49a0f320b7c54514ae4132421241312&q=${city}&days=3`);
        let data = await myHttp.json();

        let locationName = data.location.name;
        let current = data.current;
        let forecast = data.forecast.forecastday;

    
        document.querySelector("#rowData").innerHTML = `
            <div class=" col-lg-4 p-0">
                <div class="div1 divheghit rounded-3">
                    <div class="d-flex align-items-center justify-content-between p-2 headdegree1 rounded-3">
                        <span>${days[today]}</span>
                        <span>${dayDate} ${months[month]}</span>
                    </div>
                    <h5 class="text-start mt-4 px-3">${locationName}</h5>
                    <div class="text-start px-3">
                        <h1 class="text-white degree">${current.temp_c}<sup>o</sup>C</h1>
                        <img src="${current.condition.icon}" alt="">
                    </div>
                    <p class="text-info text-start px-2">${current.condition.text}</p>
                    <div class="d-flex align-items-center gap-3 pt-5 ps-2">
                        <div><img src="imgs/icon-umberella@2x.png" width="23px" alt=""> ${current.humidity}%</div>
                        <div><img src="imgs/icon-wind@2x.png" width="23px" alt=""> ${current.wind_kph} km/h</div>
                        <div><img src="imgs/icon-compass@2x.png" width="23px" alt=""> ${current.wind_dir}</div>
                    </div>
                </div>
            </div>
            ${forecast.slice(1, 3).map((day, index) => `
                <div class="col-lg-4  p-0">
                    <div class="${index % 2 === 0 ? 'div2' : 'div1'} divheghit rounded-3">
                        <div class="p-2 headdegree1">
                            <span>${days[(today + index + 1) % 7]}</span>
                        </div>
                        <div class="pt-5">
                            <img src="${day.day.condition.icon}" width="15%" alt="">
                        </div>
                        <div class="pt-3">
                            <h3 class="text-white">${day.day.maxtemp_c}<sup>o</sup>C</h3>
                        </div>
                        <div>
                            <p>${day.day.mintemp_c}<sup>o</sup></p>
                        </div>
                        <div class="text-info">
                            <p>${day.day.condition.text}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        
    }
}
