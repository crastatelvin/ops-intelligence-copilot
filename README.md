# 📊 Ops Intelligence Copilot

> Upload your operational data. Ask anything. Get instant AI-powered insights.

## Features
- Upload CSV or Excel files
- Auto-generated KPI summary on upload
- Anomaly detection using Z-score analysis
- Natural language Q&A powered by Gemini AI
- Dynamic trend charts

## Tech Stack
React • FastAPI • Google Gemini Flash 1.5 • Pandas • Recharts

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+

### Backend
1. `cd backend`
2. `python -m venv venv`
3. Activate venv: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and add your Gemini API Key.
6. `uvicorn main:app --reload`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`
