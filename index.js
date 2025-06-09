import express from 'express'
const app = express()
import { router as urlRoute } from './routes/url.js'
import { connectToMongoDB } from './connection.js';

import path from "path"
import staticRoute from './routes/staticRouter.js'
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/urlshorterner-SSR")
    .then(() => console.log("MongoDB connected!"))

//humne express ko bta diya ha ki humne ek view engine use krna ha SSR ke liye or hum ejs use krenge
app.set("view engine", "ejs");
//Hum yaha par express ko bta rahe ha ki hamari jitni bhi ejs ki files ha wo sari ./views folder me padi ha 
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',staticRoute);


app.use("/url", urlRoute)

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
