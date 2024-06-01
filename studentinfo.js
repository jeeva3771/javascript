const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample1'
})
con.connect(function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('mysql connected')
    }
})
app.get('/', function (req, res) {
    const {
        page = 1,
        limit = 5,
    } =req.query;
    
    const pageNo = isNaN(page) ? 1 : Number(page)
    const limitNo  = isNaN(limit) ? 5 : Number(limit)

    console.log(pageNo,limitNo)

    try {
        con.query('select * from studentInfo limit ? offset ?',[limitNo,(pageNo -1 )*limitNo], function (err, result) {
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).send(result)
            }
        })
    } catch (error) {
        console.log(err)
    }

})
app.post('/', (req, res) => {
    const {
        firstName,
        lastName,
        yearOfStudy,
        native
    } = req.body;
    try {
        con.query('insert into studentInfo (firstName,lastName,yearOfStudy,native) values (?,?,?,?)', [firstName, lastName, yearOfStudy, native], function (err, result) {
            // console.log(err.sqlMessage)
            if (err) {
                res.status(409).send(err.sqlMessage)
            } else {
                res.status(200).send('Insert Successfully')
            }
        })
    } catch (error) {
        console.log(error)
    }
})
app.put('/:id', (req, res) => {
    const studId = req.params.id;
    const {
        firstName,
        lastName,
        yearOfStudy,
        native,
    } = req.body;
    try {
        con.query('update studentInfo set firstName = ?, lastName = ?, yearOfStudy = ?, native = ? where id = ?', [firstName, lastName, yearOfStudy, native, studId], (err, result) => {
            con.query('select * from studentInfo where id = ?', [studId],function (err2,result2) {
            if(err2){
                console.log(err2.sqlMessage)
            }
            res.send(result2[0])
            })
        })
    } catch (err) {
        console.err(err)
    }

})
app.delete('/:id', function (req, res) {
    const studId = req.params.id;
    try {
        con.query('delete from studentInfo where id = ?', [studId], (err, result) => {
            if (result.affectedRows == 0) {
                res.status(409).send('Invalid Id ')
            } else {
                res.status(200).send('Deleted')
            }
        })
    } catch (error) {
        console.error(error)
    }


})

app.listen(2000, () => {
    console.log('listen localhost 2000')
})


// list = [29,34,38,380,209,992,748]
// index1 =list[0]

// // for (listValue of list){
// //     console.log(listValue)
// // }

//  for (var i=0; i<list.length; i++){
//    console.log(list[i])
// }
jhnnnnnnjjjjjj