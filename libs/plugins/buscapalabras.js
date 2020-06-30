let fetch = require('node-fetch');

// Inspirado y basado en el sitioweb buscapalabras.com.ar

let baseUrl = `https://buscapalabras.com.ar`;

let buscapalabras = {

   silabas: async function ({ palabra, options, callback }) {
      let endpoint = `${baseUrl}/silabas.php`;

      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("p", palabra);
      data.append("s", "Separar en sílabas");

      var config = {
         method: "post",
         url: endpoint,
         async: false,
         headers: {
            ...data.getHeaders()
         },
         data: data
      };

      let content = await axios(config)
         .catch(function (error) {
            console.log(error);
         });


      let html = content.data || '';
      h2 = /<h2>([^°]*)<\/h2>/g.exec(html);
      let silabas = h2[0].match(/<b>(.*)<\/b>/g);

      silabas = silabas[0]
         .replace(/<(\/?)span([^>]*)>/gi, '')
         .replace(/<em>([^<]*)<\/em>/gi, f => f.toUpperCase())
         .replace(/<([^<]*)>/gi, '')
         ;

      let ega = 'AGESSSSSSSSSSSS'[
         (
            silabas
               .split('-')
               .reverse()
         )
            .map((silaba, i) => silaba === silaba.toUpperCase())
            .indexOf(true)];

      let rima = silabas.slice(silabas.indexOf(silabas
         .split('-')
         .reverse()['AGESSSSSSSSSSSS'.indexOf(ega)]), 1000);

      let rimaC = rima
         .replace(/^(\w*)?([aeiouáéíóú])(.*)/ig, 'x$2$3');

      let masInfo = {
         ega,
         rima,
         rimaC,
         rimaA: rimaC.replace(/[^aeiouáéíóú-]/ig, 'x')
      };

      return {
         silabas,
         masInfo
      };
   },

   rimas: async function (palabra, options) {
      let endpoint = `${baseUrl}/rimas.php`;
   },

   anagramas: async function (palabra, options) {
      let endpoint = `${baseUrl}/palaras.php`;
   },

   sinonimos: async function (palabra, options) {
      let endpoint = `${baseUrl}/diccionario-sinonimos.php`;
   },

   antonimos: async function (palabra, options) {
      let endpoint = `${baseUrl}/diccionario-antonimos.php`;
   }

};

module.exports = buscapalabras;

