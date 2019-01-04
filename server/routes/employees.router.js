const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
const csvConverter = require("csvtojson");

router.get('/extract/:company', function (req, res) { 
   let company_id = req.params.company;
   console.log(company_id)
   const sqlText = `SELECT deals.csv_url
   FROM deals JOIN users ON deals.employer_id = users.company_id
   WHERE users.company_id=$1;`;
   pool.query(sqlText, [company_id])
       .then((result) => {
           console.log('The result: ', result.rows[0].csv_url)
           res.send(result.rows)
           axios({
            method:'GET',
            url: result.rows[0].csv_url
            //url: `https://firebasestorage.googleapis.com/v0/b/photo-storage-96fec.appspot.com/o/test_data_3.csv?alt=media&token=1f4a508d-33c2-4f54-a5f2-3ff72b7167e5`
            })
            .then((res) => {
               //console.log('The response: ', res.data);
               csvConverter().fromString(res.data)
               .then((jsonObj)=>{
                  console.log('What we expect to get: ', jsonObj);
                  let arrOfEmployees = []
                  
                  for (let obj of jsonObj) {
                     let arrOfValues = Object.values(obj)
                     arrOfEmployees.push(arrOfValues)
                  }
                  
                  console.log('This is the array of employees data arrays: ', arrOfEmployees)
                  
                  for (let arr of arrOfEmployees){
                     const sqlQuery = `INSERT INTO employees ("company", "employer_supplied_unique_id", "date_of_birth", "date_of_hire",
                     "union_status", "salary_per_year", "gender", "status", "state", "role", "employer_supplied_company_code")
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`
                     const queryArray = [ company_id, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9]];
                     pool.query(sqlQuery, queryArray)
                        .then((result) => {
                           console.log('Insert successful!')
                        })
                        .catch((error) => {
                           console.log('Error with employee table INSERT: ', error);
                        })
                  }
                  
               })
            })
            .catch((error) => {
               console.log('The axios error: ', error);
            })
       })
       .catch((error) => {
           console.log('The error: ', error)
       })
});

router.get('/get/:company', (req, res) => {
   let company_id = req.params.company;
   console.log(company_id)
   const sqlText = `SELECT * FROM employees WHERE company=$1 LIMIT(10);`;
   pool.query(sqlText, [company_id])
       .then((result) => {
           console.log('The result: ', result.rows)
           res.send(result.rows)
       })
       .catch((error) => {
           console.log('The error: ', error)
       })
});


module.exports = router;