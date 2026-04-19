from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def ask_gemini(question: str, summary: str, columns: list, sample: str) -> str:
    prompt = f"""
You are an intelligent data analyst assistant for an Ops Intelligence Copilot tool.

The user has uploaded an operational dataset with the following details:

COLUMNS:
{columns}

DATA SAMPLE (first 5 rows):
{sample}

STATISTICAL SUMMARY:
{summary}

USER QUESTION:
{question}

Instructions:
- Answer clearly and concisely in plain English
- Focus specifically on insights from the data provided
- If asked for trends, comparisons, or rankings — explain them simply
- If you notice anomalies or unusual patterns, mention them
- If the question cannot be answered from this data, say so politely
- Keep your response under 200 words
- Use professional Markdown formatting (bolding, bullet points) to make your response visually appealing and readable
- Be conversational and helpful
"""
    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )
    return response.text
