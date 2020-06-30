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
   let analisis = [];

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
            metrica: metrica +
               `${(BP_silabas.masInfo.ega == 'A' ? ' + 1' : '')}` +
               `${('ES'.includes(BP_silabas.masInfo.ega) ? ' - 1' : '')}`,
            acentuacion: BP_silabas.masInfo.ega,
            rima: BP_silabas.masInfo.rima,
            rimaC: BP_silabas.masInfo.rimaC,
            rimaA: BP_silabas.masInfo.rimaA,
            // tipoR: '?',
            tipoRC: '?',
            tipoRA: '?'
         });
      });
   };

   await start();

   console.log({ analisis });

   //let analisisR1 = pnlp.analisisRimas(analisis, 'rima', 'tipoR');
   let analisisR2 = pnlp.analisisRimas(analisis, 'rimaC', 'tipoRC');
   let analisisR3 = pnlp.analisisRimas(analisisR2, 'rimaA', 'tipoRA');

   let swC = true;
   let analisisMostrar = analisisR3.map((linea, i) => {
      swC = (i % 4 === 0) ? !swC : swC;
      let color = swC ? 'white' : 'grey';
      return `<span style='color:${color}'>` + (
         [
            linea.oracion.trim().padEnd(50, ' '),
            linea.tipoRA,
            linea.metrica.trim().padEnd(6, ' '),
            linea.rimaA
         ].join('  ')
      )
         + '</span>';
   });

   res.json({
      analisisMostrar
   });

};