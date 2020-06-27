const nlp = require('lorca-nlp');
const fs = require('fs');

module.exports = (req, res, next) => {

   let desde = 12, hasta = 31;

   let inputContentFile = './data/sampleContent.txt';
   let raw = fs.readFileSync(inputContentFile)
      .toString()
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

      let metrica = nlp(oracionmetrica).syllables().get().length;
      let ultima = nlp(oracion).words().get().pop();

      analisis[i] = [
         oracion,
         metrica,
         ultima
      ];
   });

   res.json({
      analisis
   });
};