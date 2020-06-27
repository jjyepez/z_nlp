const nlp = require('lorca-nlp');

let raw = `
Había una vez una vaca
en la Quebrada de Humahuaca.
Como era muy vieja, muy vieja, 
estaba sorda de una oreja.

Y a pesar de que ya era abuela
un día quiso ir a la escuela.
Se puso unos zapatos rojos,
guantes de tul y un par de anteojos.

La vio la maestra asustada
y dijo: – Estas equivocada.
Y la vaca le respondió:
¿Por qué no puedo estudiar yo?

La vaca, vestida de blanco,
se acomodó en el primer banco.
Los chicos tirábamos tiza
y nos moríamos de risa.
La gente se fue muy curiosa
a ver a la vaca estudiosa.
La gente llegaba en camiones,
en bicicletas y en aviones.

Y como el bochinche aumentaba
en la escuela nadie estudiaba.
La vaca, de pie en un rincón,
rumiaba sola la lección.

Un día toditos los chicos
se convirtieron en borricos.
Y en ese lugar de Humahuaca
la única sabia fue la vaca.
`
   //.replace(/(\.)\n/, '$1\n{sep}')
   .replace(".", "")
   //.replace(',', ",\n")
   ;

let texto = nlp(raw);

let oraciones = texto.sentences();

let analisis = {};
oraciones.get().map((oracion, i) => {
   let oracionmetrica = oracion
      ;
   let metrica = nlp(oracionmetrica).syllables().get().length;
   let ultima = nlp(oracion).words().get().pop();
   analisis[i] = [
      oracion,
      //oracionmetrica, JSON.stringify(nlp(oracionmetrica).syllables().get()),
      metrica,
      ultima
   ];
});

console.log({
   analisis
});

/*
   REFs:
   https://www.lenguaje.com/cgi-bin/V2/sinonimos.php
      POST {in_word: 'palabra', locale:'ES'}
      Retorna HTML, del que se extrae ".well" (varios nodos)

*/