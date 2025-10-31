MGNREGA District Performance Dashboard

A simple full-stack web app that shows how each district in a state is performing under the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) program.
Citizens can pick their district and view year-wise data such as households worked, funds utilized, person-days generated, and completed works.

Purpose

This project was built for the Build for Bharat Fellowship 2026 take-home challenge.
The goal was to make government open-data easy to understand for rural citizens, especially those who are not familiar with data dashboards or English-only interfaces.

Tech Stack

Frontend: React + Recharts
Backend: Node.js + Express
Database / Data Source: Local CSV files (official data.gov.in MGNREGA reports)
Hosting: Render.com

Features

Year-wise comparison of district performance (2022-23 → 2025-26)

Works entirely offline from CSV files – no API dependency

Auto-detected list of districts from data

Bilingual (Hindi + English) text and tooltips for easy understanding

Simple, mobile-friendly layout with clear icons and charts

Folder Structure
mgnrega-dashboard/
 ├── client/           → React frontend
 ├── server/           → Express backend
 │    ├── index.js
 │    └── data/        → CSV files for each year
 ├── package.json
 └── README.md

Run Locally
# 1. Install dependencies
npm install
cd client && npm install && npm run build && cd ..

# 2. Start server
node server/index.js

# 3. Open in browser
http://localhost:8080

Deploy on Render

Push the project to GitHub

On Render → New Web Service → connect repo

Build Command:

cd client && npm install && npm run build && cd .. && npm install


Start Command:

node server/index.js


Wait for deployment → visit your live URL (e.g. https://mgnrega-dashboard.onrender.com)

Data Source

Open Government Data Platform, India
https://data.gov.in/catalog/mahatma-gandhi-national-rural-employment-guarantee-act-mgnrega
