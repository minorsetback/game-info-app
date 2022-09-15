import './App.css';
import Games from './components/Games';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Games />} />
          <Route path='/game/:slug' element={<Game /> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
