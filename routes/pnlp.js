let router = require('express').Router();

router
   .get('/', (req, res, next) => {
      require('../modules/my-nlp')(req, res, next);
   })

   .all('/process', (req, res, next) => {
      require('../modules/my-nlp')(req, res, next);
   })

   ;

module.exports = router;