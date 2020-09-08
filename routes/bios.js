var express = require('express');
var router = express.Router();

const biosCtrl = require('../controllers/bios');

router.post('/heroes/:id/bios', isLoggedIn, biosCtrl.create);

router.get('/heroes/:cid/bios/:rid', biosCtrl.edit);

router.put('/heroes/:heroId/bios/:bioId/update', biosCtrl.update);

router.delete('/heroes/:heroId/bios/:bioId/delete', biosCtrl.delBio);

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated() ) return next();
    res.redirect('/heroes#');
}

module.exports = router;