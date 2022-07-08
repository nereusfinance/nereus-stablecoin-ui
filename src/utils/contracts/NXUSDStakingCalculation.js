export default [
  {
    name: "NXUSDStakingCalculation",
    contractChain: "0xa86a",
    address: "0x4Cee3d271985768B216BB7F2672aA28AaB771844",
    abi: [
      {
        inputs: [
          {
            internalType: "contract INXUSDStaking",
            name: "_NXUSDStaking",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "NXUSDStaking",
        outputs: [
          {
            internalType: "contract INXUSDStaking",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "NXUSDByTier1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "APYTier1",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "APYTier2",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        name: "calculateRewardsForPeriod",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "rewardsTier1",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rewardsTier2",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rewardsTotal",
                type: "uint256",
              },
            ],
            internalType: "struct NXUSDStakingCalculation.Rewards",
            name: "rewards",
            type: "tuple",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "periods",
            type: "uint256[]",
          },
        ],
        name: "calculateTableRewards",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "rewardsTier1",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rewardsTier2",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rewardsTotal",
                type: "uint256",
              },
            ],
            internalType: "struct NXUSDStakingCalculation.Rewards[]",
            name: "rewards",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "principal",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "ratio",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "n",
            type: "uint256",
          },
        ],
        name: "compound",
        outputs: [
          {
            internalType: "uint256",
            name: "result",
            type: "uint256",
          },
          {
            internalType: "int128",
            name: "ratioResult",
            type: "int128",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "compoundResult",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "principal",
            type: "uint256",
          },
          {
            internalType: "int128",
            name: "ratioResult",
            type: "int128",
          },
        ],
        name: "logarithm",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
    ],
  },
];
