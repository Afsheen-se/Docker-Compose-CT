import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!num1 || !num2) {
      setError('Please enter both numbers');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/calculate`, {
        operation,
        num1: parseFloat(num1),
        num2: parseFloat(num2)
      });
      
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setResult('');
    setError('');
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1>Calculator App</h1>
        
        <div className="input-group">
          <input
            type="number"
            placeholder="First number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="number-input"
          />
          
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="operation-select"
          >
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>
          
          <input
            type="number"
            placeholder="Second number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="number-input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleCalculate} disabled={loading} className="calculate-btn">
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
          <button onClick={handleClear} className="clear-btn">
            Clear
          </button>
        </div>

        {result !== '' && (
          <div className="result">
            <h3>Result: {result}</h3>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
