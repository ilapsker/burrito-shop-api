const app = require("./app");
const { dbConnect } = require("./database/connection");
const { dbLoadInitData } = require("./database/initdata.loader");

//const PORT = process.env.PORT || 3000;

// Connect mongo DB first
dbConnect().then(() => {
    // Load init data from file if empty on start for what not impmemented by API yet
    dbLoadInitData().then(() => {
        app.listen(process.env.PORT , (err) => {
            if (err) console.log("Not able to start express server")
            else console.log("Server listening on Port", process.env.PORT );
        });
    }).catch((err) => {
        console.log("Unable to load init data into db " + err);
    })
}).catch((err) => {
    console.log("Not able to connect to database " + err);
});