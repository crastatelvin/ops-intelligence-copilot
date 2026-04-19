export default function InsightCard({ insights, anomalies }) {
  const hasAnomalies = Object.keys(anomalies).length > 0;

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: '100%' }}>
      <h3 style={{ fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>📋 Data Insights</h3>
      {insights.map((insight, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
          <span style={{ color: '#4299e1' }}>•</span>
          <span style={{ color: '#4a5568', fontSize: '0.9rem' }}>{insight}</span>
        </div>
      ))}

      {hasAnomalies && (
        <>
          <h3 style={{ fontWeight: '700', color: '#e53e3e', marginTop: '1.2rem', marginBottom: '0.8rem' }}>⚠️ Anomalies Detected</h3>
          {Object.entries(anomalies).map(([col, info]) => (
            <div key={col} style={{ background: '#fff5f5', borderRadius: '8px', padding: '0.6rem 0.8rem', marginBottom: '0.5rem', borderLeft: '3px solid #e53e3e' }}>
              <span style={{ fontWeight: '600', color: '#c53030' }}>{col}</span>
              <span style={{ color: '#718096', fontSize: '0.85rem' }}> — {info.count} outliers ({info.percentage}% of data)</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
