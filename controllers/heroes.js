const User = require('../models/user');
const Hero = require('../models/hero');
const { render } = require('ejs');

module.exports = {
    index,
    show,
    newHero,
    create,
    edit,
    update,
    delHero
};

function index(req, res) {
    Hero.find({}, function(err, heroes) {
        res.render('heroes/index', { heroes });
    })
}

function newHero(req, res) {
    res.render('heroes/new');
}

function show(req, res) {
    Hero.findById(req.params.id, function(err, hero) {
        res.render('heroes/show', { title: `${hero.name}`, universe: `${hero.universe}`, hero });
    });
}  

function create(req, res) {
    const hero = new Hero(req.body);
    hero.user = req.user._id;
    hero.save(function(err) {
        if (err) return render('hero/new');
        res.redirect(`/heroes/${hero._id}`);
    })
}

function edit(req, res) {
    Hero.findById(req.params.id, function(err, hero) {
        res.render('heroes/edit', {hero});
    })
}

function update(req, res) {
    Hero.findByIdAndUpdate(req.params.id, req.body, function(err, hero) {
        if (err){
            res.render(`heroes/${hero._id}/edit`, {hero});
        } else {
            res.redirect(`/heroes/${hero._id}`);
        }
    })
}

function delHero(req, res) {
    Hero.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            res.render('heroes/edit');
        } else {
            res.redirect('/heroes');
        }
    })
}