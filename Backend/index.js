const connectToMongo = require("./db")
const express = require("express")
require('dotenv').config();
const cors = require('cors');
const path = require("path");

const _dirname = path.resolve();



connectToMongo();

const app = express();
const port = 4000;

app.use(cors());
app.use("/api/auth",require("./Routes/auth"));
app.use("/api/notes",require("./Routes/notes"));


app.use(express.static(path.join(_dirname,"/inotebook/build")));

app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"inotebook","build","index.html"));
});

app.listen(port,()=>{
    console.log("Listen at Port ",port);
})

