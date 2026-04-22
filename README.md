<div align="center">

# 📊 Ops Intelligence Copilot

### An AI-Powered Operational Data Analysis & Natural Language Q&A Platform

[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-22b5bf?style=for-the-badge)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **Ops Intelligence Copilot** is a full-stack AI web application that transforms raw operational data into instant, actionable intelligence. Upload any CSV or Excel file and get auto-generated KPI summaries, Z-score anomaly detection, dynamic trend charts, and a **natural language chat interface powered by Google Gemini Flash** — all in one clean, no-setup dashboard.

<br/>

![Upload CSV or Excel](https://img.shields.io/badge/Upload-CSV%20%7C%20Excel-blue?style=for-the-badge) ![AI Q&A](https://img.shields.io/badge/Gemini_AI-Natural_Language_Q%26A-orange?style=for-the-badge) ![Anomaly Detection](https://img.shields.io/badge/Z--Score-Anomaly%20Detection-red?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [AI Chat Interface](#-ai-chat-interface)
- [Data Profiling Engine](#-data-profiling-engine)
- [Sample Data](#-sample-data)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

---

## 🧠 Overview

Ops Intelligence Copilot is a lightweight but powerful business intelligence tool built for operations teams, analysts, and managers who need fast answers from their data — without writing a single line of SQL or Python.

Users can:

- Upload any **CSV or Excel** operational dataset via drag-and-drop or file picker
- Instantly receive a **KPI summary strip** (row count, column count, column averages)
- View **auto-detected anomalies** flagged via Z-score analysis (±2 standard deviations)
- Explore a **dynamic trend chart** rendered from the primary numeric column
- Ask **plain-English questions** about their data and receive AI-powered answers via Google Gemini Flash
- Reset and re-upload a new file anytime from the dashboard

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

The backend is built with **FastAPI**, holds the uploaded dataframe in memory for the session, and passes data context (column names, statistical summary, and a 5-row sample) to Gemini for accurate, grounded responses.

---

## 💻 Application Preview
<br/>
<br/>
<img width="1365" height="643" alt="{82DD1B1B-6CB3-492D-9A39-081EFE80EBE9}" src="https://github.com/user-attachments/assets/1a606b34-06b4-483f-b568-9190da410f67" />
<br/>
<br/>
<img width="1366" height="640" alt="{35E76ADA-0EA2-4D95-8B34-658FE56A2945}" src="https://github.com/user-attachments/assets/2237e21e-532f-4c22-add4-887f74867906" />
<br/>
<br/>
<img width="1366" height="642" alt="{576061B8-32EF-4D9E-8E34-FB7D7137E7AA}" src="https://github.com/user-attachments/assets/b6ed4243-e554-4b72-b62d-1d779d78f5d9" />
<br/>
<br/>
<img width="1366" height="639" alt="{21EFAE31-4DAE-490F-86FD-AE6DC1A60BC4}" src="https://github.com/user-attachments/assets/b2a68731-7052-45bf-acbb-aba4c757bb1c" />
<br/>
<br/>
<img width="1366" height="636" alt="{36D5E71C-D97B-4C8D-AE96-E63EB77B8FC4}" src="https://github.com/user-attachments/assets/d914c724-becb-4bbc-9906-f1aa541afcdd" />
<br/>
<br/>
<img width="1361" height="639" alt="{83F067E6-244D-4728-A7E3-3DB3B9C1F2BC}" src="https://github.com/user-attachments/assets/5fc26acc-ee0a-432c-a17e-067dafa1ba05" />
<br/>
<br/>

## ✨ Features

| Feature | Description |
|---|---|
| 📁 **Drag-and-Drop Upload** | Upload CSV or Excel files (.csv, .xlsx, .xls) via drag-and-drop or file browser |
| 📊 **KPI Strip** | Auto-generated cards showing row count, column count, and column averages on upload |
| 📋 **Data Insights Panel** | Column type breakdown, missing value report, and shape summary |
| ⚠️ **Anomaly Detection** | Z-score based outlier detection across all numeric columns with percentage reporting |
| 📈 **Trend Chart** | Recharts line chart auto-rendered from the first numeric column (first 20 rows) |
| 💬 **AI Chat Q&A** | Natural language question answering powered by Google Gemini Flash with Markdown rendering |
| 🔄 **Session Reset** | Upload a new file anytime; previous data is cleared and replaced |
| 🌐 **REST API** | Clean FastAPI backend with `/upload`, `/query`, and `/status` endpoints |

---

## 🏗️ Architecture

```
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
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Recharts, react-markdown, Axios |
| **Backend** | FastAPI, Uvicorn, Python 3.11+ |
| **Data Processing** | Pandas, NumPy, OpenPyXL |
| **AI / LLM** | Google Gemini Flash (`gemini-flash-latest`) via `google-genai` SDK |
| **Styling** | Inline React styles (no external CSS framework) |
| **File Support** | CSV, XLSX, XLS |

---

## 📁 Project Structure

```
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
```

---

## 🚀 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- A [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the Repository
```bash
git clone https://github.com/crastatelvin/ops-intelligence-copilot.git
cd ops-intelligence-copilot
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

pip install -r requirements.txt
```

### 3. Configure Environment Variables
```bash
# Create a .env file in the backend/ directory
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

### 4. Start the Backend
```bash
uvicorn main:app --reload
```
API will be running at `http://localhost:8000`

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Frontend will be running at `http://localhost:3000`

---

## 💻 Usage

### Uploading Data
1. Open the app at `http://localhost:3000`
2. Drag and drop a **CSV or Excel file** onto the upload zone, or click **Browse File**
3. The backend instantly profiles your data and returns KPIs, insights, anomalies, and chart data
4. You are automatically redirected to the **Dashboard**

### Reading the Dashboard
- **KPI Strip** — top cards show total rows, columns, and averages for the first two numeric columns
- **Data Insights Panel** — lists column types, missing value status, and data shape
- **Anomaly Warnings** — red-highlighted cards for any column with Z-score outliers, including outlier count and percentage
- **Trend Chart** — line chart of the primary numeric column across the first 20 rows

### Uploading a New File
Click **Upload New File** in the top-right corner of the dashboard to reset and start fresh.

---

## 💬 AI Chat Interface

The built-in chat panel lets you ask plain-English questions about your uploaded data, powered by **Google Gemini Flash**.

**Example questions you can ask:**
- *"What is the average revenue per month?"*
- *"Which column has the most anomalies?"*
- *"Is there a trend between churn rate and ticket volume?"*
- *"Which month had the highest resolution time?"*
- *"Summarize the overall performance of this dataset"*

Gemini receives your dataset's column names, statistical summary, and a 5-row sample as context — so all answers are grounded in your actual data.

```python
# gemini_service.py — core prompt construction
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
```

**Chat endpoint:** `POST /query` — accepts `{ "question": "your question here" }`

---

## 🔬 Data Profiling Engine

The `data_service.py` module runs on every file upload and returns a structured insights payload.

**What it computes:**

| Output | Description |
|---|---|
| `insights` | Human-readable list: shape, column types, missing values |
| `kpis` | Per-column stats: mean, max, min, sum, median |
| `anomalies` | Z-score outliers (±2 std dev): count and percentage per column |
| `chart_data` | First 20 non-null values of the primary numeric column |
| `primary_chart_col` | Name of the first numeric column (used as chart title) |
| `shape` | `{ rows, cols }` — raw dataset dimensions |
| `columns` | Full column name list |

---

## 📂 Sample Data

A sample operational dataset is included at `sample_data/ops_sample.csv` to test the app immediately:

| Column | Description |
|---|---|
| `month` | Month label (Jan–Dec) |
| `revenue` | Monthly revenue in USD |
| `customers` | Active customer count |
| `tickets_raised` | Support tickets opened |
| `tickets_resolved` | Support tickets closed |
| `churn_rate` | Monthly churn percentage |
| `avg_resolution_time` | Average days to resolve a ticket |

---

## ⚙️ Configuration

```python
# backend/.env
GEMINI_API_KEY=your_gemini_api_key_here
```

```javascript
// frontend/src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

To point the frontend at a deployed backend, set `REACT_APP_API_URL` in a `.env` file inside `frontend/`.

---

## 🔒 Security Notes

> This project is built for **local and internal use**. Before any public deployment:

- The backend uses `allow_origins=["*"]` — restrict this to your frontend domain in production
- The in-memory `df_store` is a single global dict — not safe for multi-user concurrent sessions; use Redis or a session ID keyed store instead
- Never commit your `.env` file or expose your `GEMINI_API_KEY` publicly
- Add file size and type validation before deploying to production

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

**Ideas for improvement:** persistent file storage (S3/disk), multi-file session support, chart type selector (bar/pie/scatter), export insights as PDF, multi-turn conversation history for the chat, user authentication, streaming Gemini responses.

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).

Made with ❤️ by [Crasta Telvin](https://github.com/crastatelvin)

⭐ Star this repo if you find it useful!

</div>
