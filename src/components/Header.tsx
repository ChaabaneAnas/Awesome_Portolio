import React, { useState } from 'react';

const Header = () => {
  const [searchQuery, setSeachQuery] = useState<string>('');
  const searchElements: string[] = [
    'Home',
    'Project',
    'Contact',
    'Testimonials',
  ];
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSeachQuery(e.target.value);
  };

  const filterSearch = (): string[] => {
    return searchElements.filter((elem) =>
      elem.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <nav className='nav'>
      <h1></h1>
      <ul>
        <li>
          <a href=''>Home</a>
        </li>
        <li>
          <a href=''>Project</a>
        </li>
        <li>
          <a href=''>Contact</a>
        </li>
        <li>
          <a href=''>Testimonials</a>
        </li>
      </ul>
      <div>
        <input
          className='search'
          type='text'
          value={searchQuery}
          onChange={handleSearchQuery}
        />
        <ul>
          {filterSearch().map((item) => (
            <li>
              <a key={item} href={item}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
