var express = require('express');
var router = express.Router();
var Hero = require('../models/hero');

router.get('/', function(req, res, next) {
  res.send('Hello, World!');
});

// *** api routes *** //
router.get('/heroes', findAllHeros);
router.get('/hero/:id', findHeroById);
router.post('/heroes', addHero);
router.put('/hero/:id', updateHero);
router.delete('/hero/:id', deleteHero);


// *** get ALL heroes *** //
function findAllHeros(req, res) {
  Hero.find(function(err, heroes) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(heroes);
    }
  });
}

// *** get SINGLE heroes *** //
function findHeroById(req, res) {
  Hero.findById(req.params.id, function(err, hero) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(hero);
    }
  });
}

// *** post ALL heroes *** //
function addHero(req, res) {
  var newHero = new Hero({
    name: req.body.name,
    lastName: req.body.lastName
  });
  newHero.save(function(err) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json({'SUCCESS': newHero});
    }
  });
}

// *** put SINGLE hero *** //
function updateHero(req, res) {
  Hero.findById(req.params.id, function(err, hero) {
    hero.name = req.body.name;
    hero.lastName = req.body.lastName;
    hero.save(function(err) {
      if(err) {
        res.json({'ERROR': err});
      } else {
        res.json({'UPDATED': hero});
      }
    });
  });
}

// *** delete SINGLE hero *** //
function deleteHero(req, res) {
  Hero.findById(req.params.id, function(err, hero) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      hero.remove(function(err){
        if(err) {
          res.json({'ERROR': err});
        } else {
          res.json({'REMOVED': hero});
        }
      });
    }
  });
}

module.exports = router;
