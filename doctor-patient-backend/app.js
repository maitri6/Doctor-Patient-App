

const express=require('express');
const http=require('http');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require("cors");

const app=express();
app.use(express.json());

const server=http.createServer(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const indexRouter = require("./routes/index");
//mongoose connection
mongoose.connect("mongodb+srv://CMS:bk9828064545@cluster0.itloa.mongodb.net/Doctor-Patient?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use("/api/v1", indexRouter);
const dbConn = mongoose.connection;
dbConn.on("error", () => {
 console.log("Mongodb connection error");
});

dbConn.once("open", function () {
    console.log("Mongodb connected successfully");
});

app.get('/',function(req,res) {
    res.send("Doctor Patient App Runs")
});

server.listen(3003,function(){
    console.log("Server is running at 3003");
})
