import pandas as pd
import mysql.connector
from mysql.connector import Error

# --- MySQL connection details ---
config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'your_mysql_password',
    'database': 'DisasterReliefManagement'
}

# --- Connect to MySQL ---
try:
    connection = mysql.connector.connect(**config)
    if connection.is_connected():
        print("✅ Connected to MySQL")

        # Read the Excel dataset
        file_path = "Disaster_Relief_Management_Complete_Dataset.xlsx"
        xls = pd.ExcelFile(file_path)

        print("📄 Sheets found:", xls.sheet_names)

        # Loop through sheets and upload them
        for sheet in xls.sheet_names:
            df = pd.read_excel(xls, sheet)
            df = df.where(pd.notnull(df), None)  # replace NaN with None for SQL

            table_name = sheet.strip().replace(" ", "_")  # e.g. "Relief Agency" → "Relief_Agency"
            cursor = connection.cursor()

            # --- Create dynamic insert query ---
            columns = ", ".join(df.columns)
            placeholders = ", ".join(["%s"] * len(df.columns))
            query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"

            print(f"📥 Inserting into {table_name} ({len(df)} rows)...")

            for i, row in df.iterrows():
                try:
                    cursor.execute(query, tuple(row))
                except Exception as e:
                    print(f"⚠️ Row {i} failed in {table_name}: {e}")

            connection.commit()
            print(f"✅ {table_name} done!")

except Error as e:
    print("❌ MySQL error:", e)

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("🔒 MySQL connection closed.")
