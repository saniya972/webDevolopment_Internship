//import React from "react";
/*//Example 1
function App(){

  let username = "Saniya"

  function Greet(){
    alert(`Good Evening ${username}`)
  }

  return(
    <>

     <h1> My name is: {username} </h1>

     <button onClick={Greet}>Greet</button>


     </>

  )
}
export default <App></App>*/


//Example 2- Variable vs React variable

/*function App(){
  let count=10
  function IncrementCount(){
    count = count+1
    console.log(count)
  }
  return(
    <>
    <h2>Like/Cart/Quantity: {count} </h2>
    <button onClick={IncrementCount}>Increase</button>
    </>
  )
  
}
export default App*/

//React Variable - Usestate - (React Hooks)

//It is a special react variable That stores updated value along with it also updates screen automatically

//Syntax := const[MainVariableName-screen, setVariableName - always store updated value] = useState(Intial value)

//           const[count,setCount] = useState(10)

//Example -3


/*import React ,{useState} from "react";
function App(){
 const[like,setLike]=useState(10)
  function IncrementLike(){
   setLike(like + 1)
    console.log(like)
  }
  return(
    <>
    <h2>Like/Cart/Quantity: {count} </h2>
    <button onClick={IncrementCount}>Increase</button>
    </>
  )
  
}
export default App()*/
   

//Example 4

import React ,{useState} from "react";
function App(){
const[show,setShow]=useState(false)
 
  return(
    <>
    <input type={show ? "text" : "password"}placeholder="enter your password"/>
    <button onClick={ ()=>   setShow(!show)}>show</button>
    </>
  )
  
}
export default App()