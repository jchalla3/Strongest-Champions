const User = require('../models/user');
const Hero = require('../models/hero');

module.exports = {
    create,
    edit,
    update,
    delBio
};

function create(req, res) {
    Hero.findById(req.params.id, function(err, hero) {
        req.body.user = req.user;
        hero.bios.push(req.body);
        hero.save(function(err) {
            res.redirect(`/heroes/${hero._id}`);
        })
    })
};

function edit(req, res) {
    Hero.findById(req.params.cid, function(err, hero) {
        let bioArray = hero.bios.filter(f => f._id == req.params.rid)
        let bio = bioArray[0];
            res.render('bios/edit', {hero, bio, user:req.user._id});
    })
}

function update(req, res) {
    Hero.findById(req.params.heroId, function(err, hero){
        hero.bios.map(bio => {
            if (bio._id == req.params.bioId){
                bio['text'] = req.body.text
            }
            return bio
        })
        hero.save(function(err){
            res.redirect(`/heroes/${req.params.heroId}`)
        })
    })
};

function delBio(req, res) {
    Hero.findById(req.params.heroId, function(err, hero) {
        hero.bios.id(req.params.bioId).remove()
        hero.save(function(err) {
            res.render('heroes/show', { title: `${hero.name}`, universe: `${hero.universe}`, hero})  
        })
    })
};
