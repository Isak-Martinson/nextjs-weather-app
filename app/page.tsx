'use client';
import styles from './page.module.css';
import { useEffect, useState, useCallback } from 'react';
import SearchComponent from '../components/Search/SearchComponent';
import WeatherComponent from '../components/Weather/WeatherComponent';
import ForecastComponent from '../components/Forecast/ForecastComponent';
import SliderComponent from '@/components/slider/SliderComponent';

interface DailyForecast {
  list: any[];
}

export default function Home() {
  const [savedCities, setSavedCities] = useState<Array<string>>([]);
  const [weather, setWeather] = useState<object | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const cities = window.localStorage.getItem('cities');
      if (cities) {
        setSavedCities(JSON.parse(cities));
      } else {
        console.log('no cities saved');
      }
    }
  }, []);

  const makeApiCall = async (city: any) => {
    const response = await fetch(
      `/api/fetchCity?city=${encodeURIComponent(city)}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    setWeather(data);
    makeApiCallDaily(data.coord.lat, data.coord.lon);
  };

  const makeApiCallCallback = useCallback(makeApiCall, []);

  const makeApiCallDaily = async (lat: number, lon: number) => {
    const response = await fetch(
      `/api/DailyForecast?lat=${encodeURIComponent(lat)}&lon=${lon}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    setDailyForecast(data);
  };

  return (
    <main className={styles.main}>
      <SearchComponent handleApiCall={makeApiCall} />
      {weather !== null ? (
        <WeatherComponent
          data={weather}
          rain={JSON.stringify(dailyForecast?.list[0].pop * 100)}
        />
      ) : (
        <p>Search by any city in the searchbar</p>
      )}

      {weather !== null && dailyForecast !== null && (
        <ForecastComponent data={dailyForecast} />
      )}
      {savedCities.length > 0 && (
        <SliderComponent
          savedCities={savedCities}
          savedCitiesApiCall={makeApiCallCallback}
        />
      )}
    </main>
  );
}
