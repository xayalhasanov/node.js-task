import axios from "axios";
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [newCar, setNewCar] = useState({
    brandName: '',
    modelName: '',
    year: '',
    color: '',
    isBrandNew: false
  });


  function getData() {
    axios.get("http://localhost:3001/cars/")
      .then(res => setCars(res.data));
  }

  
  useEffect(() => {
    getData();
  }, []);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:3001/cars/${id}`);
    getData(); 
  }

  function handleDetail(car) {
    setSelectedCar(car);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedCar(null); 

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setNewCar(prevCar => ({
      ...prevCar,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("http://localhost:3001/cars/", newCar);
    getData(); 
    setIsFormOpen(false); 
    setNewCar({
      brandName: '',
      modelName: '',
      year: '',
      color: '',
      isBrandNew: false
    }); 
  }

  return (
    <>
      <button onClick={() => setIsFormOpen(true)}>Add New Car</button>

      {isFormOpen && (
        <div className="form-overlay">
          <div className="form-content">
            <h2>Add New Car</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Brand Name:</label>
                <input
                  type="text"
                  name="brandName"
                  value={newCar.brandName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Model Name:</label>
                <input
                  type="text"
                  name="modelName"
                  value={newCar.modelName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Year:</label>
                <input
                  type="number"
                  name="year"
                  value={newCar.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="text"
                  name="color"
                  value={newCar.color}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>New Car:</label>
                <input
                  type="checkbox"
                  name="isBrandNew"
                  checked={newCar.isBrandNew}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Add Car</button>
              <button type="button" onClick={() => setIsFormOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Year</th>
            <th>Model Name</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car._id}>
              <td>{car.brandName}</td>
              <td>{car.modelName}</td>
              <td style={{ backgroundColor: car.isBrandNew ? "green" : "red" }}>
                {car.year}
              </td>
              <td><button onClick={() => handleDelete(car._id)}>Delete</button></td>
              <td><button onClick={() => handleDetail(car)}>Detail</button></td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {isModalOpen && selectedCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Car Details</h2>
            <p><strong>Brand Name:</strong> {selectedCar.brandName}</p>
            <p><strong>Model Name:</strong> {selectedCar.modelName}</p>
            <p><strong>Year:</strong> {selectedCar.year}</p>
            <p><strong>Color:</strong> {selectedCar.color}</p>
            <p><strong>New:</strong> {selectedCar.isBrandNew ? "Yes" : "No"}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}}

export default App;
