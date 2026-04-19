import { useState, useEffect } from 'react';
import { uploadFile } from '../services/api';

export default function UploadPage({ onUploadSuccess }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Prevent browser from opening files in a new tab if dropped outside the dropzone
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    window.addEventListener('dragover', preventDefault);
    window.addEventListener('drop', preventDefault);
    return () => {
      window.removeEventListener('dragover', preventDefault);
      window.removeEventListener('drop', preventDefault);
    };
  }, []);

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const data = await uploadFile(file);
      onUploadSuccess(data);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem' }}>
        📊 Ops Intelligence Copilot
      </h1>
      <p style={{ color: '#718096', marginBottom: '2rem' }}>
        Upload your CSV or Excel file and ask questions in plain English
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? '#4299e1' : '#cbd5e0'}`,
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          background: dragging ? '#ebf8ff' : 'white',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '480px',
          transition: 'all 0.2s'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          Drag and drop your CSV or Excel file here
        </p>
        <label style={{
          background: '#4299e1', color: 'white', padding: '0.6rem 1.5rem',
          borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>
          {loading ? 'Uploading...' : 'Browse File'}
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </label>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>

      <p style={{ marginTop: '1rem', color: '#a0aec0', fontSize: '0.85rem' }}>
        Supports .csv, .xlsx, .xls files
      </p>
    </div>
  );
}
