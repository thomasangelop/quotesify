const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
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