import { useState } from 'react';
import KPIStrip from '../components/KPIStrip';
import InsightCard from '../components/InsightCard';
import ChartViewer from '../components/ChartViewer';
import ChatInterface from '../components/ChatInterface';

export default function DashboardPage({ data, onReset }) {
  const { insights } = data;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>📊 Ops Intelligence Copilot</h1>
          <p style={{ color: '#718096', fontSize: '0.9rem' }}>File: {data.filename}</p>
        </div>
        <button
          onClick={onReset}
          style={{ background: '#e2e8f0', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Upload New File
        </button>
      </div>

      {/* KPI Strip */}
      <KPIStrip kpis={insights.kpis} shape={insights.shape} />

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {/* Left: Insights + Anomalies */}
        <div>
          <InsightCard insights={insights.insights} anomalies={insights.anomalies} />
        </div>
        {/* Right: Chart */}
        <div>
          <ChartViewer
            chartData={insights.chart_data}
            columnName={insights.primary_chart_col}
          />
        </div>
      </div>

      {/* Chat */}
      <div style={{ marginTop: '1.5rem' }}>
        <ChatInterface />
      </div>
    </div>
  );
}
