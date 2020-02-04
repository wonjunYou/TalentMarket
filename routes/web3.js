var express = require('express');
var router = express.Router();
const catchErrors = require('../lib/async-error');
const Category = require('../models/category');
const Web3 = require('web3');
const Product = require('../models/product');

let abi;
let myContract;
let contractAddress; 

let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/1aaf0adf6b8c495190259f11e9f997ea"));
/* GET users listing. */
abi =[
  {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "internalType": "uint256",
              "name": "x",
              "type": "uint256"
          }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  }
];

contractAddress = "0x6f8A9D13E53ca21fb644AC8a38B73FA8cE6B2660";

router.post('/', catchErrors(async(req, res, next) =>  {
  let value;
  myContract = await new web3.eth.Contract(abi, contractAddress);
  await myContract.methods.set(123).send({ from:"0x8225D7986904918825094eE92a950F565C7eEe6a"});
  value = await myContract.methods.get().call();

  res.render('products/webtest', {value:value});
}));

module.exports = router;
