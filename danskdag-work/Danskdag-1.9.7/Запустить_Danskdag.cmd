@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "%~dp0Danskdag.html" (
 echo Не найден Danskdag.html. Распакуйте архив целиком.
 pause
 exit /b 1
)
start "" "%~dp0Danskdag.html"
