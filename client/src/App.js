import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [district, setDistrict] = useState("Lucknow");
  const [districts, setDistricts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🏙️ Fetch all districts
  useEffect(() => {
    axios
      .get("/api/districts")
      .then((res) => setDistricts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 📊 Fetch data for selected district
  useEffect(() => {
    if (!district) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/mgnrega/${district}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [district]);

  const latest = data[data.length - 1] || {};

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "#FFF9E6",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>
        🏗️ मनरेगा प्रदर्शन डैशबोर्ड / MGNREGA Dashboard
      </h1>
      <p style={{ textAlign: "center", color: "gray" }}>
        राज्य: {latest.state || "उत्तर प्रदेश"} | ज़िला: {district}
      </p>

      {/* 🔽 District Dropdown */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <label htmlFor="district" style={{ fontWeight: "bold" }}>
          ज़िला चुनें (Select District):{" "}
        </label>
        <select
          id="district"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          {districts.length > 0 ? (
            districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>लोड हो रहा है... / Loading...</p>
      ) : (
        <>
          {/* 🧾 Info Cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 20,
              marginBottom: 30,
            }}
          >
            <InfoCard
              icon="🏡"
              title="काम करने वाले परिवार / Households Worked"
              value={latest.households_worked}
              tip="कितने परिवारों ने मनरेगा के तहत काम किया।"
            />
            <InfoCard
              icon="💰"
              title="कुल खर्च (₹ लाख) / Funds Utilized"
              value={latest.funds_utilized}
              tip="सरकार द्वारा खर्च की गई कुल राशि।"
            />
            <InfoCard
              icon="🧱"
              title="पूर्ण कार्य / Works Completed"
              value={latest.works_completed}
              tip="कितने काम पूरे हुए।"
            />
            <InfoCard
              icon="👷"
              title="कार्य दिवस / Persondays Generated"
              value={latest.persondays_generated}
              tip="कुल दिनों की संख्या जिनमें लोगों ने काम किया।"
            />
          </div>

          {/* 📊 Yearly Comparison Chart */}
          <h2 style={{ textAlign: "center", color: "#444" }}>
            📈 वर्ष अनुसार तुलना / Year-wise Comparison
          </h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="households_worked"
                  stroke="#28a745"
                  name="Households Worked"
                />
                <Line
                  type="monotone"
                  dataKey="persondays_generated"
                  stroke="#007bff"
                  name="Persondays"
                />
                <Line
                  type="monotone"
                  dataKey="funds_utilized"
                  stroke="#ff7300"
                  name="Funds Utilized"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🧍 Footer */}
          <footer
            style={{
              textAlign: "center",
              marginTop: 40,
              fontSize: "14px",
              color: "gray",
            }}
          >
            Made with ❤️ by [Your Name] | Build for Bharat Fellowship 2026
          </footer>
        </>
      )}
    </div>
  );
}

// 🧩 Info Card Component with tooltip
function InfoCard({ icon, title, value, tip }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 15,
        width: 240,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        position: "relative",
      }}
      title={tip}
    >
      <div style={{ fontSize: 30 }}>{icon}</div>
      <h3 style={{ fontSize: 16, color: "#333" }}>{title}</h3>
      <h2 style={{ color: "#007bff", marginTop: 5 }}>
        {value && value !== "N/A" ? value : "उपलब्ध नहीं / N/A"}
      </h2>
    </div>
  );
}
