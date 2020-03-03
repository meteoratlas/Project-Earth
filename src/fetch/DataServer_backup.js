class City {
    
    constructor(key, name, latitude, longitude, population) {
        this.key = key;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.population = population;        
    }

    show() {
        return `City: ${this.name} | Latitude: ${this.latitude} | Longtitude: ${this.longitude} | Population: ${this.population}`;
    }

    movedIn(number) {
        this.population += number;
    }

    movedOut(number) {
        this.population -= number;
    } 

    howBig() {
        let result;
        switch (true) {
            case (this.population > 100000):
                result = "City";
                break;
            case (this.population > 20000):
                result = "Large town";
                break;
            case (this.population > 1000):
                result = "Town";
                break;
            case (this.population > 100):
                result = "Village";
                break;
            case (this.population >= 1):
                result = "Hamlet";
                break;
            default:
                result = "No one live here!";
        }
        return result;
    }

    whichSphere() {
        if (this.latitude > 0) {
            return "Northern Hemisphere";
        } else if (this.latitude === 0) {
            return "Equator";
        } else {
            return "Southern Hemisphere";
        }
    }
}

class Community {
    
    constructor() {
        this.allCity = [];
        // this.url = 'http://localhost:5000/';
        // this.data;
    }

    getMostNorthern() {
        const allLatitude = this.allCity.map(each => each.latitude).filter(each => each !== undefined);
        const mostNorthernLatitude = Math.max(...allLatitude);
        const mostNorthernCities = this.allCity.filter(each => (each.latitude === mostNorthernLatitude) ? each : undefined);
        return mostNorthernCities;
    }

    getMostSouthern() {
        const allLatitude = this.allCity.map(each => each.latitude).filter(each => each !== undefined);
        const mostSouthernLatitude = Math.min(...allLatitude);
        const mostSouthernCities = this.allCity.filter(each => (each.latitude === mostSouthernLatitude) ? each : undefined);
        return mostSouthernCities;
    }

    getPopulation() {
        const allPop = this.allCity.map(each => each.population).filter(each => each !== undefined);
        const total = allPop.reduce((acc, population) => acc + population);
        return total;
    }

    createCity(newCity) {
        this.allCity.push(newCity);
    }

    deleteCity(obj) {
        const newCityArr = this.allCity.filter(eachCity => eachCity.name !== obj.name);
        this.allCity = newCityArr.slice();
    }

    setCountKey(newCountKey) {
        console.log(this.allCity.length);
        if (this.allCity.length === 0 || newCountKey === 0) {
            this.allCity.push({ key: 0, countKey: newCountKey });
        } else if (this.allCity.length > 0) {
            this.allCity.forEach(each => {
                if (each.key === 0) {
                    each.countKey = newCountKey;
                }
            });
        } else {
            console.log('Set Count Key Error!');
            
        }
    }
}

const functions = {
    createShowArea: () => {
        let parentDiv = document.createElement("div");
        parentDiv.className = "showArea";

        // create showAccName div
        let childDiv1 = document.createElement("div");
        childDiv1.className = "showCityName";
        parentDiv.appendChild(childDiv1);

        // create showLatitude div
        let childDiv2 = document.createElement("div");
        childDiv2.className = "showLatitude";
        parentDiv.appendChild(childDiv2);

        // create showLongitude div
        let childDiv3 = document.createElement("div");
        childDiv3.className = "showLongitude";
        parentDiv.appendChild(childDiv3);

        // create showPopulation div
        let childDiv4 = document.createElement("div");
        childDiv4.className = "showPopulation";
        parentDiv.appendChild(childDiv4);

        // create "Remove" button
        let newRemoveBtn = document.createElement("button");
        newRemoveBtn.className = "removeCity";
        let removeBtnContent = document.createTextNode("Remove");

        newRemoveBtn.appendChild(removeBtnContent);
        parentDiv.appendChild(newRemoveBtn);
        return parentDiv
    },

    // initMap: (latNum, longNum) => {
    //     // The location of Uluru 
    //     var uluru = { lat: Number(latNum), lng: Number(longNum) };
    //     // The map, centered at Uluru
    //     var map = new google.maps.Map(
    //         document.getElementById('map'), { zoom: 9, center: uluru });
    //     // The marker, positioned at Uluru
    //     var marker = new google.maps.Marker({ position: uluru, map: map });

    // }
};

export { City, Community, functions }