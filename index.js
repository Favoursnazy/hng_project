import express from "express";
const app = express();
const api_key = "ec597486637f415e8d4170001240107";

app.get("/api/hello", async (req, res) => {
  const name = req.query.visitor_name;
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then(async (data) => {
      const fetch_res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${data.ip}`
      );
      const fetch_data = await fetch_res.json();

      return res.json({
        client_ip: data.ip,
        location: fetch_data.location.region,
        greeting: `Hello,  ${name}!, the temperature is ${fetch_data.current.temp_c} degrees Celcius in ${fetch_data.location.region}`,
      });
    })
    .catch((error) => {
      console.error("Error fetching IP:", error);
    });
});

app.listen(5000);
