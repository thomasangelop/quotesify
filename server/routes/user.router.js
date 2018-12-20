const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => { 
  // all registered users belong to a company
  console.log('VALUES FOR ALL TABLES', req.body)  
  const name = req.body.company_name;
  const authorization_id = req.body.authorization_id;
  const queryText = 'INSERT INTO "companies" (name, authorization_id) VALUES ($1, $2) RETURNING company_id';
  pool.query(queryText, [name, authorization_id])
    .then((result) => { 
      const company_id = parseInt(result.rows[0].company_id);
      const username = req.body.username;
      const password = encryptLib.encryptPassword(req.body.password);
      console.log('VALUES FOR USER TABLE', company_id, username, password)
      const queryText2 = 'INSERT INTO "users" ( username, password, company_id ) VALUES ($1, $2, $3) RETURNING company_id;';
      pool.query(queryText2, [username, password, company_id])
       .then((result) => {
        // all employers belong to a deal check to make sure user has the correct authorization to be an employer
        console.log('result',result)
        if (authorization_id === 2){
          // the brokers compnay id is inserted into the Deals table colunm broker_id
          const broker_id = req.body.user_id;
          // the employers company id is inserted into the Deals table colunm employer_id 
          const company_id = parseInt(result.rows[0].company_id);
          const date = new Date();
          // const date = req.body.date_sent;
          console.log('VALUES FOR DEAL TABLE', broker_id, company_id, date)
          const queryText3 = 'INSERT INTO "deals" ( broker_id, employer_id, date_email_sent_to_employer ) VALUES ($1, $2, $3);';
          pool.query(queryText3, [date, broker_id, company_id])
          .then((result)=>{
            res.sendStatus(201);
          })
          .catch((err) => {
            next(err);
          })
        } else {
          res.sendStatus(201);
        }
        
      })
      .catch((err) => { next(err); })
    })
     
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
