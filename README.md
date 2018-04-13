# salesDash

### Overview

This is an example application that serves an ExpressJS JSON api to a React client application. The React application is configured for a basic JWT authentication flow **WITHOUT** using redux. Great for those of you that are somewhat familiar with Node, Express, and Mongoose, but want to see an implementation of React + React Router with JWT authentication.

The React client app could easily be restructured to keep current user information in a Redux Store. Give it a shot!

### Installation + Development

1. `git clone` this repository to your local machine.

2. run `npm install` from the cloned repo directory.

3. create a `.env` file at the root of the application, adjacent to `server.js`.

   *The only environment variable you **have** to declare in development is `JWT_SECRET`*

   In the `.env` file, you can declare the following environment variables: `JWT_SECRET`, `MONGODB_URI`, and `PORT`. For example:

   ```
   JWT_SECRET=BOOOOOOOOOOOOOM
   MONGODB_URI=mongodb://localhost/react-express-jwt
   PORT=3001
   ```



4. It's recommended that you run the api server on port 3001 while developing locally, as the client app will default to port 3000.
5. Make sure `mongod` is running by running… ahem… `mongod`
6. From that point you can run the api server either by using `nodemon` or just running `node server.js`
7. Now for the client application. `cd client`
8. Install the client app's dependencies with `npm install`
9. From the client directory, run `npm start` to boot up the client application.
10. $$$ Profit

### Usage

It's common to identify the user making an authenticated request on the server side. In this application, the `verifyToken` middleware (declared in `/serverAuth.js`) decodes a provided token, and makes sure the request is coming from a valid user. When the user is validated, it is added to the `req` object as `req.user`. 

Here's an example of how you can access the 'current user' from the server side app, assuming a user is logged in and sending an authenticated request:

```javascript
const express = require('express')
const mySpecialRouter = new express.Router()

// JWT AUTH MIDDLEWARE:
const { verifyToken }  = require('../serverAuth.js')

const Comment = require('../models/Comment.js')

// all routes declared after this middleware require a token
mySpecialRouter.use(verifyToken)
mySpecialRouter.post("/comments", (req, res) => {
  // since this route succeeds 'verifyToken', it has the current user in req.user
  // so we can easily associate new mongo documents to the current user:
  Comment.create({ ...req.body, user: req.user }, (err, comment) => {
    if(err) return console.log(err)
    res.json({ success: true, message: "Comment created.", comment })
  })
})

module.exports = mySpecialRouter
```



### Technologies

- NodeJS + Express + Mongoose on the back
- React client application on the front
- React Router 4.*
- Milligram CSS so it doesn't look like garbage
- JSON Web Token authentication flow

### Important Notes

- While the Mongoose user schema enforces email uniqueness, there's no handler for duplicate user emails on the client side. (A user wouldn't know why they couldn't create their account if they came across this scenario).

### Big Issues 
- started with a larger model than needed and had to remove commisssion and refund/return objects from model and coded them in. 

## Sources 
- https://color.adobe.com/inspiration-color-theme-10666763/edit/?copy=true&base=2&rule=Custom&selected=1&name=Copy%20of%20inspiration&mode=rgb&rgbvalues=0.0392156862745098,0.10980392156862745,0.1568627450980392,0.2549019607843137,0.5176470588235295,0.5607843137254902,0.4470588235294118,0.6549019607843137,0.6392156862745098,0.592156862745098,0.7529411764705882,0.7176470588235294,0.9333333333333333,0.9137254901960784,0.8196078431372549&swatchOrder=0,1,2,3,4 
- https://emeeks.github.io/semiotic/#/semiotic/creatingbarchart 