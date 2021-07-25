const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3003;
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(cors());

//connect to mongoose
mongoose.connect("mongodb+srv://ysabelle:Dexter26@cluster0.crbrb.mongodb.net/cardsDB?retryWrites=true&w=majority");



//data schema
const cardSchema ={
    title: String,
    content: String,
    image: String
}

//data model
const Card = mongoose.model("Card", cardSchema);

//API routes
app.get("/cards", (req, res) => {
    Card.find()
        .then((cards) => res.json(cards))
        .catch((err) => res.status(400).json("Error: " + err));
});

//create route
app.post('/create', (req, res) => {
    const newCard = new Card (
        {
            title: req.body.title,
            content: req.body.content,
            image: req.body.image
        });
    newCard
        .save()
        .then((card) => console.log(card))
        .catch((err) => res.status(400).json("error " + err));
})

//delete route
app.delete("/delete/:id",(req, res) => {
    const id = req.params.id;

    Card.findByIdAndDelete({_id: id}, (req, res, err) => {
        if(!err) {
            console.log("card deleted");
        } else {
            console.log(err);
        }

    });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    })
}


app.listen(port, function() {
    console.log("express is running");
})
