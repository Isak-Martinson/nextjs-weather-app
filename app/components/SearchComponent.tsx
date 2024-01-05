import { useState } from 'react';
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
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input onChange={(e) => handleInputChange(e)} type='text' />
      <button>Search</button>
    </form>
  );
};

export default SearchComponent;
