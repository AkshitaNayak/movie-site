import { Route,Routes,Link } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Movies from './pages/Movie';
import Error404 from './pages/Error404';
import MovieRec from './pages/MovieRec';
import Actor from './pages/Actor';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Header/>
      <Toaster />
    <Routes>
      <Route index element={<Home />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/header' element={<Header />}/>
      <Route path='/movie/:id' element={<Movies/>}/>
      <Route path='/movierec/:id' element={<MovieRec/>}/>
      <Route path='actor/:id' element={<Actor/>}/>
      <Route path='*' element={<Error404/>}/>
    </Routes>
    </div>
  );
}

export default App;



