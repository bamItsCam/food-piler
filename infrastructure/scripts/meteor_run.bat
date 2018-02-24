@echo off
if "%~1"=="" (
    echo Pleas provide a mongodb password.
    goto end
) 

echo Running meteor with external mongo db...

set pwd=%1
shift
set MONGO_URL=mongodb://admin:%pwd%@159.65.225.215:27017/foodDB

meteor

:end