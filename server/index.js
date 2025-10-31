const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

const app = express();
app.use(cors());
app.use(express.json());

const dataFiles = [
  "mgnrega_2022-23.csv",
  "mgnrega_2023-24.csv",
  "mgnrega_2024-25.csv",
  "mgnrega_2025-26.csv",
];

app.get("/api/districts", async (req, res) => {
  const dataFolder = path.join(__dirname, "data");
  const districts = new Set();

  try {
    for (const file of dataFiles) {
      const filePath = path.join(dataFolder, file);
      if (!fs.existsSync(filePath)) continue;

      const jsonArray = await csv().fromFile(filePath);
      jsonArray.forEach((r) => {
        if (r.district_name) districts.add(r.district_name.trim());
      });
    }

    res.json(Array.from(districts).sort());
  } catch (err) {
    console.error("❌ District list error:", err.message);
    res.status(500).json({ message: "Error reading districts" });
  }
});

app.get("/api/mgnrega/:district", async (req, res) => {
  const district = req.params.district.toLowerCase();
  const dataFolder = path.join(__dirname, "data");

  const results = [];

  try {
    for (const file of dataFiles) {
      const filePath = path.join(dataFolder, file);
      if (!fs.existsSync(filePath)) continue;

      const jsonArray = await csv().fromFile(filePath);

      const record = jsonArray.find(
        (r) =>
          r.district_name && r.district_name.toLowerCase().includes(district)
      );

      if (record) {
        results.push({
          year: file.replace("mgnrega_", "").replace(".csv", ""),
          state: record.state_name || "N/A",
          district: record.district_name || district,
          households_worked: record.Total_Households_Worked || "N/A",
          persondays_generated:
            record.Persondays_of_Central_Liability_so_far ||
            record.Total_Individuals_Worked ||
            "N/A",
          funds_utilized: record.Total_Exp || "N/A",
          works_completed: record.Number_of_Completed_Works || "N/A",
        });
      }
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for this district" });
    }

    res.json(results);
  } catch (err) {
    console.error("❌ CSV read error:", err.message);
    res.status(500).json({ message: "Error reading data files" });
  }
});

const buildPath = path.resolve(__dirname, "../client/build");
app.use(express.static(buildPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ MGNREGA Server started on port ${PORT}`);
});
