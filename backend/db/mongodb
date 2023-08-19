const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log(`Connected to Mongodb atlas`);
    })
    .catch(() => {
        console.log(`Error!! Cannot connect to db`);
    })