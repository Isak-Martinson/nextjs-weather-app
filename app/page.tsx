'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import SearchComponent from './components/SearchComponent';
import ForecastComponent from './components/ForecastComponent';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    console.log('useEffect weather data: ', weatherData);
  }, [weatherData]);
  const makeApiCall = async (city: any) => {
    const response = await fetch(
      `/api/fetchCity?city=${encodeURIComponent(city)}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    console.log('city: ', city, 'fetched data', data);
    setWeatherData(data);
  };

  return (
    <main className={styles.main}>
      <SearchComponent handleApiCall={makeApiCall} />
      {weatherData !== null ? (
        <ForecastComponent weatherData={weatherData} />
      ) : (
        <p>Search by any city in the searchbar</p>
      )}
    </main>
  );
}
