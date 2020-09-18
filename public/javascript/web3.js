let myContract;
let userAccounts;
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addressSeller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "talId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "addressbuyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "divided",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "countAgree",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "balanceOf",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tradeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "useReport",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isFinished",
				"type": "bool"
			}
		],
		"name": "InfoTrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "trId",
				"type": "uint256"
			}
		],
		"name": "NewTrade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "useReport",
				"type": "string"
			}
		],
		"name": "NewUseReport",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addressSeller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "addressbuyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isFinished",
				"type": "bool"
			}
		],
		"name": "RespondAgree",
		"type": "event"
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
		"name": "getTrade",
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
		"name": "getUseReport",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_talID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_addressBuyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_divded",
				"type": "uint256"
			}
		],
		"name": "setTrade",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_trId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_useReport",
				"type": "string"
			}
		],
		"name": "setUseReport",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]







function startApp() {
  const contractAddress = "0xc6A6887dB23A5d4374EC08E9e0B29F29ad2b49ac";
  myContract = new web3js.eth.Contract(abi, contractAddress);
	console.log(myContract);
	myContract.methods.getTrade(0).send({from: "0x8225D7986904918825094eE92a950F565C7eEe6a"})
	.on('receipt', function(receipt){
		console.log(receipt)
	})
}

async function account() {

  try {
    userAccounts = await ethereum.enable();
    // You now have an array of accounts!
    // Currently only ever one:
    // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
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

