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
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;