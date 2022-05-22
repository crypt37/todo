const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require('mongoose');
var assert = require('assert');

mongoose.connect("mongodb+srv://admin:txprs123@cluster0.ijvjs.mongodb.net/HomeDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const homeschema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"you must write something"]
    },

});

app.post("/:title",function(req, res)

{

post_name=req.params.title;
    const addition = req.body.text;
        post_name = mongoose.model("post_name", homeschema,post_name);

         post_name = new post_name({
        name: addition
    });
    post_name.save();




    res.redirect("/" +req.params.title );
});
app.post("/delete/:title",function(req, res) {
    let post_name = req.params.title;
        var del = req.body.checkbox;
        post_name = mongoose.model("post_name", homeschema, post_name);
        Promise.resolve(post_name.findOneAndDelete({name: del}));

        res.redirect("/" +  req.params.title);

});
app.get("/", function (req, res) {
    res.redirect("/home");
});
app.get("/:title", function (req, res) {
    let req_name = req.params.title;
    req_name= mongoose.model("req_name", homeschema,req_name);



    req_name.find({}).exec(function (err, results)
    {

    res.render('list', {
            day:req.params.title,
            home:results

    });
});
});






app.listen(process.env.PORT ||3489, function () {
    console.log("listening");
});