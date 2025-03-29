/**
 *  Demo-app med Express
 */

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs"); //view engine: EJS
app.use(express.static("public")); //statiska filer i katalog "public"

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

// Starta
app.listen(port, () => {
    console.log("Server started on port: " + port);
});