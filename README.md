# Burrito Shop API

APIs to support point of sales and ordering system.

Implemented all except Solana/Etherium.
Unfortunetely not able to build docker image due to Mongodb in-memory server errors.
Including Docker file that let you built and even run the app but then get errors trying to download needed db libs.
Reason for using in-memory MongoDB:
1) Demonstrate more realistic API
2) Using document model eliminate need for relational schema
   This creates easy to manage isolated only 2 entities Products and Orders.
   Can be easily moved to separate microservices without dependency on each other.

## Getting Started

### Dependencies

* Requires NodeJS
* Requires NPM 

### Installing

* Download from git: https://github.com/ilapsker/burrito-shop-api.git
* Install by running: npm install 

### Run unit and integration tests

* npm test
* tests including mockup data located under tests directory
* integration tests require localhost and port configured in env

## Running application

* Configured in env to run as http://localhost:3000
* POST /api/orders protected by x-api-key and TEST_API_KEY value located in env file
* burritos products initial data located in /data directory
* sample data for posting tests/mock-data
* npm start

## Authors

Ilya Lapsker ilya@ilya.nyc
