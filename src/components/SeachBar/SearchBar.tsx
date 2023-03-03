import React, { useState } from 'react';
import styles from './SearchBar.module.css';

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
    <div>
      <input
        placeholder={placeHolder}
        className='search'
        type='text'
        value={searchQuery}
        onChange={handleSearchQuery}
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
  );
};

export default SearchBar;
