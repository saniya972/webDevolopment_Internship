import React from "react";

function App(){

  let username = "Saniya"

  function Greet(){
    alert(`Good Evening ${username}`)
  }

  return{

    <>
     <h1>My name is: {username}</h1>

     <button onClick={Greet}>Greet</button>


     </>

  }
}
export default App
