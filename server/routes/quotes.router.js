const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
var moment = require('moment');

/**
 * GET route for quote table
 */ 
// WHERE deals.broker_id = $1
router.get('/quotestable/:id', rejectUnauthenticated, (req, res) => {
   let dealId = req.params.id;
   const sqlText = `SELECT employers.name as employer_name, providers.name as provider_name, deals.date_email_sent_to_employer, quotes.decision_complete, deals.broker_id FROM "deals" 
   JOIN "companies" as "employers" ON deals.employer_id = employers.company_id 
   JOIN "quotes" ON deals.deal_id = quotes.deal_id
   JOIN "companies" as "providers" ON quotes.provider_id = providers.company_id
   WHERE deals.broker_id = $1;`;
   pool.query(sqlText, [dealId])
       .then((result) => {
           console.log(`Got QUOTES TABLE stuff back from the database`, result);
           res.send(result.rows);
       })
       .catch((error) => {
           console.log(`Error making QUOTES TABLE database query ${sqlText}`, error);
           res.sendStatus(500); // Good server always responds
       })
});



// This will retrieve the quotes from the DB for the Provider
router.get('/', (req, res) => {
    const queryText = `SELECT "quotes".*, "deals"."csv_url", "broker"."name" as "broker", "employer"."name" as "employer" FROM "quotes"
    JOIN "deals" on "quotes"."deal_id" ="deals"."deal_id"
    JOIN "companies" as "broker" on "deals"."broker_id" ="broker"."company_id"
    JOIN "companies" as "employer" on "deals"."employer_id" ="employer"."company_id"
    WHERE "provider_id"=${req.user.company_id};`;
    console.log('GET request for Provider queryText:', queryText);
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing GET quotes query:', error);
        res.sendStatus(500);
      });
  });

// PUT route to update the quotes once the Provider has responded to the quote
router.put('/:quote_id', (req, res) => {
   const quote = req.body;
   const now = new Date();   
   const sqlText = `UPDATE "quotes" SET 
   "provider_response_file_location"=$1, 
   "decision_complete"=true, 
   "provider_response_message"=$2, 
   "date_of_provider_decision"=$3 
   WHERE quote_id=$4;`;
   const queryValues = [
      quote.file_url,
      quote.message,
      now,
      quote.quote_id,
    ];
   pool.query(sqlText, queryValues)
      .then((response)=>{
         console.log('Quote UPDATE successful, response: ', response);
         res.sendStatus(200);
      })
      .catch((error)=>{
         console.log('Error with quote UPDATE: ', error);
         res.sendStatus(500);
      })
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

// This will POST a new quote on our DB when the data is sent out to a provider
router.post('/', (req, res) => {
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log("ENTERING CREATE NEW QUOTE POST");
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  let promiseArray=[];
  let failedProviderIdsArray=[];
    let array = req.body;
    const date = moment().format('YYYY-MM-DD');
    console.log("date string provided by moment.js:", date);
  for (let i = 0; i < array.length; i++) {
    const queryText = `INSERT INTO "quotes" ("provider_id", "deal_id", "date_data_sent_to_provider")
                      VALUES ($1, $2, $3)`;
    const queryValues = [
      array[i].company_id,
      array[i].deal_id,
      date,
    ];
    pool.query(queryText, queryValues)
      //  .then(() => {  })
      .catch((error) => {
        //console.log('Error completing POST request for your quote query:', error);
        failedProviderIdsArray.push(queryValues[0]);
      });
  }//  end for loop
  
})
//.then(res.sendStatus(201));//  end post

//  res.sendStatus(201);
//  res.sendStatus(500);

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


//  New get to get  {company_id: 1, name: 'aflac', and authorization_id: 4}
//  for new quote generator popup menu (the information to display on the menu)
//  This get will need to be based on the broker that's logged in??
router.get('/providers', (req, res) => {
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log("ENTERING GET GET GET GET GET  ");
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  
  const queryText = `SELECT * FROM "companies" 
  WHERE authorization_id=4;`;
  pool.query(queryText)
    .then((result) => { 
      console.log("result.rows: ", result.rows);
      res.send(result.rows); 
    
    })
    .catch((error) => {
      console.log('Error completing GET quotes query:', error);
      res.sendStatus(500);
    });
});


// GET route for the employer's view
// router.get('/:company_id', (req, res) => {
//   const company_id = req.params.company_id;
//   const sqlText = `SELECT users.*, deals.deal_id FROM deals JOIN users
//    ON users.company_id = deals.employer_id WHERE user.${company_id} = companies.employer_id RETURNING deal_id;
//   ;`;
//   pool.query(sqlText, [req.params.deal_id])
//     .then((result) => {
//       //console.log(result.rows)
//       res.send(result.rows)
//     })
//     .catch((error) => {
//       console.log('The error: ', error)
//     })
// });

module.exports = router;