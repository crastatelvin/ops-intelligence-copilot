export default function KPIStrip({ kpis, shape }) {
  const kpiEntries = Object.entries(kpis).slice(0, 4);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      {/* Rows & Cols */}
      <div style={cardStyle('#4299e1')}>
        <div style={labelStyle}>Total Rows</div>
        <div style={valueStyle}>{shape.rows.toLocaleString()}</div>
      </div>
      <div style={cardStyle('#48bb78')}>
        <div style={labelStyle}>Total Columns</div>
        <div style={valueStyle}>{shape.cols}</div>
      </div>
      {/* First 2 KPIs */}
      {kpiEntries.slice(0, 2).map(([col, vals]) => (
        <div key={col} style={cardStyle('#ed8936')}>
          <div style={labelStyle}>{col} (avg)</div>
          <div style={valueStyle}>{vals.mean.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

const cardStyle = (color) => ({
  background: 'white', borderRadius: '10px', padding: '1.2rem',
  borderLeft: `4px solid ${color}`, boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
});
const labelStyle = { fontSize: '0.8rem', color: '#718096', marginBottom: '0.3rem', fontWeight: '600', textTransform: 'uppercase' };
const valueStyle = { fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' };
