import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'feather-icons-react';
import styles from './slider.module.css';

const SliderComponent = ({
  savedCities,
  savedCitiesApiCall,
}: {
  savedCities: Array<string>;
  savedCitiesApiCall: Function;
}) => {
  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    if (savedCities.length > 0) {
      const selectedCity = savedCities[cityIndex];

      savedCitiesApiCall(selectedCity);
    }
  }, [cityIndex, savedCities, savedCitiesApiCall]);

  const handleNextCity = () => {
    setCityIndex((prevIndex) => (prevIndex + 1) % savedCities.length);
  };
  const handlePrevCity = () => {
    setCityIndex(
      (prevIndex) => (prevIndex - 1 + savedCities.length) % savedCities.length
    );
  };
  return (
    <div id={styles.sliderContainer}>
      {savedCities.length > 1 ? (
        <div id={styles.slider}>
          <ChevronLeft onClick={handlePrevCity} />
          {savedCities.map((test, index) => (
            <div
              className={cityIndex === index ? styles.dotSelected : styles.dot}
              key={index}
            ></div>
          ))}
          <ChevronRight onClick={handleNextCity} />
        </div>
      ) : null}
    </div>
  );
};
export default SliderComponent;
