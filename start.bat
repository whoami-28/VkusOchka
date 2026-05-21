@echo off
start cmd /k "dotnet run"
start cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak > nul
start http://localhost:5173