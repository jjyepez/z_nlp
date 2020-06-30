// let fs = require('fs');

let nlp = require('lorca-nlp');
let pnlp = require('../libs/plugins/pnlp');

let buscapalabras = require('../libs/plugins/buscapalabras');

module.exports = async (req, res, next) => {
   let body = req.body || {};

   let desde = 0, hasta = 1000;

   let raw = body.input
      .replace(/\./g, ',')
      .replace(/\n/g, '\r\n')
      ;

   let texto = nlp(raw);

   let oraciones = texto
      .sentences()
      ;

   let arrOraciones = oraciones.get();
   let analisis = [0];

   const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
   const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
         await callback(array[index], index, array)
      }
   };

   const start = async () => {
      await asyncForEach(arrOraciones, async (oracion) => {
         await waitFor(150);
         let metrica = pnlp.metricaOracion(oracion);
         let ultima = nlp(oracion).words().get().pop();

         let BP_silabas = await buscapalabras.silabas({ palabra: ultima });

         console.log({ BP_silabas });

         analisis.push({
            oracion,
            silabasM: pnlp.silabasParaMetrica(oracion).join('-'),
            ultima,
            silabas: BP_silabas.silabas,
            acentuacion: BP_silabas.masInfo.ega,
            rima: BP_silabas.masInfo.rima,
            metrica: metrica
               + `${(BP_silabas.masInfo.ega == 'A' ? ' + 1' : '')}`
               + `${('ES'.includes(BP_silabas.masInfo.ega) ? ' - 1' : '')}`
         });
      });
      console.log('Done');
   };

   await start();

   console.log({ analisis });

   res.json({
      analisis
   });

};