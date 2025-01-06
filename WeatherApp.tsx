import {
  useEffect,
  useState,
} from 'react';

import Content from '@/pages/Content';

export default function WeatherApp (){
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Cairo");

  const fetchWeatherData = async (selectedCity: string) => {
    try {
      const response = await fetch(`/api/weather?city=${selectedCity}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  if (error) {
    return <div className='text-red font-medium text-center'>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className='text-violet-500 text-[40px] mt-12 tracking-widest font-medium text-center'>Loading...</div>;
  } 

  return (
    <div>
      <Content 
        temperature={weatherData.temperature}
        humidity={weatherData.humidity}
        city={city}
        setCity={setCity}
        windSpeed={weatherData.windSpeed}
        precipitation={weatherData.precipitation}
        weather={weatherData.weather}
        WeatherDescription={weatherData.WeatherDescription}
      />
    </div>
  );
};

