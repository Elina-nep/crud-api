## crud-api app

#### to run in developer mode: npm run start:dev

#### to run in developer mode: npm run start:prod

#### to run tests: npm run test

Please, check the app using postman

App should create server on localhost:4000

### commands to test:

#### GET api/users

get list of users in base

#### GET api/users/{UserId}

get user with {UserId}

#### POST api/users

creates user, returns user data including id
body:
{"username": "User",
"age": 30,
"hobbies": ["coding"]
}

#### PUT api/users/{UserId}

changes data of user with {UserId}. Fields are optional
body:
{"username"?: "User",
"age"?: 30,
"hobbies"?: ["coding"]
}

#### DELETE api/users/{UserId}

deletes user from base
