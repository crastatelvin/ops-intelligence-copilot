<div align="center">
📊 Ops Intelligence Copilot
An AI-Powered Operational Data Analysis & Natural Language Q&A Platform
Show Image
Show Image
Show Image
Show Image
Show Image
Show Image
<br/>

Ops Intelligence Copilot is a full-stack AI web application that transforms raw operational data into instant, actionable intelligence. Upload any CSV or Excel file and get auto-generated KPI summaries, Z-score anomaly detection, dynamic trend charts, and a natural language chat interface powered by Google Gemini Flash — all in one clean, no-setup dashboard.

<br/>
Show Image Show Image Show Image
</div>

📋 Table of Contents

Overview
Features
Architecture
Tech Stack
Project Structure
Installation
Usage
AI Chat Interface
Data Profiling Engine
Sample Data
Configuration
Contributing


🧠 Overview
Ops Intelligence Copilot is a lightweight but powerful business intelligence tool built for operations teams, analysts, and managers who need fast answers from their data — without writing a single line of SQL or Python.
Users can:

Upload any CSV or Excel operational dataset via drag-and-drop or file picker
Instantly receive a KPI summary strip (row count, column count, column averages)
View auto-detected anomalies flagged via Z-score analysis (±2 standard deviations)
Explore a dynamic trend chart rendered from the primary numeric column
Ask plain-English questions about their data and receive AI-powered answers via Google Gemini Flash
Reset and re-upload a new file anytime from the dashboard

The backend is built with FastAPI, holds the uploaded dataframe in memory for the session, and passes data context (column names, statistical summary, and a 5-row sample) to Gemini for accurate, grounded responses.

✨ Features
FeatureDescription📁 Drag-and-Drop UploadUpload CSV or Excel files (.csv, .xlsx, .xls) via drag-and-drop or file browser📊 KPI StripAuto-generated cards showing row count, column count, and column averages on upload📋 Data Insights PanelColumn type breakdown, missing value report, and shape summary⚠️ Anomaly DetectionZ-score based outlier detection across all numeric columns with percentage reporting📈 Trend ChartRecharts line chart auto-rendered from the first numeric column (first 20 rows)💬 AI Chat Q&ANatural language question answering powered by Google Gemini Flash with Markdown rendering🔄 Session ResetUpload a new file anytime; previous data is cleared and replaced🌐 REST APIClean FastAPI backend with /upload, /query, and /status endpoints

🏗️ Architecture
┌──────────────────────────────────────────────────────┐
│                  Browser / React App                 │
│                                                      │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ UploadPage │  │DashboardPage │  │ChatInterface │  │
│  │  (drop +   │  │  KPIStrip    │  │  (Gemini AI  │  │
│  │   browse)  │  │  InsightCard │  │   Q&A chat)  │  │
│  └─────┬──────┘  │  ChartViewer │  └──────┬───────┘  │
│        │         └──────┬───────┘         │          │
└────────┼────────────────┼─────────────────┼──────────┘
         │  POST /upload  │                 │ POST /query
┌────────▼────────────────▼─────────────────▼──────────┐
│              FastAPI Backend (main.py)               │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │            data_service.py                      │ │
│  │   profile_data() → KPIs · Insights · Anomalies  │ │
│  │   Z-score detection · Chart data · Shape info   │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │            gemini_service.py                    │ │
│  │   ask_gemini() → Google Gemini Flash API        │ │
│  │   Context: columns + sample + stats summary     │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  ┌──────────────────┐                                │
│  │  df_store (dict) │  ← In-memory DataFrame store   │
│  │  "current" → df  │                                │
│  └──────────────────┘                                │
└──────────────────────────────────────────────────────┘

🛠️ Tech Stack
LayerTechnologyFrontendReact 18, Recharts, react-markdown, AxiosBackendFastAPI, Uvicorn, Python 3.11+Data ProcessingPandas, NumPy, OpenPyXLAI / LLMGoogle Gemini Flash (gemini-flash-latest) via google-genai SDKStylingInline React styles (no external CSS framework)File SupportCSV, XLSX, XLS

📁 Project Structure
ops-intelligence-copilot/
│
├── backend/
│   ├── main.py               # FastAPI app — /upload, /query, /status routes
│   ├── data_service.py       # Data profiling: KPIs, anomalies, insights, chart data
│   ├── gemini_service.py     # Google Gemini Flash integration — ask_gemini()
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # GEMINI_API_KEY environment variable
│
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML entry point
│   ├── src/
│   │   ├── App.jsx           # Root component — toggles UploadPage ↔ DashboardPage
│   │   ├── index.js          # React DOM entry
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx    # Drag-and-drop upload UI with loading state
│   │   │   └── DashboardPage.jsx # Main dashboard layout: KPI + Chart + Chat
│   │   ├── components/
│   │   │   ├── KPIStrip.jsx      # KPI summary cards (rows, cols, averages)
│   │   │   ├── InsightCard.jsx   # Data insights list + anomaly warnings
│   │   │   ├── ChartViewer.jsx   # Recharts line chart for primary numeric column
│   │   │   └── ChatInterface.jsx # Gemini-powered chat UI with Markdown rendering
│   │   └── services/
│   │       └── api.js            # Axios wrappers: uploadFile, queryData, getStatus
│   └── package.json
│
└── sample_data/
    └── ops_sample.csv        # 12-row sample ops dataset (revenue, churn, tickets, etc.)

