import { useState } from 'react';
import axios from 'axios';

export default function TextExtractor() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/extract-text',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setText(response.data.text);
    } catch (err) {
      setError(err.response?.data?.error || 'Extraction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Image Text Extractor</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={isLoading}
        />
        <button type="submit" disabled={!image || isLoading}>
          {isLoading ? 'Processing...' : 'Extract Text'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {text && (
        <div className="result">
          <h2>Extracted Text:</h2>
          <textarea 
            value={text} 
            readOnly 
            rows="10"
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
}