const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route for client table
 */
router.get('/clienttable/:id', rejectUnauthenticated, (req, res) => {
   let dealId = req.params.id;
   const sqlText = `SELECT deals.deal_id, companies.name, deal_statuses.status, 
   deals.date_email_sent_to_employer FROM deals JOIN companies ON 
   deals.employer_id = companies.company_id JOIN deal_statuses ON 
   deals.deal_status_id = deal_statuses.deal_status_id 
   WHERE deals.broker_id = $1;`;
   pool.query(sqlText, [dealId])
       .then((result) => {
           //  console.log(`Got CLIENT stuff back from the database`, result);
           res.send(result.rows);
       })
       .catch((error) => {
           console.log(`Error making database query ${sqlText}`, error);
           res.sendStatus(500); // Good server always responds
       })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

router.put('/:deal', (req, res) => {
   const sqlText = `UPDATE deals SET csv_url=$1 WHERE deal_id=$2`;
   pool.query(sqlText,[req.body.csv_url, req.body.deal_id])
      .then((result)=>{
         console.log('The result is: ', result);
         res.sendStatus(200);
      })
      .catch((error)=>{
         console.log('The error is: ', error);
         res.sendStatus(500);
      })
});

module.exports = router;