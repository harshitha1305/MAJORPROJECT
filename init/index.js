const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() =>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    initData.data = initData.data.map((obj) =>({...obj,owner : "68a9982a28519e237bef1e92"}));
     await Listing.insertMany(initData.data);
     console.log("DB Seeded");
}

initDB();