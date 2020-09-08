var express = require('express');
var router = express.Router();
const heroesCtrl = require('../controllers/heroes');


router.get('/', heroesCtrl.index);

router.get('/new', isLoggedIn, heroesCtrl.newHero);

router.get('/:id', isLoggedIn, heroesCtrl.show);

router.post('/', isLoggedIn, heroesCtrl.create);

router.get('/:id/edit', isLoggedIn, heroesCtrl.edit);

router.put('/:id', isLoggedIn, heroesCtrl.update);

router.delete('/:id', isLoggedIn, heroesCtrl.delHero);


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() ) return next();
    res.redirect('/heroes');
}



module.exports = router;