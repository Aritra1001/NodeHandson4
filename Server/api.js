const route = require('express').Router()
const bcrypt = require('bcrypt')
// route.use(express.json());
const saltRounds = 10;

function hashPassword(password){
    return bcrypt.hashSync(password, saltRounds);
}

function isCorrectpassword(password, hash){
    return bcrypt.compareSync(password, hash);
}
// const password = "Aritra@123";
// console.log("hashedPass => ", hashPassword(password));

const userData = [];

function register(req, res){
    console.log("Register is called...");
    const userInfo = req.body;
    // Validating the inputs
    if(userInfo.name == null || userInfo.phone == null || userInfo.email == null || userInfo.password == null){
        res.status(403).send("Please enter all the details");
        return;
    }
    
    userInfo.hashPassword = hashPassword(userInfo.password);
    delete userInfo.password;
    userData.push(userInfo);
    console.log("userInfo", userInfo);
    console.log("userData", userData);
    res.status(201).send("Registered Successfully");
}

function login(req, res){
    console.log("Login is called...");
    const loginInfo = req.body;
    if(loginInfo.email == null || loginInfo.password == null){
        res.status(403).send("Please enter email and password");
        return;
    }
    console.log("Login Data", loginInfo);

    let userFound = false;

    for(const userInfo of userData){
        const isSameUser = isCorrectpassword(loginInfo.password, userInfo.hashPassword)
        if(loginInfo.email === userInfo.email && isSameUser){
            userFound = true;
            break;
        }
    }
    if(userFound){
        res.send("logged in Successfully");
    } else{
        res.status(403).send("Wrong email or password. Please try again.");
    }
    
}

route.post('/register', register)

route.post('/login', login)

module.exports = route;