from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import io
from data_service import profile_data
from gemini_service import ask_gemini

app = FastAPI(title="Ops Intelligence Copilot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for uploaded dataframe
df_store = {}

@app.get("/")
def root():
    return {"status": "Ops Intelligence Copilot API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if file.filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(contents))
        elif file.filename.endswith((".xlsx", ".xls")):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            return JSONResponse(
                status_code=400,
                content={"error": "Only CSV and Excel files are supported"}
            )

        df_store["current"] = df
        df_store["filename"] = file.filename
        insights = profile_data(df)
        return JSONResponse({
            "message": "File uploaded successfully",
            "filename": file.filename,
            "insights": insights
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/query")
async def query_data(payload: dict):
    try:
        question = payload.get("question", "").strip()
        if not question:
            return JSONResponse(status_code=400, content={"error": "Question is required"})

        df = df_store.get("current")
        if df is None:
            return JSONResponse(status_code=400, content={"error": "No file uploaded yet. Please upload a CSV or Excel file first."})

        summary = df.describe(include="all").to_string()
        columns = list(df.columns)
        sample = df.head(5).to_string()

        answer = ask_gemini(question, summary, columns, sample)
        return JSONResponse({"answer": answer})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/status")
def status():
    has_data = "current" in df_store
    return {
        "has_data": has_data,
        "filename": df_store.get("filename", None)
    }
