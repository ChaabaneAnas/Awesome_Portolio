import { useState } from 'react';
import SearchBar from './components/SeachBar/SearchBar';
import data from './data/data';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <SearchBar data={data} placeHolder='Search' />
    </div>
  );
}

export default App;
