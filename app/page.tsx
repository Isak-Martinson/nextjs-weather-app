'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import SearchComponent from './components/SearchComponent';

export default function Home() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const makeApiCall = async (city: any) => {
    const response = await fetch('/api/fetchCity', {
      method: 'GET',
    });
    const data = await response.json();
    console.log('city: ', city, 'fetched data', data[0]);
    setLat(JSON.stringify(data[0].lat));
    setLon(JSON.stringify(data[0].lat));
    console.log(lat, lon);
  };

  return (
    <main className={styles.main}>
      <SearchComponent handleApiCall={makeApiCall} />
      <h1>Weather App</h1>
      <button onClick={makeApiCall}>api call</button>
    </main>
  );
}
