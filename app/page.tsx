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
  const [isWriting, setIsWriting] = useState(false);
  const [savedLat, setSavedLat] = useState<Array<string>>([]);
  const [savedLon, setSavedLon] = useState<Array<string>>([]);
  const [weather, setWeather] = useState<object | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const lat = window.localStorage.getItem('lat');
      const lon = window.localStorage.getItem('lon');
      if (lat && lon) {
        setSavedLat(JSON.parse(lat));
        setSavedLon(JSON.parse(lon));
      } else {
        console.log('no cities saved');
      }
    }
  }, [savedLat.length]);

  const makeApiCallCity = async (city: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/fetchCity?city=${encodeURIComponent(city)}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      makeApiCallWeather(data[0].lat, data[0].lon);
    } catch (error) {
      console.error('error fetching data: ', error);
    } finally {
    }
  };

  const makeApiCallWeather = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`/api/FetchWeather?lat=${lat}&lon=${lon}`, {
        method: 'GET',
      });
      const data = await response.json();
      setWeather(data);
      makeApiCallDaily(lat, lon);
    } catch (error) {
      console.error('error fetching data: ', error);
    }
  };

  const makeApiCallDaily = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `/api/DailyForecast?lat=${encodeURIComponent(lat)}&lon=${lon}`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      setDailyForecast(data);
    } catch (error) {
      console.error('error fetching daily forecast data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const makeApiCallCallback = useCallback(makeApiCallWeather, []);

  const handleInputChange = (value: any) => {
    setIsWriting(value !== '');
  };

  const handleBlur = () => {
    setIsWriting(false);
  };

  return (
    <main className={styles.main}>
      <SearchComponent
        handleApiCall={makeApiCallCity}
        onInputChange={handleInputChange}
        onBlur={handleBlur}
      />
      {loading && savedLat.length !== 0 ? (
        <div className={styles.spinner}></div>
      ) : (
        <>
          {weather !== null && (
            <WeatherComponent
              data={weather}
              rain={JSON.stringify(dailyForecast?.list[0].pop * 100)}
              isWriting={isWriting}
              loading={loading}
            />
          )}

          {weather !== null && dailyForecast !== null && (
            <ForecastComponent
              data={dailyForecast}
              isWriting={isWriting}
              loading={loading}
            />
          )}
        </>
      )}

      {savedLat.length > 0 && savedLon.length > 0 && (
        <SliderComponent
          savedLat={savedLat}
          savedLon={savedLon}
          savedLatLonApiCall={makeApiCallCallback}
        />
      )}
    </main>
  );
}
