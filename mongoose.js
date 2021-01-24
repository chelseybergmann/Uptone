
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:<password>@cluster0.uxsnn.mongodb.net/<dbname>?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connection to mongodb is on");
});