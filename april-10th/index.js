const express = require('express');
const {Pool} = require('pg');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "sshhhhhh"
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middleware')

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_d0pKEuRqvb3i@ep-cool-moon-a1nlnhkm-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;
    const response = await pool.query(`INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id;`, [username, email, password])
    // console.log(response)
    res.json({
        message: "signup done",
        id: response.rows[0].id
    })
})



app.post("/signin", async (req, res) => {
    const {username, password} = req.body;

    const response = await pool.query(`SELECT * FROM users WHERE username = $1 AND password = $2`, [username, password]);
    console.log(response);

    const userExist = response.rows[0];

    if(!userExist){
        return res.json({
        message: "invalid username or password"
    })
    }

    const token = jwt.sign({
        userId : userExist.id,
    }, JWT_SECRET)

    res.cookie('token', token)
       .json({message: "login successfully", token: token})
    

});

app.listen(3000)