const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for authorization types 
 */
router.get('/', (req, res) => {
    console.log('GET request for authorization types');
    let sqlText = `SELECT * FROM "authorizations" ORDER BY authorization_id;`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
            console.log(result.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        })
});

module.exports = router;