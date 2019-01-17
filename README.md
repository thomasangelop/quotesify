# Quotesify
This is a tool that helps insurance companies, brokers, and employers. This app will manage employee data securely and simplify the process for employers to apply for health insurance packages. 

## Built With

* Node
* Express
* React
* Redux
* Redux-Saga
* Passport.js
* SQL
* Google Firebase

## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- Download or clone the code from this project's repository
- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Postico](https://eggerapps.at/postico/)
- [Nodemon](https://nodemon.io/)
- [Homebrew](https://brew.sh/)

### Nodemailer set up:
Allows for an email to be sent to users as they are registered

* create .env file
* Copy and paste into .env and replace the indicated:
    * YOUR_EMAIL_ADDRESS= REPLACE_WITH_YOUR_EMAIL_ADDRESS_HERE
    * PASSWORD_FOR_EMAIL= REPLACE_WITH_YOUR_EMAIL_ACCOUNT_PASSWORD_HERE

### Create Database
* Create a PostgreSQL database named `quotesify_database` in Postico.

### Install Dependencies & Run the Application
1. Run `npm install`
2. Start postgres if not running already by using `brew services start postgresql`
3. Run `npm run server`
4. Run `npm run client`

### Use The App
* Once the app loads with `npm run client`, click on the `About` button at the top of the page
* Click on the `Add Demo Data` button and this will populate Postgresql with the appropriate information.
* NOTE: If no data is displaying anywhere on the app, copy and paste the contents of database.sql into the SQL Query seciton of Postico and execute it all at once. Make sure that this is done in the database named `quotesify_database`

## App Page Screen Shots
### Demo Data Page
![Table](documentation/images/Demo_Data_Page.png)

### Login Page
![Table](documentation/images/Login_Page.png)

### Admin Page
![Table](documentation/images/Admin_Page.png)

### Employer Dashboard Page
![Table](documentation/images/Employer_Dashboard_Page.png)

### Employer Dashboard Upload CSV Page
![Table](documentation/images/Employer_Dashboard_Upload_CSV_Page.png)

### Broker Clients Page
![Table](documentation/images/Broker_Clients_Page.png)

### Broker Quotes Page
![Table](documentation/images/Broker_Quotes_Page.png)

### Provider Dashboard Page
![Table](documentation/images/Provider_Dashboard_Page.png)

### Provider Dashboard Page
![Table](documentation/images/Provider_Upload_Quote_Page.png)

### Software Engineers On This Project
- Dick Polipnick
- Jessica Stephens
- Malik Glass
- Peter Midthun
- Thomas Angelo Pinataro