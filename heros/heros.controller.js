var Heros = require('./heros.doa')

exports.createHero = function(req, res, next){
    var hero ={
        name : req.body.name,
        description : req.body.description
    };

    Heros.create(hero,function(err, hero){
        if(err){
            res.json({
                error : err
            })
        }
        const payload = {
            check:  true
          };
          var token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 14400 // expires in 24 hours
          });

        
        res.json({
            token : token,
            message : "Created Sucessfully"
        })
    })
} 

exports.getHeros = function (req, res, cb){
    Heros.get({},function(err,heros){
        if(err){
            res.json({
                error:err
            })
        }
        res.json({
            heros: heros
        })
    })
}

exports.getHero = function (req,res,cb){
    Heros.get({name:req.params.name},function(err,hero){
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


exports.updateHero = function (req,res,cb){
    Heros.get({name:req.params.name},function(err,hero){
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
