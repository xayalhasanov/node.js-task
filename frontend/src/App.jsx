import axios from "axios"
import './App.css'
import { useEffect, useState } from "react"

function App() {
let [cars,setCars]=useState([])
function getData(){
  axios.get("http://localhost:3001/cars/")
  .then(res=>setCars(res.data))
}
useEffect(()=>{
  getData()
},[])



async  function  handleDelete(id){
 await axios.delete(`http://localhost:3001/cars/${id}`)
  getData()
}
  return (
    <>
      <table>
  <tr>
    <th>Brand Name</th>
    <th>Year</th>
    <th>ModelName</th>
  </tr>
    {
      cars.map(car=>(
        <tr>
    <td>{car.brandName}</td>
    <td>{car.modelName}</td>
    <td style={{ backgroundColor: car.isBrandNew ? "green" : "red" }}>{car.year}
</td>
    <td><button onClick={()=>handleDelete(car._id)}>delete</button></td>
  </tr>
 
      ))
    }
</table>
    </>
  )
}

export default App
