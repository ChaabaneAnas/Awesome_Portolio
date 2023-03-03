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

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSeachQuery(e.target.value);
  };

  const filterSearch = (): string[] => {
    return data.filter((elem) =>
      elem.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <form className='searchContainer'>
      <div>
        <TextField
          value={searchQuery}
          onChange={handleSearchQuery}
          id='outlined-basic'
          label={placeHolder}
          variant='outlined'
        />

        {searchQuery.length > 0 && (
          <ul className='sugsession'>
            {filterSearch().map((item) => (
              <li key={item}>
                <a href={item}>{item}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button color='secondary' variant='contained'>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
