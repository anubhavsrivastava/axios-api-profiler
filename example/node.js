let axios = require("axios");

//need to build parent module before importing this
let axProfiler = require("../dist/index").default;

axProfiler(axios);

axios.get('http://www.mocky.io/v2/5ed51f163300004c00f7a822') 