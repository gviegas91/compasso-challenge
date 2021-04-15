import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext, APIErrorContext } from '../context/index';
import apiUrl from '../api/index';
import '../assets/css/SearchField.scss';

const SearchField = () => {
  const { setUser } = useContext(UserContext);
  const { error, addError, removeError } = useContext(APIErrorContext);
  const [searchInput, setSearchInput] = useState('');

  const submitSearch = e => {
    e.preventDefault();
    axios
      .get(`${apiUrl}${searchInput}`)
      .then(response => {
        if (error) {
          removeError(null);
        }
        setUser(response.data);
      })
      .catch(err => {
        if (err.response) {
          addError(err.response.data.message, err.response.status);
        } else if (err.request) {
          addError(
            'Ops! We found something wrong! :( Please, try again later.',
            ''
          );
        } else {
          addError(
            'Ops! We found something wrong! :( Please, try again later.',
            ''
          );
        }
      });
  };

  return (
    <div className="search card-panel teal darken-1">
      <form className="search-form" onSubmit={submitSearch}>
        <input
          className="search-field"
          type="text"
          placeholder="Github user name"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="search-button btn grey darken-4 waves-effect"
        >
          <i className="material-icons prefix">search</i>
        </button>
      </form>
    </div>
  );
};
export default SearchField;