🚀 Installation
Prerequisites

Python 3.11+
Node.js 18+
A Google Gemini API key

1. Clone the Repository
bashgit clone https://github.com/crastatelvin/ops-intelligence-copilot.git
cd ops-intelligence-copilot
2. Backend Setup
bashcd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

pip install -r requirements.txt
3. Configure Environment Variables
bash# Create a .env file in the backend/ directory
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
4. Start the Backend
bashuvicorn main:app --reload
API will be running at http://localhost:8000
5. Frontend Setup
bashcd ../frontend
npm install
npm start
Frontend will be running at http://localhost:3000

💻 Usage
Uploading Data

Open the app at http://localhost:3000
Drag and drop a CSV or Excel file onto the upload zone, or click Browse File
The backend instantly profiles your data and returns KPIs, insights, anomalies, and chart data
You are automatically redirected to the Dashboard

Reading the Dashboard

KPI Strip — top cards show total rows, columns, and averages for the first two numeric columns
Data Insights Panel — lists column types, missing value status, and data shape
Anomaly Warnings — red-highlighted cards for any column with Z-score outliers, including outlier count and percentage
Trend Chart — line chart of the primary numeric column across the first 20 rows

Uploading a New File
Click Upload New File in the top-right corner of the dashboard to reset and start fresh.

💬 AI Chat Interface
The built-in chat panel lets you ask plain-English questions about your uploaded data, powered by Google Gemini Flash.
Example questions you can ask:

"What is the average revenue per month?"
"Which column has the most anomalies?"
"Is there a trend between churn rate and ticket volume?"
"Which month had the highest resolution time?"
"Summarize the overall performance of this dataset"

Gemini receives your dataset's column names, statistical summary, and a 5-row sample as context — so all answers are grounded in your actual data.
python# gemini_service.py — core prompt construction
def ask_gemini(question: str, summary: str, columns: list, sample: str) -> str:
    prompt = f"""
You are an intelligent data analyst assistant for an Ops Intelligence Copilot tool.

COLUMNS: {columns}
DATA SAMPLE (first 5 rows): {sample}
STATISTICAL SUMMARY: {summary}
USER QUESTION: {question}

Answer clearly in plain English. Use professional Markdown formatting.
Keep response under 200 words.
    """
    response = client.models.generate_content(model="gemini-flash-latest", contents=prompt)
    return response.text
Chat endpoint: POST /query — accepts { "question": "your question here" }

🔬 Data Profiling Engine
The data_service.py module runs on every file upload and returns a structured insights payload.
What it computes:
OutputDescriptioninsightsHuman-readable list: shape, column types, missing valueskpisPer-column stats: mean, max, min, sum, mediananomaliesZ-score outliers (±2 std dev): count and percentage per columnchart_dataFirst 20 non-null values of the primary numeric columnprimary_chart_colName of the first numeric column (used as chart title)shape{ rows, cols } — raw dataset dimensionscolumnsFull column name list

📂 Sample Data
A sample operational dataset is included at sample_data/ops_sample.csv to test the app immediately:
ColumnDescriptionmonthMonth label (Jan–Dec)revenueMonthly revenue in USDcustomersActive customer counttickets_raisedSupport tickets openedtickets_resolvedSupport tickets closedchurn_rateMonthly churn percentageavg_resolution_timeAverage days to resolve a ticket

⚙️ Configuration
python# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
javascript// frontend/src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
To point the frontend at a deployed backend, set REACT_APP_API_URL in a .env file inside frontend/.

🔒 Security Notes

This project is built for local and internal use. Before any public deployment:


The backend uses allow_origins=["*"] — restrict this to your frontend domain in production
The in-memory df_store is a single global dict — not safe for multi-user concurrent sessions; use Redis or a session ID keyed store instead
Never commit your .env file or expose your GEMINI_API_KEY publicly
Add file size and type validation before deploying to production


🤝 Contributing

Fork the repository
Create a feature branch: git checkout -b feature/your-feature
Commit your changes: git commit -m 'Add your feature'
Push: git push origin feature/your-feature
Open a Pull Request

Ideas for improvement: persistent file storage (S3/disk), multi-file session support, chart type selector (bar/pie/scatter), export insights as PDF, multi-turn conversation history for the chat, user authentication, streaming Gemini responses.

📜 License
Licensed under the MIT License — see LICENSE for details.

<div align="center">
Made with ❤️ by Crasta Telvin
⭐ Star this repo if you find it useful!
</div>
