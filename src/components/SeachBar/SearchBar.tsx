import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

interface Props {
  data: string[];
  placeHolder: string;
}

const SearchBar = ({ data, placeHolder }: Props) => {
  const [searchQuery, setSeachQuery] = useState<string>('');
  const [showSuggestions, setshowSuggestions] = useState<Boolean>(false);
  const [activeIndex, setActiveindex] = useState<number>(0);
  const navigate = useNavigate();

  console.log('render');
  function filterSearch(): string[] {
    return data.filter((elem) =>
      elem.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleSearchQueryOrKeyDown(e: any): void {
    if (
      e.type === 'keydown' &&
      e.code === 'Tab' &&
      showSuggestions &&
      filterSearch().length > 0
    ) {
      const newValue = filterSearch()[activeIndex];
      e.preventDefault();
      setTimeout(() => {
        setSeachQuery(newValue);
        setshowSuggestions(false);
      }, 0);
    }
    if (
      e.type === 'keydown' &&
      e.code === 'ArrowUp' &&
      activeIndex > 0 &&
      showSuggestions
    ) {
      setActiveindex(activeIndex - 1);
      ('arroup');
    }
    if (
      e.type === 'keydown' &&
      e.code === 'ArrowDown' &&
      activeIndex < filterSearch().length &&
      showSuggestions
    ) {
      setActiveindex(activeIndex + 1);
    } else {
      setSeachQuery(e.target.value);
      setshowSuggestions(true);
    }
  }

  function handelSuggsestionClick(value: string): void {
    setSeachQuery(value);
    setshowSuggestions(false);
  }

  function handleSumit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    navigate(`/#${searchQuery}`);
  }

  const renderSuggestions = () => {
    return (
      <ul className={styles.suggsestions}>
        {filterSearch().map((elem, index) => (
          <li
            key={elem}
            onClick={() => handelSuggsestionClick(elem)}
            className={index === activeIndex ? styles.active : ''}
          >
            <a href=''>{elem}</a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form onSubmit={handleSumit} className={`${styles.flex} searchContiner`}>
      <div className={styles.inputs}>
        <TextField
          value={searchQuery}
          onChange={handleSearchQueryOrKeyDown}
          onKeyDown={handleSearchQueryOrKeyDown}
          id='outlined-basic'
          label={placeHolder}
          variant='outlined'
        />
        {showSuggestions && searchQuery.length > 0 && renderSuggestions()}
      </div>
      <Button type='submit ' color='secondary' variant='contained'>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
