import { useState } from 'react';
import styles from './search.module.css';

const SearchComponent = ({ handleApiCall }: { handleApiCall: Function }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleApiCall(city);
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = '';
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        autoComplete='off'
        id='search'
        placeholder='Search by city'
        className={styles.input}
        onChange={(e) => handleInputChange(e)}
        type='text'
      />
    </form>
  );
};

export default SearchComponent;
