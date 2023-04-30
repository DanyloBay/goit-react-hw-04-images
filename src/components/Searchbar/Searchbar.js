import Notiflix from 'notiflix';
import { useState } from 'react';
import './Searchbar.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.info('Please enter search info!');
      return;
    }
    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className="searchbar">
      <form className="searchbar__form" onSubmit={handleSearchSubmit}>
        <button type="submit" className="searchbar__button">
          <AiOutlineSearch
            style={{ color: 'white', width: '25px', height: '25px' }}
          />
        </button>

        <input
          className="searchbar__input"
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
