const ForecastComponent = (weatherData: any) => {
  console.log('forecast component: ', weatherData.weatherData.main.temp);
  return (
    <section>
      <h2>weather forecast component</h2>
      <h2>{weatherData.weatherData.main.temp}</h2>
    </section>
  );
};
export default ForecastComponent;
