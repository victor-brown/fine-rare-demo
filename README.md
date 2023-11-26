# To use the appplication:
Setup MongoDB, and fill out a .env file based on the .env.example

> You need to have at leas node v16.4.1 installed

Run the following commands:

- $ `npm i`
- $ `npm run start:dev`
  
or

- $ `npm i`
- $ `npm run build`
- $ `node dist/src/index.js`

open http://localhost:5000/graphql

If you setup `NODE_ENV = "dev"` you will have graphiql.

>NOTE: processCSV mutation WIP
