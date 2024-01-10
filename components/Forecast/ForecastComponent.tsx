import styles from './forecast.module.css';
import {
  Sun,
  Moon,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  AlignCenter,
} from 'feather-icons-react';

interface DailyData {
  dt: number;
  weather: [{ id: number; icon: string }];
  main: { temp: number };
}

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case '01d':
    case '01n':
      return <Sun />;
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <Cloud />;
    case '09d':
    case '09n':
      return <CloudDrizzle />;
    case '10d':
    case '10n':
      return <CloudRain />;
    case '11d':
    case '11n':
      return <CloudLightning />;
    case '13d':
    case '13n':
      return <CloudSnow />;
    case '50d':
    case '50n':
      return <AlignCenter />;
    default:
      return null;
  }
};

const ForecastComponent = ({
  data,
  isWriting,
  loading,
}: {
  data: any;
  isWriting: boolean;
  loading: boolean;
}) => {
  const dailyForecastData = data?.list || [];

  const dailyDataByDay = dailyForecastData.reduce(
    (acc: any, current: any, index: number) => {
      const date = new Date(current.dt * 1000);

      if (date.getUTCHours() === 15) {
        const dayKey = date.toISOString().split('T')[0];

        if (!acc[dayKey]) {
          acc[dayKey] = current;
        }
      }

      return acc;
    },
    {}
  );

  const dailyForecastList: DailyData[] = Object.values(
    dailyDataByDay
  ) as DailyData[];

  return (
    <section
      id={loading ? styles.sectionLoading : styles.section}
      className={`${isWriting ? styles.writing : styles.section} ${
        styles.test
      }`}
    >
      <ul
        id={styles.ul}
        className={loading ? styles.loading : styles.hasLoaded}
      >
        {dailyForecastList.map((test, index) => (
          <div key={index} className={styles.forecastContainer}>
            <li className={styles.li}>
              {new Date(test.dt * 1000).toDateString().slice(0, 3)}
            </li>
            <div className={styles.weatherContainer}>
              <p className={styles.temperature}>
                {Math.round(test.main.temp)}°
              </p>
              {getWeatherIcon(test.weather[0].icon)}
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default ForecastComponent;
