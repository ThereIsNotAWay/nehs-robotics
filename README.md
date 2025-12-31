# NEHS-Robotics Overview

To be added

# Project Overview

This project makes use of the Python framework Flask. Live server extension will not work as it requires Python to be able to run Python backend code and Jinja templating. Read instructions below to correctly run application.

## Virtual Environment
Run `python -m venv .venv` to create a Python virtual environment with the name ".venv." It can be named anything, just remember to include it in the .gitignore.

### Windows Activation
Run `.venv\Scripts\activate` to activate Python virtual environment on windows os. If you named the virtual environment other than ".venv," then use that name instead while keeping everything else the same.  

### Mac Activation
Run `source .venv/bin/activate` to activate Python virtual environment on mac os. If you named the virtual environment other than ".venv," then use that name instead while keeping everything else the same.

## Required Python Modules

There is a list of Python modules to install to correctly run the project.
To install all required modules, run `pip install -r requirements.txt`

## Run Flask Application
The easiest way to run this flask application is to run the command, `python run.py` and it will open a window of your designated browser with the Flask application. 