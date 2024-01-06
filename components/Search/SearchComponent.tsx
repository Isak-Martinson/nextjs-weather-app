import { useState } from 'react';
import styles from './search.module.css';
import { Search } from 'feather-icons-react';

const SearchComponent = ({ handleApiCall }: { handleApiCall: Function }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('searchComponent CITY: ', city);
    handleApiCall(city);
  };
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        placeholder='Search by city'
        className={styles.input}
        onChange={(e) => handleInputChange(e)}
        type='text'
      />
      <Search onClick={handleSubmit} />
    </form>
  );
};

export default SearchComponent;
