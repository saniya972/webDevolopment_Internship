/*import React from "react";

function App(){

  function handleClick(){
    alert(`Good evening to the React`)
  }


  return(
    <>
    <button onClick={handleClick}>Click Me</button>
    </>
  )
}
export default App  */

//Example - 2
/*import React from "react";

import {useState} from "react";

function App(){

  const[isFollow,setIsFollowed] = useState(false)

  return(
    <>
    <button onClick={()=> setIsFollowed(!isFollow)}>
      {isFollow ? "Following" : "Follow"}
    </button>
    </>
  )
}
export default App   */

//Example - 3

import React from "react";
import {useState} from "react";
function App(){

  const[text,setText]=useState("")
   return(
    <>
    <input 
    type="text"
    placeholder="search"
    onChange={(e)=> setText(e.target.value)}
    />
    <h3>you typed : {text} </h3>
    </>
   )
}
export default App