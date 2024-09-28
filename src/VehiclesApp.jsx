import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehiclesApp = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/vehicles/');
        setVehicles(response.data.results);
        setFilteredVehicles(response.data.results);
        setError('');
      } catch (err) {
        setError('Error fetching data');
        setVehicles([]);
        setFilteredVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    const filterVehicles = () => {
      if (searchQuery === '') {
        setFilteredVehicles(vehicles);
      } else {
        const filtered = vehicles.filter(vehicle =>
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVehicles(filtered);
      }
    };

    filterVehicles();
  }, [searchQuery, vehicles]);
  

  return (
    <div className="bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">Star Wars Vehicles</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-blue-300 rounded-lg p-2 w-full"
          placeholder="Search by vehicle name"
        />
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-300 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Model</th>
                <th className="px-6 py-3 text-left">Manufacturer</th>
                <th className="px-6 py-3 text-left">Cost in Credits</th>
                <th className="px-6 py-3 text-left">Length</th>
                <th className="px-6 py-3 text-left">Max Speed</th>
                <th className="px-6 py-3 text-left">Crew</th>
                <th className="px-6 py-3 text-left">Passengers</th>
                <th className="px-6 py-3 text-left">Cargo Capacity</th>
                <th className="px-6 py-3 text-left">Consumables</th>
                <th className="px-6 py-3 text-left">Vehicle Class</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.name} className="border-t border-blue-300">
                  <td className="px-6 py-3">{vehicle.name}</td>
                  <td className="px-6 py-3">{vehicle.model}</td>
                  <td className="px-6 py-3">{vehicle.manufacturer}</td>
                  <td className="px-6 py-3">{vehicle.cost_in_credits}</td>
                  <td className="px-6 py-3">{vehicle.length}</td>
                  <td className="px-6 py-3">{vehicle.max_atmosphering_speed}</td>
                  <td className="px-6 py-3">{vehicle.crew}</td>
                  <td className="px-6 py-3">{vehicle.passengers}</td>
                  <td className="px-6 py-3">{vehicle.cargo_capacity}</td>
                  <td className="px-6 py-3">{vehicle.consumables}</td>
                  <td className="px-6 py-3">{vehicle.vehicle_class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehiclesApp;
