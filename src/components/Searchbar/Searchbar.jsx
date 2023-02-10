
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import {useState} from 'react';

 const Searchbar = ({onSubmit}) =>{
  

  const [query, setQuery] = useState('');
  

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  const onChange = ({ target }) => {
    setQuery(target.value);
  };

 
    return (
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={query}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
          />
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
