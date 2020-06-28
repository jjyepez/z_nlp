// let fs = require('fs');

let nlp = require('lorca-nlp');
let pnlp = require('../libs/lorca/plugins/pnlp');

module.exports = (req, res, next) => {
   let body = req.body || {};

   let desde = 0, hasta = 1000;

   // let inputContentFile = './data/sampleContent.txt';
   // let raw = fs.readFileSync(inputContentFile)
   //    .toString()
   //    .replace(/\./g, ',')
   //    ;

   let raw = body.input
      .replace(/\./g, ',')
      .replace(/\n/g, '\r\n')
      ;

   let texto = nlp(raw);

   let oraciones = texto
      .sentences()
      ;

   console.log(oraciones.get());

   let analisis = [];
   oraciones.get().map((oracion, i) => {

      if (i < desde || i > hasta) {
         return null;
      }

      let metrica = pnlp.metricaOracion(oracion);
      let ultima = nlp(oracion).words().get().pop();

      analisis[i] = [
         oracion,
         // pnlp.silabasParaMetrica(oracion).join('-'),
         ultima,
         metrica
      ];
   });

   res.json({
      analisis
   });
};