# Futbol Favoritas

## Description

An application designed in mind for the avid football fan to track clubs of interest and view their league table, fixtures, results and club information. It was built with `express`, `sequelize` in the backend and `react` for the frontend. Using Football-Data API: https://www.football-data.org/

The application is split into two repositories, this is the backend repo. Frontend repo can be found here: https://github.com/r-basu/futbol-favoritas-client


## Table of Contents

- [Deployment](#deployment)
- [Installation](#installation)

## Deployment

Deployed application: https://futbol-favoritas.netlify.app/

## Installation

Backend Server setup:

1. Setup `.env` file with `DB_NAME`, `DB_PASS`, `DB_USER`, `API_KEY`, `JWT_SECRET`
1. (Heroku setup) Add `API_KEY` and `JWT_SECRET` to heroku variables.
2. Log into mySQL shell and source `db/schema.sql` and exit.
3. Run `npm run seed` to seed initial data if needed.
3. (Heroku setup) Run `heroku run npm run seed` to seed initial data if needed.
4. Run `npm run start` to start the server. 
