'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import SearchComponent from '../components/Search/SearchComponent';
import ForecastComponent from '../components/Forecast/ForecastComponent';

export default function Home() {
  const [forecast, setForecast] = useState<Object | null>(null);
  // useEffect(() => {
  //   console.log('useEffect weather data: ', weatherData);
  // }, [weatherData]);
  const makeApiCall = async (city: any) => {
    const response = await fetch(
      `/api/fetchCity?city=${encodeURIComponent(city)}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    console.log('city: ', city, 'fetched data', data);
    setForecast(data);
  };

  return (
    <main className={styles.main}>
      <SearchComponent handleApiCall={makeApiCall} />
      {forecast !== null ? (
        <ForecastComponent data={forecast} />
      ) : (
        <p>Search by any city in the searchbar</p>
      )}
    </main>
  );
}
