const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine","ejs");

const apiKey = "658b42c0097c0d18725a2c9fdde663ab";


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  query +
  "&units=metric&appid=" +
  apiKey;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.render("result",{weatherDescription:weatherDescription,query:query,temperature:temperature,imageUrl:imageUrl})
      // res.write("<p>The weather is currently " + weatherDescription + "</p>");
      // res.write(
      //   "<h1>The Current Temperature in "+query+" is: " +
      //     temperature +
      //     " degrees Celcius.</h1>"
      // );
      // res.write("<img src=" + imageUrl + ">");
      // res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is up and runnig on port 3000.");
});
