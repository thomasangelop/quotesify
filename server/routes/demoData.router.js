const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', (req, res) => {
    console.log(req.body);

    //  Need to hash passwords to stick in database
    const password1 = encryptLib.encryptPassword('a');
    
    console.log("password1: ", password1);
                            // pool.query('CREATE DATABASE "quotesify2_database";')
                            // .then((result) => {
                            // console.log("quotesify2_database created");
                pool.query(`
                CREATE TABLE "authorizations" (
                    "authorization_id" SERIAL PRIMARY KEY,
                    "type_of_company" VARCHAR (80) UNIQUE NOT NULL
                );
                
                INSERT INTO "authorizations" ("type_of_company")
                VALUES 
                ('Administrator'), ('Employer'), ('Broker'), ('Provider');
                
                
                --  Companies table lists companies and their associated authorizations
                CREATE TABLE "companies" (
                    "company_id" SERIAL PRIMARY KEY,
                    "name" VARCHAR (80) NOT NULL,
                    "authorization_id" INTEGER references authorizations
                );
                
                INSERT INTO "companies" ("name", "authorization_id")
                VALUES
                ('employer1', 2),
                ('employer2', 2),
                ('employer3', 2),
                ('employer4', 2),
                ('employer5', 2),
                ('employer6', 2),
                ('employer7', 2),
                ('employer8', 2),
                ('employer9', 2),
                ('broker1', 3),
                ('broker2', 3),
                ('broker3', 3),
                ('provider1', 4),
                ('provider2', 4),
                ('provider3', 4),
                ('administrator1', 1);
                
                
                --  The users table lists all the users 
                --  and references the company that employs them
                --  and through that company their authorization
                --  OF NOTE:  Companies have authorizations
                --  and not users, a user may only have one company
                --  and therefore one authorization with this database
                --  setup.
                
                CREATE TABLE "users" (
                    "user_id" SERIAL PRIMARY KEY,
                    "username" VARCHAR (80) UNIQUE NOT NULL,
                    "password" VARCHAR (1000) NOT NULL,
                    "company_id" INTEGER references companies
                );
                
                --  In the code passwords must be hashed/salted
                INSERT INTO "users" ("username", "password", "company_id")
                VALUES 
                ('employer1', '${password1}', 1),
                ('employer2', '${password1}', 2),
                ('employer3', '${password1}', 3),
                ('employer4', '${password1}', 4),
                ('employer5', '${password1}', 5),
                ('employer6', '${password1}', 6),
                ('employer7', '${password1}', 7),
                ('employer8', '${password1}', 8),
                ('employer9', '${password1}', 9),
                ('broker1', '${password1}', 10),
                ('broker2', '${password1}', 11),
                ('broker3', '${password1}', 12),
                ('provider1', '${password1}', 13),
                ('provider2', '${password1}', 14),
                ('provider3', '${password1}', 15),
                ('admin1', '${password1}', 16);
                
                
                --  Deal_statuses table lists the possible statuses
                --  for a deal which might be waiting for different
                --  steps to complete and might be represented
                --  as a graphic on the front end.
                
                CREATE TABLE "deal_statuses" (
                    "deal_status_id" SERIAL PRIMARY KEY,
                    "status" VARCHAR (80) UNIQUE NOT NULL
                );
                
                INSERT INTO "deal_statuses" ("status")
                VALUES 
                ('Awaiting data'), ('Ready for quote'), ('Data sent to provider');
                
                
                --  Deals table lists deals between 
                --  employers and brokers
                CREATE TABLE "deals" (
                    "deal_id" SERIAL PRIMARY KEY,
                    "employer_id" INTEGER references companies,
                    "broker_id" INTEGER references companies,
                    "date_email_sent_to_employer" DATE,
                    "deal_status_id" INTEGER references deal_statuses,
                    "csv_url" VARCHAR (1000) DEFAULT NULL
                );
                
                INSERT INTO "deals" ("employer_id", "broker_id", "date_email_sent_to_employer", "deal_status_id")
                VALUES 
                (1, 10, '01-01-2018', 1),
                (2, 10, '01-02-2018', 2),
                (3, 10, '01-03-2018', 3),
                (4, 11, '01-01-2018', 1),
                (5, 11, '01-02-2018', 2),
                (6, 11, '01-03-2018', 3),
                (7, 12, '01-01-2018', 1),
                (8, 12, '01-02-2018', 2),
                (9, 12, '01-03-2018', 3);
                
                --  Quotes table lists quotes for a deal (between a 
                --  broker and an employer) from a provider
                CREATE TABLE "quotes" (
                    "quote_id" SERIAL PRIMARY KEY,
                    "provider_id" INTEGER references companies,
                    "deal_id" INTEGER references deals,
                    "date_data_sent_to_provider" DATE,
                    "date_of_provider_decision" DATE DEFAULT NULL,
                    "sent_to_provider" BOOLEAN DEFAULT FALSE,
                    "decision_complete" BOOLEAN DEFAULT FALSE,
                    "provider_response_message" VARCHAR (1000) DEFAULT NULL,
                    "provider_response_file_location" VARCHAR (1000) DEFAULT NULL
                );
                
                INSERT INTO "quotes" (
                    "provider_id", 
                    "deal_id", 
                    "date_data_sent_to_provider",
                    "date_of_provider_decision", 
                    "sent_to_provider",
                    "decision_complete", 
                    "provider_response_message", 
                    "provider_response_file_location")
                    VALUES 
                    (13, 3, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Approved', 'www.google.com'),
                    (14, 3, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Denied:  Need more info', 'www.google.com'),
                    (15, 3, '01-04-2018', NULL, TRUE, FALSE, NULL, NULL),
                    (13, 6, '01-04-2018', NULL, TRUE, FALSE, NULL, NULL),
                    (14, 6, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Approved', 'www.google.com'),
                    (15, 6, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Denied:  Need more info', 'www.google.com'),
                    (13, 9, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Denied:  Need more info', 'www.google.com'),
                    (14, 9, '01-04-2018', NULL, TRUE, FALSE, NULL, NULL),
                    (15, 9, '01-04-2018', '01-05-2018', TRUE, TRUE, 'Approved', 'www.google.com');
                    
                
                --  Employee table contains all uploaded datasets of employees
                --  for all deals
                
                
                CREATE TABLE "employees" (
                    --  +++++++++++++++++++++++++++++
                    --  Change company to user please
                    --  +++++++++++++++++++++++++++++
                    "company" INTEGER references users,
                    "employer_supplied_unique_id" INTEGER DEFAULT NULL,
                    "date_of_birth" VARCHAR,
                    "date_of_hire" VARCHAR,
                    "union_status" VARCHAR, 
                    "salary_per_year" VARCHAR, 
                    "gender" VARCHAR (80), 
                    "status" VARCHAR (80), 
                    "state" VARCHAR (80),
                    "role" VARCHAR (80),
                    "employer_supplied_company_code" VARCHAR,
                    "is_valid" BOOLEAN DEFAULT FALSE
                );
                
                
                
                
                INSERT INTO "employees" (
                    --  +++++++++++++++++++++++++++++
                    --  Change company to user please
                    --  +++++++++++++++++++++++++++++
                    "company",
                 
                    "employer_supplied_unique_id",
                    "date_of_birth",
                    "date_of_hire",
                    "union_status",
                    "role", 
                    "salary_per_year", 
                    "gender", 
                    "status", 
                    "state",
                    "employer_supplied_company_code",
                
                    "is_valid"
                )
                
                VALUES 
                (1, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (1, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (1, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (1, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (2, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (2, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (2, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (2, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (3, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (3, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (3, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (3, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (4, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (4, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (4, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (4, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (5, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (5, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (5, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (5, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (6, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (6, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (6, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (6, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (7, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (7, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (7, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (7, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (8, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (8, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (8, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (8, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE ),
                
                (9, 6902, '05-06-1972', '08-14-2012', 'FALSE', 'quality assurance', '63487', 'male', 'Active', 'Alabama', '103', TRUE),
                (9, 6903, '05-07-1972', '08-15-2013', 'FALSE', 'qa', '6347', 'male', 'Active', 'Alabama', '103', TRUE),
                (9, 2481, '05-06-1984', '08-14-2010', 'TRUE', 'CEO', '245621', 'other', 'Active', 'Vermont', '205', TRUE ),
                (9, 8765, '05-06-1990', '08-14-2014', 'TRUE', 'Attorney', '48888', 'NA', 'Active', 'MN', '056', TRUE );     
                `
                )
                .then((result) => {
                console.log("tables created and filled")})
                .catch((error) => {
           console.log(`Error `, error);
           res.sendStatus(500); // Good server always responds
                            // })
                            // .catch((error) => {
                            // console.log(`Error making new database `, error);
                            // res.sendStatus(500); // Good server always responds
        });

});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => { 
    console.log('router.post to add a company to companies table,  File:  user.router, URL: /register');
  
    // all registered users belong to a company; 
    console.log('VALUES FOR ALL TABLES', req.body);
    console.log('VALUES FOR COMPANIES TABLE');  
    const name = req.body.company_name;
    const authorization_id = req.body.authorization_id;
    const queryText = 'INSERT INTO "companies" (name, authorization_id) VALUES ($1, $2) RETURNING company_id';
    pool.query(queryText, [name, authorization_id])
      .then((result) => { 
        // adds company to user table creating login with provided email and a password
        const company_id = parseInt(result.rows[0].company_id);
        const username = req.body.username;
        const password = encryptLib.encryptPassword(req.body.password);
        console.log('VALUES FOR USER TABLE', company_id, username, password)
        const queryText2 = 'INSERT INTO "users" ( username, password, company_id ) VALUES ($1, $2, $3) RETURNING company_id;';
        pool.query(queryText2, [username, password, company_id])
         .then((result) => {
          // all employers belong to a deal 
          // check to make sure user has the correct authorization to be an employer
          if (authorization_id === 2){
            // the brokers compnay id is inserted into the Deals table colunm broker_id
            const broker_id = req.body.broker_id;
            // the employers company id is inserted into the Deals table colunm employer_id 
            const company_id = parseInt(result.rows[0].company_id);
            // adding the date the email with the login values was sent to a new Employer
            const date = new Date();
            // add pending value to deals table
            const deal_status_id = 1;
            // const date = req.body.date_sent;
            console.log('VALUES FOR DEAL TABLE', broker_id, company_id, date, deal_status_id)
            const queryText3 = 'INSERT INTO "deals" ( broker_id, employer_id, date_email_sent_to_employer, deal_status_id ) VALUES ($1, $2, $3, $4);';
            pool.query(queryText3, [broker_id, company_id, date, deal_status_id])
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


module.exports = router;