import React, { useState, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const PdfUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await axiosInstance.post('/api/convert/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });

      setExtractedText(response.data.text);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to extract text from PDF');
      console.error('Error:', err);
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setError('Please drop a PDF file');
    }
  };

  return (
    <div className="pdf-uploader">
      <h2>PDF to Text Converter</h2>
      
      <div 
        className={`drop-zone ${file ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          id="pdf-upload"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {file ? (
          <div className="file-info">
            <p>{file.name}</p>
            <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <p>Drag & drop a PDF file here, or click to select</p>
        )}
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {isUploading && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <span>{progress}%</span>
        </div>
      )}
      
      <button 
        type="button" 
        onClick={handleSubmit}
        disabled={!file || isUploading}
        className="submit-btn"
      >
        {isUploading ? 'Processing...' : 'Extract Text'}
      </button>

      {extractedText && (
        <div className="results">
          <div className="results-header">
            <h3>Extracted Text</h3>
            <button 
              onClick={() => navigator.clipboard.writeText(extractedText)}
              className="copy-btn"
            >
              Copy to Clipboard
            </button>
          </div>
          <div className="text-container">
            <textarea 
              readOnly 
              value={extractedText}
              placeholder="Extracted text will appear here..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;