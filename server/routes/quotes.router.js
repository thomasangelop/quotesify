const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
 * GET route for quote table
 */
router.get('/quotetable', rejectUnauthenticated, (req, res) => {
   const sqlText = ``;
   pool.query(sqlText)
       .then((result) => {
           console.log(`Got stuff back from the database`, result);
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

module.exports = router;