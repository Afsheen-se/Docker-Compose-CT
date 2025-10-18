const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Calculator API endpoints
app.post('/api/calculate', (req, res) => {
  try {
    const { operation, num1, num2 } = req.body;
    
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid numbers provided' });
    }

    let result;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          return res.status(400).json({ error: 'Division by zero is not allowed' });
        }
        result = num1 / num2;
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Calculator API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Calculator API server running on port ${PORT}`);
});
