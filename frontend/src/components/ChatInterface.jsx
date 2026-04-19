import { useState } from 'react';
import { queryData } from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I can answer questions about your uploaded data. Try asking: "What is the average value?" or "Which column has the most anomalies?"' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setLoading(true);

    try {
      const data = await queryData(question);
      setMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <h3 style={{ fontWeight: '700', color: '#1a202c', marginBottom: '1rem' }}>💬 Ask About Your Data</h3>

      {/* Messages */}
      <div style={{ height: '260px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#4299e1' : '#f7fafc',
            color: msg.role === 'user' ? 'white' : '#2d3748',
            padding: '0.7rem 1rem',
            borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
            maxWidth: '80%',
            fontSize: '0.9rem',
            lineHeight: '1.5'
          }}>
            {msg.role === 'user' ? msg.text : <ReactMarkdown components={{
              p: ({node, ...props}) => <p style={{margin: '0 0 0.5em 0'}} {...props}/>,
              ul: ({node, ...props}) => <ul style={{margin: '0 0 0.5em 0', paddingLeft: '1.2em'}} {...props}/>,
              li: ({node, ...props}) => <li style={{margin: '0 0 0.2em 0'}} {...props}/>
            }}>{msg.text}</ReactMarkdown>}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', background: '#f7fafc', padding: '0.7rem 1rem', borderRadius: '12px 12px 12px 0', color: '#718096', fontSize: '0.9rem' }}>
            Thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask anything about your data..."
          style={{
            flex: 1, padding: '0.7rem 1rem', borderRadius: '8px',
            border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: '#4299e1', color: 'white', border: 'none',
            padding: '0.7rem 1.2rem', borderRadius: '8px', cursor: 'pointer',
            fontWeight: '600', opacity: loading ? 0.7 : 1
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
