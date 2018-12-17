const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This will retrieve the quotes from the DB
router.get('/', (req, res) => {
    const queryText = `SELECT "quotes".*, "broker"."name" as "broker", "employer"."name" as "employer" FROM "quotes"
    JOIN "deals" on "quotes"."deal_id" ="deals"."deal_id"
    JOIN "companies" as "broker" on "deals"."broker_id" ="broker"."company_id"
    JOIN "companies" as "employer" on "deals"."employer_id" ="employer"."company_id"
    WHERE "provider_id"=8;`;
    //req.user.id??
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET quotes query:', error);
        res.sendStatus(500);
      });
  });

// // This will POST a new quote on our DB and respond to client
// router.post('/', (req, res) => {
//     const newQuote = req.body;
//     const queryText = `INSERT INTO "quotes" ("user_id", "quote", "category_id", "mute_status")
//                       VALUES ($1, $2, $3, $4)`;
//     const queryValues = [
//       newQuote.user_id,
//       newQuote.quote,
//       newQuote.category_id,
//       newQuote.mute_status,
//     ];
//     pool.query(queryText, queryValues)
//       .then(() => { res.sendStatus(201); })
//       .catch((error) => {
//         console.log('Error completing POST request for your quote query:', error);
//         res.sendStatus(500);
//       });
//   });

// // This will delete a quote from our DB and send a response
// router.delete('/:id', (req, res) => {
//   console.log('Deleting this quote:', req.params);
//   const queryText = 'DELETE FROM quotes WHERE id=$1';
//   pool.query(queryText, [req.params.id])
//     .then(() => { res.sendStatus(200); })
//     .catch((error) => {
//       console.log('Error completing DELETE quote query:', error);
//       res.sendStatus(500);
//     });
// });


module.exports = router;