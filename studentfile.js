const express = require('express');
const mysql = require('mysql');
const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sample1"
})
con.connect(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('mysql connected')
    }
})
function readStudent(req, res) {
    try{
        con.query('select * from studentInfo', (err, result) => {
            if(err){
                console.log(err.sqlMessage)
            }else{
                res.send(result)
            }
        })
    }catch(error){
        console.log(error)
    }
    }
    
app.get('/studentfile', readStudent)

app.listen(1000, () => {
    console.log('listen localhost 1000')
})