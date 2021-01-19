import React from 'react';
import firebase from '../firebase';

class Weather extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            query: '',
            weather: {}
        };

        // dit is nodig om "this" beschikbaar te maken binnen de refreshWeather functie
        this.refreshWeather = this.refreshWeather.bind(this);

    }



    // functie die weer-data ophaalt en weergeeft
    async refreshWeather(evt) {

        if (evt.key === "Enter") {
            const api = {
                key: "085caf37b86251befe096a3966e0f79e",
                base: "https://api.openweathermap.org/data/2.5/"
            }

            // api aanroepen
            fetch(`${api.base}weather?q=${this.state.query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    // state updaten:
                    this.setState({weather:result})
                });
        }
    }


    render() {
        return <div>
            <h2 className="text-lg text-purple-300 font-semibold leading-6 text-center">&nbsp;</h2>
            <div className="content-center text-center">
                <input 
                type="text"
                className="search-bar rounded-full px-3 content-center "
                placeholder="Example Tilburg"
                onChange={e => this.setState({'query': e.target.value})}
                value={this.state.query}
                onKeyPress={this.refreshWeather}
            />
            </div>

            {/* Elementen hieronder alleen weergeven wanneer weather is geladen */}
            {(typeof this.state.weather.main != "undefined") ?  (
                <div>
                    <div className="location-box">
                        <div className="location text-center text-red-100 font-sans md:text-3xl sm:text-xl">{this.state.weather.name}, {this.state.weather.sys.country}</div>
                    </div>
                    <div className="weather-box text-center">
                        <div className="temp text-black-100 text-center font-sans md:text-5xl sm:text-xl">
                           <p className="text-red-100 text-center font-sans md:text-5xl sm:text-xl">{Math.round(this.state.weather.main.temp)}°C</p> 
                        </div>
                    </div>  
                </div>
            ) : ('')}          
        </div>;
    }
}

export default Weather