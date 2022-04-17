# Bananagrams Backend

This is the project for the Django python backend for the bananagrams web app.

## Python Setup

Follow the following steps to setup the python development environment

1. In the `bananagrams-backend` folder, run `python3 -m venv env` to create a python virtual enviroment named `env`
2. To source/activate the virtual environemtn
   1. Linux/MacOS: `source env/bin/activate`
   2. Windows `.\env\Scripts\activate`
3. After activating the environemnt, run `pip3 install -r requirements.txt`

## Setting up the database
1. Install PostgreSQL & pgadmin
   a. Make sure that the PG14 bin folder is added to your `path` variable. It should look something like `C:\Program Files\PostgreSQL\14\bin` on windows
2. Create the `bananagrams` database
3. Create the `C:\Program Files\PostgreSQL\14\etc\pg_service.conf` file if it doesn't exist. Add the following to the file:
```
[bananagrams]
host=localhost
user=postgres # fill in other username here if needed
dbname=bananagrams
port=5432
```
4. Create the `C:\Program Files\PostgreSQL\14\etc\.pgpass` file, which should have one line with the following format: 
```
hostname:port:database:username:password
```
For example:
```
localhost:5432:bananagrams:postgres:password:
```
5. Add system (or user) environment variables for the files created in the two previous steps, named `PGPASSFILE` and `PGSERVICEFILE`, respectively

## Starting the development server
in the terminal...
1. cd into the `\bananagrams_backend` directory
2. `py manage.py runserver`
3. Visit the webpage at http://127.0.0.1:8000/bananagrams

