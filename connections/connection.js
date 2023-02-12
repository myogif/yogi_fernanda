const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://127.0.0.1:27017/yogi_fernanda', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// autoIncrement.initialize(connection);

const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error : '));
db.once('open', () => {
    console.log("Server Database Connected");
})