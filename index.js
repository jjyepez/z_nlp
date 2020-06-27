

require('express')()
   .get('/', (req, res, next) => {
      require('./modules/my-nlp')(req, res, next);
   })
   .listen(5555, () => {
      console.log('http://localhost:5555');
   });

/*
   REFs:
   https://www.lenguaje.com/cgi-bin/V2/sinonimos.php
      POST {in_word: 'palabra', locale:'ES'}
      Retorna HTML, del que se extrae ".well" (varios nodos)

*/