// Desc: This is the main app file
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MovieApp from './MovieApp';

function App() {
  return (
    <div className='body'>
      <BrowserRouter>
        <MovieApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
