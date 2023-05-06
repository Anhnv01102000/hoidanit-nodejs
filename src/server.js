import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors"

import bodyParser from "body-parser";
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8888;

// config Cors app
configCors(app)

// config view engine
configViewEngine(app);

// -----------------------------
// config body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// -----------------------------

// test connection
connection()

// init web routes
initWebRoutes(app);

// init api routes
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port =" + PORT);
})