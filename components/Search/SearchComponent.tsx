import { useState } from 'react';
import styles from './search.module.css';
import { Search, ArrowRight } from 'feather-icons-react';

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
  const [writing, setWriting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    onInputChange(event.target.value);
    if (event.target.value.length !== 0) {
      setWriting(true);
    } else {
      setWriting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleApiCall(city);
    const input = document.getElementById('search') as HTMLInputElement;
    input.value = '';
    setWriting(false);
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
      <ArrowRight
        onClick={handleSubmit}
        color={writing ? '#212121' : '#757575'}
      />
    </form>
  );
};

export default SearchComponent;
