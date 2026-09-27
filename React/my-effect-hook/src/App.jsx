import React from "react";
import {useState , useEffect} from "react";
import './App.css';


function App(){

  const[users,setUsers] = useState([]) 
  //https://jsonplaceholder.typicode.com/users

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")

    .then(response => response.json())
    .then(data => setUsers(data))

    .catch(error => console.log("Error in fetching",error))
  },[])
  return(
    
    <div className = "App">
    <h2 className="title">Employee Dashboard</h2>
    {/*API data is storing in my user array which i have created .Extract the data from user array and put it on html tag */}
    {/*map every element in an array and return a brand new array containing modified results of task */}


    {users.map( abc=>(
      <div key = {abc.id}>
        <h3>{abc.name}</h3>
        <p>{abc.email}</p>
      </div>

    ))}
    </div>
  )

}
export default App