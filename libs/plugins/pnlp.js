const nlp = require('lorca-nlp');

let pnlp = {

   silabasParaMetrica: function (oracion) {
      let silabas = nlp(oracion).syllables().get();

      let newSilabas = [];
      let justPop = false;
      silabas.forEach((silaba, i) => {
         if (newSilabas.length === 0) {
            newSilabas.push(silaba);
            return;
         }

         let newI = newSilabas.length - 1;

         let vocales = 'aeiuoáéóhy'; // se quitaron la í y la ú para evitar hiatos
         let silabaanterior = silabas[i - 1];
         let primeraletrasilaba = silaba.slice(0, 1);
         let ultimaletrasilabaanterior = silabaanterior.slice(-1);
         if (
            (
               vocales.indexOf(ultimaletrasilabaanterior) >= 0 &&
               vocales.indexOf(primeraletrasilaba) >= 0 &&
               !/y.+/.test(silaba) &&
               !/.+y/.test(silabaanterior) &&
               !'íú'.includes(ultimaletrasilabaanterior)
            ) &&
            (
               'h' + ultimaletrasilabaanterior !== silaba.slice(0, 2)
            ) && (
               !justPop
            )
            // &&
            // (
            //    !(/[aeiuoáéíóúhy]+/.test(silabaanterior)) &&
            //    !(/[aeiuoáéíóúhy]+/.test(silaba))
            // )
         ) {
            newSilabas.pop(); justPop = true;
            newSilabas.splice(newI, 0, silabaanterior + silaba);
         } else {
            justPop = false;
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