require('dotenv').config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router")
const contactRoute = require("./router/contact-router")
const serviceRoute = require("./router/service-router")
const connectDb = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const PORT = 5000;


//*middlewares */ 
app.use(cors());
app.use(express.json());//This line of code adds Express middleware that parses incoming request bodies with JSON payloads. It's important to place this before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests, and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.

// lets tackle cors issue
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, HEAD,DELETE",
    credentials:"true",
    optionsSuccessStatus: 200,
}

// ? mount the router : to use the router in your main express app , you can "mount" it at a specific URL prefix

app.use("/api/auth" , authRoute);
app.use("/api/form" , contactRoute);
app.use("/api/data" , serviceRoute);

app.use(errorMiddleware);

// no need after add controller and router

// app.get("/" , (req,res)=>{
//     res.status(200).send("Welcome");
// });

// app.get("/about" , (req,res)=>{
//     res.status(200).send("Welcome to about us page");
// });

connectDb().then(()=>{
    app.listen(PORT , ()=> {
        console.log(`server is running at port : ${5000}`);
    });
});
