const express = require('express');
const app = express();
const port = 5000;

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
