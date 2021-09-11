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

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const start = async function () {
  console.clear();
  console.log("Hello, welcome to loli generator");
  console.log("\nType 'exit' for exit");
  console.log("\nList menu:\n\n1. loli\nFor search random loli\n\n2. waifu\nFor search random waifu's\n\n3. neko\nFor Search radndom nekonime\n\n4. foxgirl\nFor search random foxgirl")
  rl.question('\nSearch : ', async(input) => {
    let q = input;
    
    if (q.toLowerCase() === 'exit' || q.toLowerCase() === 'stop') {
      console.log('\noke bye!');
      process.exit();
    } else if (q.toLowerCase() === 'loli') {
      rl.question('\nCount : ', async(total) => {
        await loli(total).then(() => start())
      })
    } else if (q.toLowerCase() === 'waifu') {
      rl.question('\nCount : ', async(total) => {
        await waifu(total).then(() => start())
      })
    } else if (q.toLowerCase() === 'neko') {
      rl.question('\nCount : ', async(total) => {
        await neko(total).then(() => start())
      })
    } else if (q.toLowerCase() === "foxgirl") {
      rl.question('\nCount : ', async(total) => {
        await foxgirl(total).then(() => start())
      })
    } else {
      console.log("\nPilih sesuai list diatas kak :)")
      await sleep(2000)
      start()
    }
  })

  const waifu = async(total) => {
    var jum = parseInt(total) || 5;
    var count = 1;
    for (let s = 0; s < jum; s++) {
      var aa = ["waifu+kawai","waifu+aesthetic","waifu","new+waifu"]
      var a = await axios.get(`https://megayaa.herokuapp.com/api/pinterest?q=${pickRandom(aa)}`)
      var result = pickRandom(a.data.result)
      var res = await fetch(result);
      var data = await res.buffer();
      var {
        ext
      } = await Filetype.fromBuffer(data);
      var namafile = random()
      fs.promises.writeFile(`./${namafile}.${ext}`, data, {
        encoding: 'base64'
      });
      console.log(`[Success]`, count++, 'Done');
    }
  }

  const foxgirl = async(total) => {
    var jum = parseInt(total) || 5;
    var count = 1;
    for (let s = 0; s < jum; s++) {
      var res = await fetch("https://megayaa.herokuapp.com/api/akaneko/foxgirl")
      var data = await res.buffer();
      var {
        ext
      } = await Filetype.fromBuffer(data);
      var namafile = random()
      fs.promises.writeFile(`./${namafile}.${ext}`, data, {
        encoding: 'base64'
      });
      console.log(`[Success]`, count++, 'Done');
    }
  }

  const neko = async(total) => {
    var jum = parseInt(total) || 5;
    var count = 1;
    for (let s = 0; s < jum; s++) {
      var res = await fetch("https://megayaa.herokuapp.com/api/akaneko/neko")
      var data = await res.buffer();
      var {
        ext
      } = await Filetype.fromBuffer(data);
      var namafile = random()
      fs.promises.writeFile(`./${namafile}.${ext}`, data, {
        encoding: 'base64'
      });
      console.log(`[Success]`, count++, 'Done');
    }
  }

  const loli = async(total) => {
    var jum = parseInt(total) || 5;
    var count = 1;
    for (let s = 0; s < jum; s++) {
      var a = await axios.get(`https://loli-api.glitch.me/api/v1/twintails`)
      var res = await fetch(a.data.url);
      var data = await res.buffer();
      var {
        ext
      } = await Filetype.fromBuffer(data);
      var namafile = random()
      fs.promises.writeFile(`./${namafile}.${ext}`, data, {
        encoding: 'base64'
      });
      console.log(`[Success]`, count++, 'Done');
    }
  }
}

start()
