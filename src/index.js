const glob = require("glob");

let file = glob.sync("./router/*.js");
console.log("🚀 ~ file: index.js ~ line 4 ~ file", file);
console.log(__dirname);

const files = glob.sync("./electron/main-process/**/*.js");
console.log("🚀 ~ file: index.js ~ line 8 ~ files", files);
