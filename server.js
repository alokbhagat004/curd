var express = require('express');
var morgon = require('morgan')('dev')
var bodyParser = require('body-parser')
var properties = require('./config/properties');
var db = require('./config/database');
var herosRoutes = require('./heros/heros.routes');
var authRoutes = require('./auth/auth.routes');
var productRoutes = require('./products/products.routes');
const expressJwt = require('express-jwt');
jwt    = require('jsonwebtoken');   
app = express();
app.set('Secret', properties.secret);
app.use(expressJwt({secret: properties.secret}).unless({path: ['/auth/signup','/auth/login']}));
//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();
db();
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(expressJwt({secret: properties.secret, credentialsRequired: false}), function (error, req, res, next) {
 if(error) {
        var response  = {
          "Error" : {
              "ErrorCode" : '11', 
              "ErrorMessage" : error.message
          }
      }
      res.status(error.status).json(response);
      return;
    }
});

// Error handling
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.headers['x-access-token'] || req.headers['authorization']){
      let token = req.headers['x-access-token'] || req.headers['authorization'];
      if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
      }
      if (token) {
          jwt.verify(token, app.get('Secret'), (err, decoded) => {
            if (err) {
            return res.json(
              {
                "Error" : {
                    "ErrorCode" : '11', 
                    "ErrorMessage" : err.message
                }
            });
            } else {
                  app.set('UserID', decoded.UserID);
                  return;
            }
          });
      } 
    }

    if(req.method ==='OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // Method to match the domain you will make the request from
        return res.status(200).json({});
    }
    
    next();
 });

// use express router
app.use('/api',router);
app.use('/auth',router);
app.use('/product',router);
app.get('/',function(req,res){
    res.json({
        message : "Welcome to Api Development"
    })
})
//call heros routing
herosRoutes(router);
authRoutes(router);
productRoutes(router);

app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})
