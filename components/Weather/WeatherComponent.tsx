import { useEffect, useState } from 'react';
import styles from './weather.module.css';
import {
  Bookmark,
  Droplet,
  Sun,
  Moon,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  AlignCenter,
} from 'feather-icons-react';

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case '01d':
      return <Sun className={styles.icon} />;
    case '01n':
      return <Moon className={styles.icon} />;
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <Cloud className={styles.icon} />;
    case '09d':
    case '09n':
      return <CloudDrizzle className={styles.icon} />;
    case '10d':
    case '10n':
      return <CloudRain className={styles.icon} />;
    case '11d':
    case '11n':
      return <CloudLightning className={styles.icon} />;
    case '13d':
    case '13n':
      return <CloudSnow className={styles.icon} />;
    case '50d':
    case '50n':
      return <AlignCenter className={styles.icon} />;
    default:
      return null;
  }
};

const WeatherComponent = ({ data, rain }: { data: any; rain: any }) => {
  const [isSaved, setIsSaved] = useState(false);
  const date = new Date().toDateString();
  const name = data.name;
  const temp = Math.round(data.main.temp);
  const weather = data.weather[0].main;
  const icon = data.weather[0].icon;

  const [existingCities, setExistingCities] = useState<string[]>(() => {
    const key = localStorage.getItem('cities') || '';
    return key ? JSON.parse(key) : [];
  });

  useEffect(() => {
    setIsSaved(existingCities.includes(name));
  }, [name, existingCities]);

  const handleSaveClick = () => {
    if (!existingCities.includes(name)) {
      const updatedCities = [...existingCities, name];
      localStorage.setItem('cities', JSON.stringify(updatedCities));
      setExistingCities(updatedCities);
      setIsSaved(true);
    } else {
      console.log(`City "${name}" is already saved.`);
    }
  };

  const handleRemoveSave = () => {
    const updatedCities = existingCities.filter((city) => city !== name);
    localStorage.setItem('cities', JSON.stringify(updatedCities));
    setExistingCities(updatedCities);
    setIsSaved(false);
  };

  return (
    <section>
      <div>
        <div id={styles.firstSection}>
          <h1 id={styles.h1}>{name}</h1>
          <p id={styles.date}>{date}</p>
          <h2 id={styles.h2}>{temp}°</h2>
        </div>
        <div id={styles.secondSection}>
          <div className={styles.conditionsContainer}>
            {getWeatherIcon(icon)}

            <p className={styles.p}>{weather}</p>
          </div>
          <div id={styles.rain} className={styles.conditionsContainer}>
            <Droplet className={styles.icon} fill='#212121' />
            <p className={styles.p}>Rain: {rain}%</p>
          </div>
          {!isSaved ? (
            <div
              onClick={handleSaveClick}
              id={styles.save}
              className={styles.conditionsContainer}
            >
              <Bookmark className={styles.icon} />
              <p className={styles.p}>Save location</p>
            </div>
          ) : (
            <div
              onClick={handleRemoveSave}
              id={styles.save}
              className={styles.conditionsContainer}
            >
              <Bookmark className={styles.icon} fill='#212121' />
              <p className={styles.p}>Remove save</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default WeatherComponent;
