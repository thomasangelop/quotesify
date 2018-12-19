const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for quote table
 */ 
// WHERE deals.broker_id = $1
router.get('/quotestable', rejectUnauthenticated, (req, res) => {
   const sqlText = `SELECT employers.name, providers.name, 
   deals.date_email_sent_to_employer, quotes.decision_complete, deals.broker_id FROM "deals" 
   JOIN "companies" as "employers" ON deals.employer_id = employers.company_id 
   JOIN "quotes" ON deals.deal_id = quotes.deal_id
   JOIN "companies" as "providers" ON quotes.provider_id = providers.company_id;`;
   pool.query(sqlText)
       .then((result) => {
           console.log(`Got QUOTES TABLE stuff back from the database`, result);
           res.send(result.rows);
       })
       .catch((error) => {
           console.log(`Error making QUOTES TABLE database query ${sqlText}`, error);
           res.sendStatus(500); // Good server always responds
       })
});

/**
 * GET route template
 */
router.get('/:deal', (req, res) => {
   const sqlText = `SELECT quotes.*, companies.name as provider
      FROM quotes JOIN companies ON quotes.provider_id=companies.company_id
      WHERE quotes.deal_id=$1;`;
   pool.query(sqlText,[req.params.deal])
      .then((result) => {
         //console.log(result.rows)
         res.send(result.rows)
      })
      .catch((error) => {
         console.log('The error: ', error)
      })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;