const readline = require('readline');
const fetch = require("node-fetch");
const axios = require("axios");
const Filetype = require("file-type");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const random = () => {
  return `${Math.floor(Math.random() * 1e4)}`;
};

const start = async function () {
    console.clear();
    console.log("Hello, welcome to loli generator");
    console.log("\nKetik 'exit' untuk exit");
    console.log("\nMasukan jumlah foto loli yang ingin dicari")
    rl.question('\nCount :\t', async(input) => {
        let q = input;
        if (q === 'exit' || q === 'stop') {
            console.log('oke, bye!');
            process.exit();
        }
        await search(q).then(() => start())
    })
    const search = async(total) => {
      let jum = parseInt(total) || 5;
      let count = 1;
      for (let s = 0; s < jum; s++) {
      var a = await axios.get(`https://loli-api.glitch.me/api/v1/twintails`)
      var res = await fetch(a.data.url);
      var data = await res.buffer();
      let { ext } = await Filetype.fromBuffer(data);
      var namafile = random()
      fs.promises.writeFile(`./${namafile}.${ext}`, data, { encoding: 'base64' });
      console.log(`[Success]`, count++, 'Done');
    }
  }
}

start()