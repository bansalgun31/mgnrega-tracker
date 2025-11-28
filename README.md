MGNREGA Tracker

This repository contains a small full-stack project to explore MGNREGA district-level data (2022-23 → 2025-26) using local CSV files.

**Quick Summary**
- **Stack:** Node.js + Express (server), React (client)
- **Data:** CSV files located in `server/data/`
- **Purpose:** Lightweight dashboard for inspecting district-level MGNREGA statistics

**Repository Layout**
- `server/` — Express server and CSV-reading endpoints (`server/index.js`). Serves static files from `../client/build` when present.
- `client/` — React application (Create React App)
- `server/data/` — CSV datasets used by the server

**API Endpoints**
- **GET** `/api/districts` — returns a sorted list of district names found in CSV files
- **GET** `/api/mgnrega/:district` — returns records for the requested district (case-insensitive substring match)

**Prerequisites**
- Node.js (v18+ recommended)
- npm (bundled with Node)

**Development (PowerShell)**

1) Install server dependencies (project root):

```powershell
cd .\
npm install
```

2) Install client dependencies (run in separate terminal) and start dev client:

```powershell
cd .\client
npm install
npm start
```

3) Start the server (project root). The server listens on `PORT` or defaults to `8080`:

```powershell
cd .\
$env:PORT = 8080  # optional
npm start
```

Notes:
- The client `package.json` includes a `proxy` set to `http://localhost:8080` to forward API calls during development. Run the React dev server and the Node server concurrently in two terminals.
- The root `start` script uses `node --watch index.js` to auto-restart on server-side changes (requires Node that supports `--watch`).

**Build & Serve (production)**

```powershell
cd .\client
npm run build
cd ..\
npm start
```

After building the client, the server will serve the static files from `client/build`.

**Sample API Requests (PowerShell)**

Get districts:

```powershell
Invoke-RestMethod -Uri http://localhost:8080/api/districts
```

Get MGNREGA info for a district (example: `sikar`):

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/mgnrega/sikar"
```

**Data**
- CSV files are located in `server/data/`. The server reads each file listed in `server/index.js` (`mgnrega_2022-23.csv` through `mgnrega_2025-26.csv`) and skips missing files.

**Troubleshooting**
- If the client shows network or CORS issues, ensure the server is running on the expected port (`8080`) and that you've started the client dev server separately.
- If the server does not auto-restart, ensure your Node version supports the `--watch` flag.

**Contributing / Next steps**
- Add a `start-dev` script that runs both server and client concurrently (e.g., using `concurrently`).
- Add documentation on CSV column meanings inside `docs/`.

**License & Attribution**
- See `lincense` file for license information.
