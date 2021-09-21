const e = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lmsregistration",{
    useNewUrlParser:true,
    
    useUnifiedTopology:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(e);
})



