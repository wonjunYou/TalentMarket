let myContract;
let userAccounts;
const abi = [
          {
            "anonymous": false,
            "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "seller",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "tradeId",
                  "type": "uint256"
                }
            ],
            "name": "requestedAgree",
            "type": "event"
          },
          {
            "constant": true,
            "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_talId",
                  "type": "uint256"
                }
            ],
            "name": "getTalent",
            "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
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
            "constant": true,
            "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_trId",
                  "type": "uint256"
                }
            ],
            "name": "getTrade",
            "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                },
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
                  "name": "_trId",
                  "type": "uint256"
                }
            ],
            "name": "requestAgree",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_trId",
                  "type": "uint256"
                }
            ],
            "name": "respondAgree",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_addressSeller",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_price",
                  "type": "uint256"
                }
            ],
            "name": "setTalent",
            "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
                {
                  "internalType": "address",
                  "name": "_addressBuyer",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "_divded",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_talId",
                  "type": "uint256"
                }
            ],
            "name": "setTrade",
            "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
            ],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          }
        ];


function startApp() {
  const contractAddress = "0xD1EB48bAB0ea0928A6d14B281218320981e63E92";
  myContract = new web3js.eth.Contract(abi, contractAddress);
  console.log(myContract);
}

async function account() {

  try {
    userAccounts = await ethereum.enable();
    // You now have an array of accounts!
    // Currently only ever one:
    // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    console.log(userAccounts[0]);
  } catch (error) {
    if (error.code === 4001) { // EIP 1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
    }
  }
}



window.addEventListener('load', function(){
  if(typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    account();
  }else {
}
startApp();
})

