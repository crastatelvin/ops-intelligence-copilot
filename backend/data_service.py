import pandas as pd
import numpy as np

def profile_data(df: pd.DataFrame):
    insights = []
    rows, cols = df.shape

    # Basic shape info
    insights.append(f"Dataset has {rows} rows and {cols} columns")

    # Column type breakdown
    numeric_cols = df.select_dtypes(include="number").columns.tolist()
    text_cols = df.select_dtypes(include="object").columns.tolist()
    date_cols = df.select_dtypes(include=["datetime"]).columns.tolist()

    if numeric_cols:
        insights.append(f"Numeric columns: {numeric_cols}")
    if text_cols:
        insights.append(f"Text columns: {text_cols}")
    if date_cols:
        insights.append(f"Date columns: {date_cols}")

    # Missing values check
    missing = df.isnull().sum()
    missing_cols = missing[missing > 0]
    if len(missing_cols) > 0:
        insights.append(f"Missing values found in: {missing_cols.to_dict()}")
    else:
        insights.append("No missing values found — clean dataset")

    # KPIs for numeric columns
    kpis = {}
    for col in numeric_cols:
        kpis[col] = {
            "mean": round(float(df[col].mean()), 2),
            "max": round(float(df[col].max()), 2),
            "min": round(float(df[col].min()), 2),
            "sum": round(float(df[col].sum()), 2),
            "median": round(float(df[col].median()), 2)
        }

    # Anomaly detection using Z-score (threshold: 2 standard deviations)
    anomalies = {}
    for col in numeric_cols:
        col_mean = df[col].mean()
        col_std = df[col].std()
        if col_std > 0:
            outliers = df[
                (df[col] > col_mean + 2 * col_std) |
                (df[col] < col_mean - 2 * col_std)
            ]
            if len(outliers) > 0:
                anomalies[col] = {
                    "count": len(outliers),
                    "percentage": round((len(outliers) / rows) * 100, 2)
                }

    # Chart data — first numeric column over index for a default trend chart
    chart_data = []
    if numeric_cols:
        primary_col = numeric_cols[0]
        sample_df = df[primary_col].dropna().head(20)
        chart_data = [
            {"index": str(i), "value": round(float(v), 2)}
            for i, v in enumerate(sample_df)
        ]

    return {
        "insights": insights,
        "kpis": kpis,
        "anomalies": anomalies,
        "chart_data": chart_data,
        "primary_chart_col": numeric_cols[0] if numeric_cols else None,
        "shape": {"rows": rows, "cols": cols},
        "columns": list(df.columns)
    }
