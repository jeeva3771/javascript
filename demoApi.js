const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample1' 
})
con.connect(function(err){
    if(err){
        console.error(err)
    }else{
        console.log('mysql connected')
    }
})
app.get('/',function(req,res){
    con.query('select * from student',function(err,result){
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.send(result)
        }
    })
})

app.post('/',function(req,res){
    const {
        studentName,
        studentAge,
        native
    } =req.body;
    con.query('insert into student(studentName,studentAge,native) values(?,?,?)',[studentName,studentAge,native],function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send('inserted successfully')
        }
    })
    
})

app.put('/:jeeva', (req, res) => {
    const adminId = req.params.jeeva;
    const {
        place,
        native,
    } = req.body;
    try {
    con.query('update student set place = ? where id = ?', [place,native,adminId], (err,result) =>{
        if (err) {
            res.send('err')
        }else{
            res.send('inserted success')
        }
    
})
}
catch (error) {
    console.error(error)
}
})

app.delete('/:',)


app.listen(6000, () => {
    console.log('port listening on 6000')
})

