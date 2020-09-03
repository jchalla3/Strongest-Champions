const heroes = require("../models/heroes");


    hero.user = req.user._id;
    hero.save(function(err){
        if (err) return('Error');
        res.redirect(`/heroes/${hero._id}`);
    });

    function edit(req, res) {
        Hero.findById(req.params.id, function(err, hero) {
          // Verify book is "owned" by logged in user
          if (!hero.user.equals(req.user._id)) return res.redirect('/heroes');
          res.render('heroes/edit', {hero});
        });
      }

      function addReading(req, res) {
        Hero.findById(req.params.id, function(err, hero) {
          // Ensure that user is not already in usersReading
          // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
          if (hero.usersReading.id(req.user._id)) return res.redirect('/heroes');
          hero.usersReading.push(req.user._id);
          hero.save(function(err) {
            res.redirect(`/heroes/${hero._id}`);
          });
        });
      }

      function allBooks(req, res) {
        // Make the query object to use with Book.find based upon
        // if the user has submitted via a search form for a book name
        let heroQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
        Hero.find(heroQuery, function(err, heroes) {
          // Why not reuse the books/index template?
          res.render('/heroes/index', {
            heroes,
            user: req.user,
            nameSearch: req.query.name  // use to set content of search form
          });
        });
      }

