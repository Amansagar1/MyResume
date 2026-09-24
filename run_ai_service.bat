@echo off
echo ========================================================
echo   Starting Kumar Aman Sagar - Python AI RAG Microservice
echo ========================================================
echo   Running on http://127.0.0.1:8001
echo   Endpoints: /chat, /health, /
echo ========================================================

C:\Users\sagar\python311\python.exe -m uvicorn server:app --app-dir "%~dp0ai_agent" --host 127.0.0.1 --port 8001 --reload
pause
