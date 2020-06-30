let router = require('express').Router();
let path = require('path');

router
   .get('/', (req, res, next) => {
      res
         .status(200)
         .sendFile(path.join(__dirname, '../views/index.html'));
   })

   .post('/silabas.php', (req, res, next) => {
      console.log({ req });
      res.send(`
         <h2>Probando 123</h2>
      `);
   })

   .use('/pnlp', require('./pnlp'))

   ;

module.exports = router;