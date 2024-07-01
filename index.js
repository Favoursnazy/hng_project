import express from "express";
const app = express();
const api_key = "ec597486637f415e8d4170001240107";

app.set("trust proxy", true);

app.get("/api/hello", async (req, res) => {
  const name = req.query.visitor_name;
  const ipAddress =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  const fetch_res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${ipAddress}`
  );
  const fetch_data = await fetch_res.json();

  return res.json({
    client_ip: ipAddress,
    location: fetch_data.location.region,
    greeting: `Hello,  ${name}!, the temperature is ${fetch_data.current.temp_c} degrees Celcius in ${fetch_data.location.region}`,
  });
});

app.listen(5000);
