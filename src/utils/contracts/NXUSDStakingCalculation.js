export default {
  name: "NXUSDStakingCalculation",
  address: "0x66cf88bccd6151bdedb861ca294a033518225891",
  abi: [
    {
      "inputs": [
        {
          "internalType": "contract INXUSDStaking",
          "name": "_NXUSDStaking",
          "type": "address"
        },
        {
          "internalType": "contract IMultiFeeDistribution",
          "name": "_multiFeeDistribution",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "NXUSDStaking",
      "outputs": [
        {
          "internalType": "contract INXUSDStaking",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "periods",
          "type": "uint256[]"
        }
      ],
      "name": "calculateTableRewards",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "rewardsTier1",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "rewardsTier2",
              "type": "uint256"
            }
          ],
          "internalType": "struct NXUSDStakingCalculation.Rewards[]",
          "name": "rewards",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "principal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ratio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "n",
          "type": "uint256"
        }
      ],
      "name": "compound",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "result",
          "type": "uint256"
        },
        {
          "internalType": "int128",
          "name": "ratioResult",
          "type": "int128"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "compoundResult",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "principal",
          "type": "uint256"
        },
        {
          "internalType": "int128",
          "name": "ratioResult",
          "type": "int128"
        }
      ],
      "name": "logarithm",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "multiFeeDistribution",
      "outputs": [
        {
          "internalType": "contract IMultiFeeDistribution",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
};