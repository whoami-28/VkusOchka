@echo off
title Vkusochka Servers

echo [1/3] Запуск бэкенда (C#)...
start /b dotnet run

echo [2/3] Запуск фронтенда (React)...
cd frontend
start /b npm run dev
cd ..

echo [3/3] Ожидание запуска серверов...
timeout /t 5 /nobreak > nul
start http://localhost:5173

echo.
echo Бэкенд и фронтенд запущены
echo Логи обоих серверов будут смешанно выводиться сюда
echo Чтобы остановить работу, закройте это окно