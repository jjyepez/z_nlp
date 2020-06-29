const nlp = require('lorca-nlp');

let pnlp = {

   silabasParaMetrica: function (oracion) {
      let silabas = nlp(oracion).syllables().get();

      let newSilabas = [];
      silabas.forEach((silaba, i) => {
         if (newSilabas.length === 0) {
            newSilabas.push(silaba);
            return;
         }

         let newI = newSilabas.length - 1;

         let vocales = 'aeiuoáéíóúhy';
         let silabaanterior = silabas[i - 1];
         let primeraletrasilaba = silaba.slice(0, 1);
         let ultimaletrasilabaanterior = silabaanterior.slice(-1);
         if (
            (
               vocales.indexOf(ultimaletrasilabaanterior) >= 0 &&
               vocales.indexOf(primeraletrasilaba) >= 0 &&
               !/y.+/.test(silaba)
            ) &&
            (
               'h' + ultimaletrasilabaanterior !== silaba.slice(0, 2)
            )
         ) {
            newSilabas.pop();
            newSilabas.splice(newI, 0, silabaanterior + silaba);
         } else {
            newSilabas.push(silaba);
         }
      });

      return newSilabas;
   },

   metricaOracion: function (oracion) {
      let metrica = 0;
      let newSilabas = this.silabasParaMetrica(oracion);
      metrica = newSilabas.length;
      return metrica;
   }

};

module.exports = pnlp;