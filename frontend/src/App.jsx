import { useState } from 'react';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [uploadData, setUploadData] = useState(null);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f0f4f8' }}>
      {!uploadData ? (
        <UploadPage onUploadSuccess={setUploadData} />
      ) : (
        <DashboardPage data={uploadData} onReset={() => setUploadData(null)} />
      )}
    </div>
  );
}
