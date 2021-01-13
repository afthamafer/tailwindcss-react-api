import React from 'react';
import TodoList from './TodoList';


class Content extends React.Component {

    componentDidMount() {

        const [query, setQuery] =  this.useState('');
        const [weather, setWeather] = this.useState({});
      
        this.initWeatherApi()
        this.initClock()


    }


    initWeatherApi() {

        const api = {
            key: "085caf37b86251befe096a3966e0f79e",
            base: "https://api.openweathermap.org/data/2.5/"
        }

        const [query, setQuery] =  this.useState('');
        const [weather, setWeather] = this.useState({});
      
        const search = evt => {
            if (evt.key === "Enter") {
                fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                    .then(res => res.json())
                    .then(result => {
                        setWeather(result);
                        setQuery('');
                        console.log(result);
                    });
            }
        }


    }


    initClock() {

        //weergeven dag uit array
        var dag = new Date().getDay();
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dagnaam = week[dag];

        //weergeven maand uit array
        var maand = new Date().getMonth();
        var maandArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var maandNaam = maandArray[maand];


        //weergeven datum en tijd
        //als de minuten kleiner is dan 10 voeg een 0 toe voor dat getal
        //example 12:4  wordt 12:04

        var today = new Date();
        var date = today.getDate();
        var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        var dateTime = date + ' ' + time;
        document.getElementById("date").innerHTML = dagnaam + " " + date + "th " + maandNaam;
        document.getElementById('time').innerHTML = time;


    }

    render() {
        return <div>
            <div>
                <nav>


                    <div className="flex justify-center items-center min-h-screen">
                        <div className="flex-1 max-w-7xl p-16">
                            <div className="grid grid-cols-2 grid-rows-3 gap-2 grid-flow-row-dense lg:grid-cols-2">

                                <div className="p-4 pr-6 bg-yellow-600 border-1-8 border-transparent rounded-md">
                                    <h2 className="text-lg font-semibold leading-6">Linkse scherm</h2>
                                    <p className="text-gray-600" id="weather"> Weer API</p>
                                </div>

                                <div className="p-4 pr-6 bg-purple-400 border-1-8 text-center border-transparent rounded-md">
                                    <h2 className="text-lg font-semibold leading-6">Rechtse scherm</h2>

                                    <p className="text-black-100 text-center" id="date"></p>
                                    <p className="text-black-100 text-center font-sans md:text-5xl sm:text-lg" id="time">Tijd</p>

                                    <svg className=" mx-auto w-14 h-14 text-center object-none object-center text-gray-200 items-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>


                                </div>

                                <div className=" col-span-2 p-4 pr-6 bg-green-400 border-1-8 border-transparent rounded-md">
                                    <TodoList></TodoList>
                                </div>


                            </div>
                        </div>
                    </div>
                </nav>
            </div>



        </div>;
    }
}

export default Content