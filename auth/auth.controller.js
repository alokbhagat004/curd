var Auth = require('./auth.doa')
var Bcrypt = require("bcryptjs")

exports.signup = function(req, res, next){
    var errorCode = 0;
    var errorMessage = "";
    var user ={
        name : req.body.name,
        password : Bcrypt.hashSync(req.body.password),
        role : req.body.role,
        description : req.body.description
    };
    Auth.create(user,function(err, user){
        if(!err){
            errorCode = 1;
            errorMessage = "Created Sucessfully";
        }else{
            errorCode = 0;
            errorMessage = err;
        }
        var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
            }
        }
        res.json(response)
    })
} 

exports.login = function (req, res, cb){
    var errorCode = 0;
    var errorMessage = "";
    var UserData = "";
    var token ="";
    Auth.getRow({
        name : req.body.name,
    },function(err,User){
        if(err){
             errorCode = 0;
             errorMessage = err;
        }
        //console.log(User)
        if(User){ 
            if(!Bcrypt.compareSync(req.body.password, User.password)) {
                 errorCode = 0;
                 errorMessage = "Invalid  Password!";
            }else{
                const payload = {
                    UserID: User._id
                  };
                  token = jwt.sign(payload, app.get('Secret'), {
                        expiresIn: 14400 // expires in 24 hours
                  });
        
                UserData = {
                    "name": User.name,
                    "role": User.role,
                    "description": User.description,
                } 
                errorCode = 1;
                errorMessage = "Success!";
            }
         } else{
                errorCode = 0;
                errorMessage = "Invalid Username!";
        }
        var response  = {
            "Error" : {
                "ErrorCode" : errorCode,
                "ErrorMessage" : errorMessage
            },
            "Result" : {
                "token": token,
                "UserData" : UserData 
            }
        }
        res.json(response)
    })
}

exports.updateHero = function (req,res,cb){
    Auth.get({name:req.params.name},function(err,hero){
        if(err){
            res.json({
                error:err 
            })
        }
        res.json({
            hero: hero
        })
    })
}
