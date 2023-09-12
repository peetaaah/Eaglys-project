# Welcome to the Eagyls Take Home project!

 As per the instructions:


 > Objective: Create a simple web application where users can input PostgreSQL SQL queries, and the application should display the modified SQL with hashed column names and the map.

here you will see 2 different folders: client and server.


### Client
Client folder serves as the frontend for the project.
- It's written in React, and it's a simple 1 page UI.
- Base stack is simply using Vite and TailwindCSS, because I like how quickly I can create a frontend project with these.


To start,
1. navigate to the `/client` folder
2. Run `npm install`
3. Run `npm run dev`
4. You'll see something like this in your terminal: 
`VITE v4.4.9  ready in 862 ms`
`➜  Local:   http://127.0.0.1:5173/`
`➜  Network: use --host to expose`
`➜  press h to show help`
That's when you know you're ready.

5. Access the frontend with `localhost:5173`


## Main application

### Server
As the name implies, this is simply the server running the project.
- Written in NodeJS
- For the parser, I'm using the [node-sql-parser](https://www.npmjs.com/package/node-sql-parser).
 
To start:
1. Navigate to the `/server` folder
2. run `npm install`
3. run `npm run start`
4. You'll see something like this on the terminal:
`> server@1.0.0 start`
`> nodemon server.js`
`[nodemon] 3.0.1`
`[nodemon] to restart at any time, enter `rs``
`[nodemon] watching path(s): *.*`
`[nodemon] watching extensions: js,mjs,cjs,json`
`[nodemon] starting `node server.js``
`Server is running on port 4000`

5. Once you see the server running on port 4000, the NodeJS server is ready to receive your request from the frontend!
 
## Packaging for the cloud

An important part of modern day applications would be to containerize it and ship it to the cloud. To do that, you'll need to know how docker runs, or at least, know how to package it and run it.

Assuming you have [Docker](https://www.docker.com/) installed:

### Building the Client
To package the client dockerfile for usage, run the following:
1. navigate to the `/client`  folder
2. run `docker build -t frontend .`
3. Then, run `docker run -p 3000:3000 frontend` (optional, see docker-compose)

### Building the Server
To package the server dockerfile for usage, run the following:
1. navigate to the `/server` folder
2. run `docker build -t server .`
3. Then, run `docker run -p 4000:4000 server` (optional, see docker-compose)


### Building with docker-compose
In the root folder, you'll see a `docker-compose.yml` file.
In order to run the containers after building the individual containers:
1. navigate to the root directory
2. run `docker-compose up -d`, where the `-d` flag means running the containers in the background.
3. To shut it down, run `docker-compose down`

### Finally, sending it off to the cloud.

In this example, we'll be using AWS.

There are quite a few other steps to do, such as setting up your access key, secret access key, cluster setup etc which will not be covered here.

Assuming you already have the AWS CLI installed:
1. Configure your ECS-CLI 
`ecs-cli configure --cluster <your-cluster-name> --region <your-region-name>`
2. After the configuration, you can then run this command:
`ecs-cli compose --project-name <project-name> service up`



## Testing

For the backend, there is a sample test set up for
1. Creating and stoping the server
2. Running a test where the SQL should be modified and return it, alongside the column map.

To run it, simply do the following:
1. Navigate to the `/server` folder
2. run `npm i`
3. In your terminal, run `npx mocha tests/server.test.js`
4. You will see this in the terminal:
`Server is running on port 4000`
`Starting test...`
`Sending request...`
` ✔ it should modify SQL and return the modified SQL and column map`
`server done here`
`1 passing (12ms)`
That means that the testing is successful.
if you see 0 passing, means that the testing has failed, and we'll need to check where it has gone wrong.


## Points to improve in the take home
1. Time. If I had more time I would have added a functional sqlite database inside. 
2. More test cases than just 1 in the `test.server.js` file.