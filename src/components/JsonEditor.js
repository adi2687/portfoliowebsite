import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiLogOut, FiRefreshCw, FiAlertCircle, FiCheckCircle, FiFile, FiLock } from 'react-icons/fi';
import './JsonEditor.css';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Password configuration
const PASSWORD = process.env.REACT_APP_PASSWORD;
console.log('pass is ',PASSWORD);
const PASSWORD_KEY = 'portfolio_editor_auth';

const JsonEditor = () => {
  const { file } = useParams();
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeFile, setActiveFile] = useState(file || 'projects.json');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated in this session
    return sessionStorage.getItem(PASSWORD_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // State for available JSON files
  const [jsonFiles, setJsonFiles] = useState([]);

  // Fetch list of available JSON files
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_BASE_URL}/files`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch files');
          return res.json();
        })
        .then(files => {
          setJsonFiles(files);
          // If no file is selected, select the first one
          if (files.length > 0) {
            const defaultFile = file || files[0].name;
            setActiveFile(defaultFile);
          }
        })
        .catch(err => {
          console.error('Error fetching files:', err);
          setError(`Failed to load files: ${err.message}`);
        });
    }
  }, [isAuthenticated, file]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(PASSWORD_KEY, 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(PASSWORD_KEY);
    setPassword('');
    navigate('/edit');
  };

  // Load JSON data when file changes
  useEffect(() => {
    if (isAuthenticated && activeFile) {
      fetch(`${API_BASE_URL}/files/${activeFile}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to load file');
          return response.json();
        })
        .then(data => {
          setJsonData(JSON.stringify(data, null, 2));
          setIsValid(true);
          setSaved(true);
          setError('');
        })
        .catch(error => {
          console.error('Error loading JSON:', error);
          setJsonData('');
          setIsValid(false);
          setError(`Error loading file: ${error.message}`);
        });
    }
  }, [activeFile, isAuthenticated]);

  // Format JSON
  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      setJsonData(JSON.stringify(parsed, null, 2));
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    }
  };

  // Save to backend API
  const handleSave = () => {
    try {
      const data = JSON.parse(jsonData); // Validate JSON
      
      fetch(`${API_BASE_URL}/files/${activeFile}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to save file');
        return response.json();
      })
      .then(() => {
        setSaved(true);
        setIsValid(true);
        setError('');
        setTimeout(() => setSaved(false), 2000);
      })
      .catch(error => {
        console.error('Error saving file:', error);
        setError(`Error saving file: ${error.message}`);
        setIsValid(false);
      });
    } catch (error) {
      setIsValid(false);
      setError(`Invalid JSON: ${error.message}`);
      console.error('Invalid JSON:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="json-editor-container">
        <div className="login-container">
          <div className="login-header">
            <FiLock size={32} className="login-icon" />
            <h2>Admin Login</h2>
            <p>Please enter your password to access the editor</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="status-message status-error">
                <FiAlertCircle /> {error}
              </div>
            )}
            <button type="submit" className="button button-primary" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (jsonFiles.length === 0 && isAuthenticated) {
    return (
      <div className="json-editor-container">
        <div className="editor-header">
          <h1>JSON Editor</h1>
          <button onClick={handleLogout} className="button button-secondary">
            <FiLogOut /> Logout
          </button>
        </div>
        <div className="status-message status-error">
          <FiAlertCircle /> No files available. Please make sure the backend server is running and the data directory exists.
        </div>
      </div>
    );
  }

  const fileSelector = (
    <div className="file-selector">
      <label htmlFor="json-file">File to edit:</label>
      <div className="select-wrapper">
        <select 
          id="json-file" 
          value={activeFile || ''}
          onChange={(e) => setActiveFile(e.target.value)}
          disabled={!isAuthenticated || jsonFiles.length === 0}
          className="file-select"
        >
          <option value="">-- Select a file --</option>
          {jsonFiles.map((file) => (
            <option key={file.name} value={file.name}>
              <FiFile /> {file.name}
            </option>
          ))}
        </select>
        <div className="select-arrow">▼</div>
      </div>
      {jsonFiles.length === 0 && isAuthenticated && (
        <div className="loading">
          <FiRefreshCw className="spin" /> Loading files...
        </div>
      )}
    </div>
  );

  return (
    <div className="json-editor-container">
      <div className="editor-header">
        <h1>JSON Editor</h1>
        <button onClick={handleLogout} className="button button-secondary">
          <FiLogOut /> Logout
        </button>
      </div>
      
      {fileSelector}
      
      <div className="editor-area">
        <textarea
          className={`json-input ${!isValid ? 'invalid' : ''}`}
          value={jsonData}
          onChange={(e) => {
            setJsonData(e.target.value);
            setSaved(false);
            try {
              JSON.parse(e.target.value);
              setIsValid(true);
              setError('');
            } catch (e) {
              setIsValid(false);
            }
          }}
          placeholder="Enter your JSON data here..."
          spellCheck="false"
          disabled={!activeFile}
        />
      </div>
      
      <div className="action-buttons">
        <div className="status-messages">
          {!isValid && (
            <div className="status-message status-error">
              <FiAlertCircle /> Invalid JSON
            </div>
          )}
          {saved && (
            <div className="status-message status-success">
              <FiCheckCircle /> Changes saved successfully!
            </div>
          )}
          {error && (
            <div className="status-message status-error">
              <FiAlertCircle /> {error}
            </div>
          )}
        </div>
        <div className="button-group">
          <button 
            onClick={formatJson} 
            className="button button-secondary"
            disabled={!jsonData}
          >
            <FiRefreshCw /> Format
          </button>
          <button 
            onClick={handleSave} 
            className="button button-primary"
            disabled={!isValid || !jsonData || !activeFile}
          >
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
