import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloud} from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function App(){
    const defaultWeather = {
        main: {
          temp: "N/A",
          temp_max: "N/A",
          temp_min: "N/A",
          feels_like: "N/A",
          humidity: "N/A"
        },
        weather: [{ main: "Weather", description: "Description" }],
        name: "City"
      };  
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(defaultWeather);
  const [error, setError] = useState(null);

  const api = {
    key: 'ce288cb34c1b03493094d3972043f3d1',
    base: 'https://api.openweathermap.org/data/2.5/'
  }

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
    .then(response => 
        {if(!response.ok){
            throw new Error("City not found.")
        }
        return response.json()})
    .then((result)=>{
        setWeather(result)
        setError(null)
    })
    .catch (error => {
        console.error("Fetch error", error)
        setError(error.message)
        setWeather({})
    })

  }
  

    return(
        <div className="container mx-auto px-4 sm:px-4 lg:px-8 w-full md:w-2/5 bg-sky-300 p-5 ">
            <div className="font-bold text-3xl lg:text-4xl text-center opacity-50 font-serif "> 
                <h1>Weather In</h1>
            </div>
            <div className="flex mx-auto pl-8 py-3">
                <input 
                    onChange={(e)=> setSearch(e.target.value)} 
                    type="text"
                    className="rounded-tl-2xl rounded-bl-2xl w-10/12 border-none py-2"
                    placeholder="Enter a city">
                </input>
                <button
                    disabled = {!search.trim()}
                    onClick={searchPressed}
                    className='bg-white px-5 rounded-tr-2xl rounded-br-2xl'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            
            {error ? (
            <div className="font-serif text-3xl sm:text-2xl md:text-4xl opacity-50">{error}</div>
            ) : ( typeof weather.main !== 'undefined' ? (
              <div className="mid-sec h-full w-full md:w-5/6 bg-white mx-auto rounded-2xl mt-5 px-2 md:px-6 pt-5 pb-20">
                <div className="head-line text-center p-0 ">
                <p className="text-black opacity-50 text-2xl md:text-3xl ">{weather.name}</p>
                <p className="text-black opacity-50 font-bold text-2xl md:text-3xl">...</p>
              </div> <br />
              <div className="flex justify-between p-3">
                  <p className="font-bold opacity-50 text-3xl md:text-4xl font-serif"><sub>{weather.main.temp}</sub> °C</p>
                  <div>
                      <p className="opacity-60 text-3xl">{weather.weather[0].main}</p><br/>
                      <p className="opacity-60 text-2xl ">Max: <sub>{weather.main.temp_max}</sub>°C</p>
                      <p className="opacity-60 text-2xl ">Min: <sub>{weather.main.temp_min}</sub>°C</p>
                  </div>
              </div>
              <div className="icon w-full text-center text-6xl lg:text-8xl opacity-60 pt-5">
                  <FontAwesomeIcon icon={faCloud} />
              </div>
              <p className='text-center font-serif opacity-50 text-xl'>{weather.weather[0].description}</p>
              <div  className='flex justify-between px-5 pt-5'>
                  <div>
                      <p className='text-3xl md:text-5xl opacity-50 py-2 font-serif'><sub>{weather.main.feels_like}</sub>°C</p>
                      <p className='text-xs  opacity-50 font-serif'>Feels like</p>
                  </div>
                  <div>
                      <p className='text-3xl md:text-5xl opacity-50 py-2 font-serif'>{weather.main.humidity}</p>
                      <p className='text-xs  opacity-50 font-serif'>Humidity</p>
                  </div>
              </div>
          </div>) : "")}    
        </div>
    )

}

export default App;