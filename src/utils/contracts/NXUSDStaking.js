export default {
  name: "NXUSDStaking",
  address: "0x41ed42B0B9cCB4145e5F08cfCe6B39E19a2AE894",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address"
        },
        {
          internalType: "contract IBentoBoxMinimal",
          name: "_bentoBox",
          type: "address"
        },
        {
          internalType: "contract IMultiFeeDistribution",
          name: "_multiFeeDistribution",
          type: "address"
        },
        {
          internalType: "contract IERC20",
          name: "_stakingToken",
          type: "address"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address"
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "OwnershipTransferred",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "ReplenishedTreasury",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "version",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256"
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "WXTLocked",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "NXUSDByTier1",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "APYTier1",
              type: "uint256"
            }
          ],
          indexed: false,
          internalType: "struct NXUSDStaking.APYData[]",
          name: "apyData",
          type: "tuple[]"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "APYTier2",
          type: "uint256"
        }
      ],
      name: "SetAPYDataConfig",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "Staked",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "userBalance",
          type: "uint256"
        }
      ],
      name: "Unstaked",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "WithdrawedTreasury",
      type: "event"
    },
    {
      inputs: [],
      name: "APYDataConfigCurrentVersion",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "principal",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "ratio",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "n",
          type: "uint256"
        }
      ],
      name: "_compound",
      outputs: [
        {
          internalType: "uint256",
          name: "result",
          type: "uint256"
        },
        {
          internalType: "int128",
          name: "ratioResult",
          type: "int128"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      name: "apyDataConfig",
      outputs: [
        {
          internalType: "uint256",
          name: "version",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "APYTier2",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "users",
          type: "address[]"
        }
      ],
      name: "batchUpdateUsersAPYData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "bentoBox",
      outputs: [
        {
          internalType: "contract IBentoBoxMinimal",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "version",
          type: "uint256"
        }
      ],
      name: "getAPYDataConfig",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "WXTLocked",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "NXUSDByTier1",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "APYTier1",
              type: "uint256"
            }
          ],
          internalType: "struct NXUSDStaking.APYData[]",
          name: "",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "getUserBalanceStaked",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "getUserRewards",
      outputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "compoundResult",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "principal",
          type: "uint256"
        },
        {
          internalType: "int128",
          name: "ratioResult",
          type: "int128"
        }
      ],
      name: "logarithm",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "pure",
      type: "function"
    },
    {
      inputs: [],
      name: "multiFeeDistribution",
      outputs: [
        {
          internalType: "contract IMultiFeeDistribution",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "replenishTreasury",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "reservedTreasuryBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "WXTLocked",
          type: "uint256[]"
        },
        {
          internalType: "uint256[]",
          name: "NXUSDByTier1",
          type: "uint256[]"
        },
        {
          internalType: "uint256[]",
          name: "APYTier1",
          type: "uint256[]"
        },
        {
          internalType: "uint256",
          name: "APYTier2",
          type: "uint256"
        }
      ],
      name: "setAPYDataConfig",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "stakingToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "totalPaidRewards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address"
        }
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [],
      name: "treasuryBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "fullExit",
          type: "bool"
        }
      ],
      name: "unstake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address"
        }
      ],
      name: "updateUserAPYData",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "userData",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "WXTLocked",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "NXUSDByTier1",
              type: "uint256"
            },
            {
              internalType: "uint256",
              name: "APYTier1",
              type: "uint256"
            }
          ],
          internalType: "struct NXUSDStaking.APYData",
          name: "apyData",
          type: "tuple"
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "storedReward",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "lastStakedTime",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "withdrawTreasury",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
};
