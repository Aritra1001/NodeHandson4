const express = require('express')
const route = require('./api')
const app = express();
app.use(express.json());

app.use(route)

app.use(cors({
    origin: "*"
}))

app.listen(4534,()=>{
    console.log("Our server is running")
})
