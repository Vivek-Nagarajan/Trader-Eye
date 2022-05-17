
import './App.css';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Home from './pages/Home';
import SeparateCoin from './pages/SeparateCoin';
import {makeStyles} from '@material-ui/core';

function App() {

  const useStyles= makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      minHeight:"100vh",
      color:"white"
    }
  }));

  const classes=useStyles();

  return (
     <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/coins/:id' element={<SeparateCoin />} />
        </Routes>
      </div>
     </BrowserRouter>
  )
}

export default App;
