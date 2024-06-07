const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
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
//const {
//page = 5,
//limit = 5,
// } =req.query;

//var page = typeof req.query.page === undefined ? 1 : req.query.page
//var limit = typeof req.query.limit === undefined ? 5 : req.query.limit

//var page = ''
//if (typeof req.query.page === undefined) {
//page = 1
//} else {
//page = req.query.page
//}
//var limit = ''
//if (typeof req.query.limit === undefined) {
//  limit = 5 
//} else {
//  limit = req.query.limit
//}

//const pageNo = isNaN(page) ? 1 : Number(page)
//const limitNo  = isNaN(limit) ? 5 : Number(limit)

//console.log(pageNo,limitNo)
//[limitNo,(pageNo -1 )*limitNo]

function readStudent(req, res) {
    const {
        page = 1,
        limit = 5,
        orderBy = 'desc',
        sortBy = 'firstName'
    } = req.query;
    const pageNo = isNaN(page) ? 1 : Number(page)
    const limitNo = isNaN(limit) ? 5 : Number(limit)

    const finalResult = {
        total: 0,
        result: []
    }

    const availableColumn = ['firstName','lastName','yearOfStudy','native']
    const sortOption = ['asc', 'desc']

if (availableColumn.includes(sortBy) === false) {
    res.status(400).send('invaild column')
    return
}
if (sortOption.includes(orderBy) === false) {
    res.status(400).send('invalid sorting')
    return
}


    


    try {
        //con.query('select * from studentInfo limit ? offset ?',[limitNo, (pageNo-1) * limitNo], function (err, result) {
        //con.query('select * from studentInfo order by firstName desc', function (err, result) {
        //con.query(`select * from studentInfo order by firstName ${sortBy} limit ? offset ?`,[limitNo, (page-1) * limitNo], function (err, result) {
        //con.query(`select * from studentInfo order by ${sortBy} ${orderBy} limit ? offset ?`,[limitNo, (page-1) * limitNo], function (err, result) {
        
con.query('select count(id) as totalOfId from studentInfo', function (err, result) {
            console.log(result[0].totalOfId)
             if (result[0].totalOfId>0){
                finalResult.total = result[0].totalOfId
                con.query(`select * from studentInfo order by ${sortBy} ${orderBy}`, function (err2, result2) {
                    if(err2){
                        console.log(err2.sqlMessage)
                    }
                    finalResult.result = result2
                    res.status(200).send(finalResult)
                })    
             } else {
                 res.status(200).send(finalResult)
             }
        })
    } catch (error) {
        console.log(error)
    }
}

//app.post('/student', (req, res) => {
function createstudent(req, res) {
    const {
        firstName,
        lastName,
        yearOfStudy,
        native
    } = req.body;

    if (firstName === '' || lastName === '' || yearOfStudy === '' || native === '') {
        res.status(400).send('invalid input')
    }

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
}

//app.put('/student/:id', (req, res) => {

function updatestudent(req, res) {
    const studId = req.params.id;
    const {
        firstName,
        lastName,
        yearOfStudy,
        native,
    } = req.body;
    try {
        con.query('update studentInfo set firstName = ?, lastName = ?, yearOfStudy = ?, native = ? where id = ?', [firstName, lastName, yearOfStudy, native, studId], (err, result) => {
            con.query('select * from studentInfo where id = ?', [studId], function (err2, result2) {
                if (err2) {
                    console.log(err2.sqlMessage)
                }
                res.send(result2[0])
            })
        })

    } catch (error) {
        console.log(error)
    }
}
//app.delete('/studen/:id', function (req, res) {
function deletestudent(req, res) {
    const studId = req.params.id;
    try {
        con.query('delete from studentInfo where id = ?', [studId], (err, result) => {
            con.query('select * from studentInfo', function (err2, result2) {
                //if (result.affectedRows == 0) {
                //res.status(409).send('Invalid Id')
                //} else {
                //res.status(200).send('Deleted')
                if (err2) {
                    console.log(err2.sqlMessage)
                }
                res.send(result2)
            })
        })
    } catch (error) {
        console.error(error)
    }
}
app.get('/student', readStudent)
app.post('/student', createstudent)
app.put('/student/:id', updatestudent)
app.delete('/student/:id', deletestudent)

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
//D:\development\nodejs\studentinfo.js

