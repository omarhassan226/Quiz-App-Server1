const mongoose = require("mongoose");

exports.connect = () => {
    return mongoose.connect(
        "mongodb+srv://omar97:24682468fha5@quiz-app1.7nqgu.mongodb.net/",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
};
