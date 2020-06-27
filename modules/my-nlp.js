let fs = require('fs');

let nlp = require('lorca-nlp');
let pnlp = require('../libs/lorca/plugins/pnlp');

module.exports = (req, res, next) => {

   let desde = 421, hasta = 1000;

   let inputContentFile = './data/sampleContent.txt';
   let raw = fs.readFileSync(inputContentFile)
      .toString()
      .replace(/\./g, ',')
      ;

   let texto = nlp(raw);

   let oraciones = texto
      .sentences()
      ;

   let analisis = {};
   oraciones.get().map((oracion, i) => {

      if (i < desde || i > hasta) {
         return null;
      }

      let oracionmetrica = oracion
         ;

      let metrica = pnlp.metricaOracion(oracion);
      let ultima = nlp(oracion).words().get().pop();

      analisis[i] = [
         oracion,
         pnlp.silabasParaMetrica(oracion).join('-'),
         metrica,
         ultima
      ];
   });

   res.json({
      analisis
   });
};