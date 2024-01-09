import { useState } from 'react';
import styles from './search.module.css';

const SearchComponent = ({
  handleApiCall,
  onInputChange,
  onBlur,
}: {
  handleApiCall: Function;
  onInputChange: Function;
  onBlur: Function;
}) => {
  const [city, setCity] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    onInputChange(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleApiCall(city);
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = '';
    input.blur();
  };

  const handleBlur = () => {
    onBlur();
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
        onBlur={handleBlur}
      />
    </form>
  );
};

export default SearchComponent;
