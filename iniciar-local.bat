@echo off
REM Sobe o gerador em http://localhost:8080 usando o Python do Windows
cd /d "%~dp0"
where py >nul 2>nul && (set PY=py) || (set PY=python)
start "" http://localhost:8080
echo Servidor rodando em http://localhost:8080  (feche esta janela ou Ctrl+C para parar)
%PY% -m http.server 8080
