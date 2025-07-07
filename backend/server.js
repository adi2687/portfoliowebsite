const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Path to the data directory (one level up from backend)
const DATA_DIR = path.join(__dirname, '..', 'public', 'data');

// Ensure data directory exists
fs.ensureDirSync(DATA_DIR);

// Get list of all JSON files
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(DATA_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        name: file,
        path: `/data/${file}`
      }));
    res.json(files);
  } catch (error) {
    console.error('Error reading files:', error);
    res.status(500).json({ error: 'Failed to read files' });
  }
});

// Get content of a specific JSON file
app.get('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(DATA_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const content = fs.readJsonSync(filePath);
    res.json(content);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

// Update a JSON file
app.put('/api/files/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const content = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }
    
    const filePath = path.join(DATA_DIR, filename);
    
    // Validate JSON
    JSON.stringify(content);
    
    // Write to file
    fs.writeJsonSync(filePath, content, { spaces: 2 });
    
    res.json({ message: 'File updated successfully' });
  } catch (error) {
    console.error('Error updating file:', error);
    if (error instanceof SyntaxError) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
    res.status(500).json({ error: 'Failed to update file' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Serving files from: ${DATA_DIR}`);
});
