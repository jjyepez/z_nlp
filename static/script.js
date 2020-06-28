let btnProcesar = document.getElementById('btnProcess');

btnProcesar.addEventListener('click', (ev) => {
   ev.stopPropagation();
   let out = document.getElementById('output');
   let inputContent = document.getElementById('inputContent');

   out.innerHTML = 'processing ...';

   let urlProcess = 'http://localhost:5555/pnlp/process'
   let promise = httpRequest(urlProcess, {
      method: 'post',
      body: { input: inputContent.value }
   });
   promise
      .then((rslt) => {
         out.innerHTML = JSON.stringify(rslt, null, 2);
         console.log(rslt);
      })
      .catch(err => console.log(err));
});

function httpRequest(url, options = {}) {
   if (options.method === 'post') {
      headers = {
         "Content-type": "application/json"
      };
      if (options.body) options.body = JSON.stringify(options.body);
   }
   let params = {
      headers,
      ...options
   };
   console.log({ params });
   return fetch(url, params)
      .then(rslt => {
         let output;
         try {
            output = rslt.json();
         } catch (err) {
            output = {
               error: true,
               response: rslt.text()
            };
         }
         return output;
      });
}