import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './SearchBar.module.css';
import { bgcolor } from '@mui/system';

interface Props {
  data: string[];
  placeHolder: string;
}

const SearchBar = ({ data, placeHolder }: Props) => {
  const [searchQuery, setSeachQuery] = useState<string>('');
  const [showSuggestions, setshowSuggestions] = useState<Boolean>(false);
  const [activeIndex, setActiveindex] = useState<number>(0);

  function filterSearch(): string[] {
    return data.filter((elem) =>
      elem.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleSearchQueryOrKeyDown(e: any): void {
    console.log(e.type);
    
    if (e.type === 'change') {
      console.log('this is change');
      setSeachQuery(e.target.value);
      setshowSuggestions(true);
    }

    if (e.type === 'keydown') {
      const { code } = e;
      console.log(code);
      e.preventDefault();

      if (code === 'Tab' && showSuggestions && filterSearch().length > 0) {
        setSeachQuery(filterSearch()[activeIndex]);
        setshowSuggestions(false);
      }

      if (code === 'ArrowUp' && activeIndex > 0) {
        setActiveindex(activeIndex + 1);
        console.log('this is ArrowUp');
      }

      if (code === 'ArrowDown' && activeIndex < filterSearch().length) {
        setActiveindex(activeIndex - 1);
        console.log('this is ArrowDown');
      }
    }
  }

  function handelSuggsestionClick(value: string): void {
    setSeachQuery(value);
    setshowSuggestions(false);
  }

  function handleSumit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  const renderSuggestions = () => {
    if (!showSuggestions) return null;

    return (
      <ul>
        {filterSearch().map((elem, index) => (
          <li
            key={elem}
            onClick={() => handelSuggsestionClick(elem)}
            className={index === activeIndex ? styles.active : ''}
          >
            {elem}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form className={`${styles.flex} searchContiner`}>
      <div>
        <TextField
          value={searchQuery}
          onChange={handleSearchQueryOrKeyDown}
          onKeyDown={handleSearchQueryOrKeyDown}
          id='outlined-basic'
          label={placeHolder}
          variant='outlined'
        />
        {renderSuggestions()}
      </div>
      <Button color='secondary' variant='contained'>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
