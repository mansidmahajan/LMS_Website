const express = require("express");
const app = express();
const hbs = require("hbs");
const { request } = require("http");
const path = require("path");
const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/login", (req, res) => {
    res.render("login");
})

// create a new user in our database
app.post("/register", async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword) {
            const registerEmployee = new Register({
                name : req.body.name,
                username : req.body.username,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("index");

        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

// login check

app.post("/login", async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        // console.log(`${email} and password is ${password}`)
        const useremail = await Register.findOne({email:email});
        
        if(useremail.password === password){
            res.status(201).render("index");
        } else {
            res.send("password are not matching");
        }
        
    } catch (error) {
        res.status(400).send("Invalid Email");
}
})


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});