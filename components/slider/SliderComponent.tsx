import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'feather-icons-react';
import styles from './slider.module.css';

const SliderComponent = ({
  savedLat,
  savedLon,
  savedLatLonApiCall,
}: {
  savedLat: Array<string>;
  savedLon: Array<string>;
  savedLatLonApiCall: Function;
}) => {
  const [latLonIndex, setLatLonIndex] = useState(0);

  useEffect(() => {
    if (savedLat.length > 0 && savedLon.length > 0) {
      const selectedLat = savedLat[latLonIndex];
      const selectedLon = savedLon[latLonIndex];

      savedLatLonApiCall(selectedLat, selectedLon);
    }
  }, [latLonIndex, savedLat, savedLon, savedLatLonApiCall]);

  const handleNextCity = () => {
    setLatLonIndex((prevIndex) => (prevIndex + 1) % savedLat.length);
  };
  const handlePrevCity = () => {
    setLatLonIndex(
      (prevIndex) => (prevIndex - 1 + savedLat.length) % savedLat.length
    );
  };
  return (
    <div id={styles.sliderContainer}>
      {savedLat.length > 1 ? (
        <div id={styles.slider}>
          <ChevronLeft onClick={handlePrevCity} />
          {savedLat.map((test, index) => (
            <div
              className={
                latLonIndex === index ? styles.dotSelected : styles.dot
              }
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
