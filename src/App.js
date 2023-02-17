import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
