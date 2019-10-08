var Auth = require('./auth.controller')

module.exports= function (router){
    router.post('/signup',Auth.signup);
    router.post('/login',Auth.login);
    //router.get('/get/:name',Heros.getHero);
}