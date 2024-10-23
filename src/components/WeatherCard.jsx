import { useRef, useState } from "react"
import '../components/styles/weatherCard.css'

const WeatherCard = ({weather, temp, setTextInput, hasError}) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const handleChange = () => {
        setIsCelsius(!isCelsius)  
    }

    const city = useRef()

    const handleForm = event => {
        event.preventDefault();
        setTextInput(city.current.value.toLowerCase().trim())
    }

  return (
    <section className="weather">
        <h1 className="weather__title">Weather App</h1>
        <form className="weather__form" onSubmit={handleForm}>
            <input type="text" ref={city}/>
            <button className="weather_btn">Search</button>
        </form>
        {
            hasError?
                <>
                    <h2>That city not found</h2>
                    <h3>please, try again</h3>
                </>
            :
                <>
                    <h2 className="weather__city">{weather?.name}, {weather?.sys.country}</h2>
                    <article className="weather__container1">
                        <figure className="weather__fig">
                            <img 
                                className="weather__img"
                                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="wheather icon" 
                            />
                        </figure>
                        <div className="weather__clouds">
                            <h3>{weather?.weather[0].description}</h3>
                            <ul className="weather__info">
                                <li><span>Wind Speed</span> <span>{weather?.wind.speed}m/s</span></li>
                                <li><span>Clouds</span> <span>{weather?.clouds.all}%</span></li>
                                <li><span>Pressure</span> <span>{weather?.main.pressure}hPa</span></li>
                                <li><span>Humidity</span> <span>{weather?.main.humidity}%</span></li>
                            </ul>
                        </div>
                    </article>
                    <div className="weather__container2">
                        <h3 className="weather__temp">{
                            isCelsius?
                                temp?.celsius+' °C'
                            :
                                temp?.fahrenheit+' °F' 
                        }</h3>
                        <button className="weather_btn" onClick={handleChange}>{
                            isCelsius?
                                'Change to °F'
                            :
                                'Change to °C'
                        }</button>
                    </div>
                </>

        }
    </section>
  )
}
export default WeatherCard