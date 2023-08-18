import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

const PersonCard = ({ person }) => (
  <div key={person.id} className="person">
    <img src={person.avatar} alt={`${person.first_name} ${person.last_name}`} />
    <h3 className="person-name">{person.first_name} {person.last_name}</h3>
    <p className="person-email">{person.email}</p>
  </div>
);

const LoadingIndicator = () => <h2 className="loading">Loading...</h2>;

const ErrorMessage = ({ error }) => <h2 className="error">Error: {error}</h2>;

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setData(response.data.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>User Data</h1>
      <button onClick={fetchData} disabled={isLoading}>
        Get Data
      </button>
      {isLoading ? <LoadingIndicator /> : null}
      {error ? <ErrorMessage error={error} /> : null}
      <div className="person-list">
        {data.map(person => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
