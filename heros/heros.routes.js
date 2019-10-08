var Heros = require('./heros.controller')

module.exports= function (router){
    router.post('/create',Heros.createHero);
    router.get('/get',Heros.getHeros);
    router.get('/get/:name',Heros.getHero);
}