import React from "react";
import Home from "./homePage";
import About from "./aboutPage";

//React-Router
import {BrowserRouter , Routes , Route , Link} from 'react-router-dom'

function App(){

  return(
    <BrowserRouter>

    <nav>
      <Link to="/" style={{marginRight:'15px'}}>Home</Link>
      <Link to="/about">About</Link>
    </nav>

    <Routes>
      {/*path Adress of different pages */}
      <Route path="/"   element= {<Home/>}/>
      <Route path="/about"   element={<About/>}/>
    </Routes>
    </BrowserRouter>

  )
}
export default App