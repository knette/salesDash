# salesDash

### Overview

I made this app for a friend's company who hasn't been reconciling their invoices because it drives them crazy.

### Technologies

- NodeJS + Express + Mongoose on the back
- React client application on the front
- React Router 4.*
- ReactStrap
- JSON Web Token authentication flow
- Semiotic Charts 

### Big Issues 
- started with a larger model than needed and will need to remove commisssion and refund/return objects from model and code them in. 
- Only admin users can see sales. 
- Need to restrict access to login/signup pages when someone is already logged in

### Plannned Features 
- making the model smaller and hard coding refund and commission features into app 
- CSV upload
- API data pulls from retailers 

## Sources 
- [Color Scheme](https://color.adobe.com/inspiration-color-theme-10666763/edit/?copy=true&base=2&rule=Custom&selected=1&name=Copy%20of%20inspiration&mode=rgb&rgbvalues=0.0392156862745098,0.10980392156862745,0.1568627450980392,0.2549019607843137,0.5176470588235295,0.5607843137254902,0.4470588235294118,0.6549019607843137,0.6392156862745098,0.592156862745098,0.7529411764705882,0.7176470588235294,0.9333333333333333,0.9137254901960784,0.8196078431372549&swatchOrder=0,1,2,3,4)
- [Charts](https://emeeks.github.io/semiotic/#/semiotic/creatingbarchart)

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