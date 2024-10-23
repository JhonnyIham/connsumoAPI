import { useEffect, useState } from 'react'; // Importa hooks de React para manejar estado y efectos secundarios
import './App.css'; // Importa los estilos de la aplicación
import axios from 'axios'; // Importa la librería axios para realizar solicitudes HTTP
import WeatherCard from './components/WeatherCard'; // Importa el componente WeatherCard
import Header from './components/Header'; // Importa el componente Header
import Footer from './components/Footer'; // Importa el componente Footer
const APIkey = 'bb88c96e978adf0da18c937d9b2e85d8'; // Clave de la API de OpenWeather

function App() {
  // Declaración de estados usando useState
  const [coords, setCoords] = useState(); // Almacena las coordenadas del usuario
  const [weather, setWeather] = useState(); // Almacena la información del clima actual
  const [temp, setTemp] = useState(); // Almacena las temperaturas en Celsius y Fahrenheit
  const [isLoading, setIsLoading] = useState(true); // Estado de carga para mostrar un indicador de carga
  const [textInput, setTextInput] = useState(''); // Almacena el texto ingresado por el usuario para buscar el clima
  const [finder, setFinder] = useState(); // Almacena los datos del clima encontrados mediante búsqueda
  const [hasError, setHasError] = useState(false); // Estado para manejar errores en las solicitudes

  // Función que se ejecuta al obtener la ubicación del usuario
  const success = position => {
    const obj = {
      lat: position.coords.latitude, // Extrae la latitud
      lon: position.coords.longitude // Extrae la longitud
    }
    setCoords(obj); // Establece las coordenadas en el estado
  }

  // Efecto secundario que se ejecuta cuando se obtienen las coordenadas
  useEffect(() => {
    if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`; // Construye la URL de la API
      axios.get(url) // Realiza la solicitud HTTP
      .then(res => {
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(2), // Convierte la temperatura a Celsius
          fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2) // Convierte la temperatura a Fahrenheit
        }
        setTemp(obj); // Establece las temperaturas en el estado
        setWeather(res.data); // Establece la información del clima en el estado
      })
      .catch(err => console.log(err)) // Maneja errores de la solicitud
      .finally(() => {
        setIsLoading(false); // Indica que la carga ha terminado
      })
    }
  }, [coords]) // Este efecto se ejecuta cada vez que cambia `coords`

  // Efecto secundario que se ejecuta al cambiar el texto ingresado
  useEffect(() => {
    if (textInput) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`; // Construye la URL de la API con el texto de búsqueda
      axios.get(url) // Realiza la solicitud HTTP
      .then(res => {
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(2), // Convierte la temperatura a Celsius
          fahrenheit: ((res.data.main.temp - 273.15) * (9/5) + 32).toFixed(2) // Convierte la temperatura a Fahrenheit
        }
        setTemp(obj); // Establece las temperaturas en el estado
        setHasError(false); // Reinicia el estado de error
        setFinder(res.data); // Establece la información del clima encontrada en el estado
      })
      .catch(err => {
        setHasError(true); // Indica que ocurrió un error
        console.log(err); // Imprime el error en la consola
      })  
      .finally(() => {
        setIsLoading(false); // Indica que la carga ha terminado
      })
    }
  }, [textInput]) // Este efecto se ejecuta cada vez que cambia `textInput`

  // Efecto que se ejecuta al montar el componente para obtener la ubicación del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success); // Obtiene la posición geográfica del usuario
  }, []) // Este efecto solo se ejecuta una vez al montar el componente

  // Estilo de fondo que se aplicará a la aplicación
  let bgStyle = {};
  if (finder) {
    // Si hay datos de búsqueda, usa el ícono del clima de la búsqueda
    bgStyle = {
      backgroundImage: `url('../assets/backgrounds/${finder?.weather?.[0]?.icon || 'loading'}.png')`
    }
  } else {
    // Si no hay búsqueda, usa el ícono del clima actual
    bgStyle = {
      backgroundImage: `url('../assets/backgrounds/${weather?.weather?.[0]?.icon || ''}.png')`
    }
  }

  return (
    <div>
      <Header/> {/* Renderiza el componente Header */}
      <div className='app' style={bgStyle}> {/* Aplica el estilo de fondo a la aplicación */}
        {
          isLoading? // Verifica si está cargando
            <img className="loading" src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="loading" /> // Muestra un gif de carga
          :
            textInput? // Si hay texto de entrada
              isLoading? // Verifica si sigue cargando
                <img className="loading" src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif" alt="loading" /> // Muestra un gif de carga
              :
                <WeatherCard // Renderiza el componente WeatherCard con datos de búsqueda
                  weather={finder}
                  temp={temp} 
                  setTextInput={setTextInput}
                  hasError={hasError}
                />
            :
              <WeatherCard // Renderiza el componente WeatherCard con el clima actual
                weather={weather}
                temp={temp} 
                setTextInput={setTextInput}
                hasError={hasError}
              />
        }
      </div>
      <Footer/> {/* Renderiza el componente Footer */}
    </div>
  )
}

export default App; // Exporta el componente App
