@echo off
chcp 65001 >nul
set "DANSKDAG_DIR=%~dp0"
powershell.exe -NoLogo -NoProfile -Command "$ErrorActionPreference='Stop'; $dir=$env:DANSKDAG_DIR; $html=Join-Path $dir 'Danskdag.html'; $icon=Join-Path $dir 'Danskdag.ico'; if (!(Test-Path -LiteralPath $html)) { throw 'Extract the complete archive before creating the shortcut.' }; $desktop=[Environment]::GetFolderPath('Desktop'); $shell=New-Object -ComObject WScript.Shell; $link=$shell.CreateShortcut((Join-Path $desktop 'Danskdag HTML.lnk')); $link.TargetPath=$html; $link.WorkingDirectory=$dir; $link.IconLocation=$icon+',0'; $link.Description='Danskdag offline language practice'; $link.Save()"
if errorlevel 1 (
 echo Не удалось создать ярлык. Откройте Danskdag.html напрямую.
) else (
 echo На рабочем столе создан ярлык Danskdag HTML.
 echo Сохраните папку приложения на постоянном месте, чтобы ярлык работал.
)
pause
