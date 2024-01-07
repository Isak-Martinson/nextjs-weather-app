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

const WeatherComponent = ({ data, rain }: { data: any; rain: any }) => {
  const date = new Date().toDateString();
  const name = data.name;
  const temp = Math.round(data.main.temp);
  const weather = data.weather[0].main;
  const icon = data.weather[0].icon;

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
            {icon === '01d' ? (
              <Sun className={styles.icon} />
            ) : icon === '01n' ? (
              <Moon className={styles.icon} />
            ) : icon === '02d' ||
              icon === '02n' ||
              icon === '03d' ||
              icon === '03n' ||
              icon === '04d' ||
              icon === '04n' ? (
              <Cloud className={styles.icon} />
            ) : icon === '09d' || icon === '09n' ? (
              <CloudDrizzle className={styles.icon} />
            ) : icon === '10d' || icon === '10n' ? (
              <CloudRain className={styles.icon} />
            ) : icon === '11d' || icon === '11n' ? (
              <CloudLightning className={styles.icon} />
            ) : icon === '13d' || icon === '13n' ? (
              <CloudSnow className={styles.icon} />
            ) : icon === '50d' || icon === '50n' ? (
              <AlignCenter className={styles.icon} />
            ) : null}

            <p className={styles.p}>{weather}</p>
          </div>
          <div id={styles.rain} className={styles.conditionsContainer}>
            <Droplet className={styles.icon} fill='#212121' />
            <p className={styles.p}>Chance of rain: {rain}%</p>
          </div>
          <div id={styles.save} className={styles.conditionsContainer}>
            <Bookmark className={styles.icon} />
            <p className={styles.p}>Save location</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WeatherComponent;
