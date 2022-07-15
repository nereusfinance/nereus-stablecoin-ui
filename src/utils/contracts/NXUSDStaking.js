export default [
  {
    name: "NXUSDStaking",
    contractChain: "0xa86a",
    address: "0x10c79BCE07110d02DDffeed679cc2ca000C593F3",
    stakingToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "_owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "_spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "_to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "_value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [],
          name: "DOMAIN_SEPARATOR",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "claimOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "lastMint",
          outputs: [
            { internalType: "uint128", name: "time", type: "uint128" },
            { internalType: "uint128", name: "amount", type: "uint128" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "clone", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            {
              internalType: "contract IBentoBoxV1",
              name: "bentoBox",
              type: "address",
            },
          ],
          name: "mintToBentoBox",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "nonces",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "pendingOwner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner_", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          name: "permit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
            { internalType: "bool", name: "direct", type: "bool" },
            { internalType: "bool", name: "renounce", type: "bool" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    abi: [
      {
        inputs: [
          {
            internalType: "contract IBentoBoxMinimal",
            name: "_bentoBox",
            type: "address",
          },
          {
            internalType: "contract IMultiFeeDistribution",
            name: "_multiFeeDistribution",
            type: "address",
          },
          {
            internalType: "address",
            name: "_stakingToken",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "ReplenishedTreasury",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "version",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "WXTLocked",
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
            ],
            indexed: false,
            internalType: "struct NXUSDStaking.APYData[]",
            name: "apyData",
            type: "tuple[]",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "APYTier2",
            type: "uint256",
          },
        ],
        name: "SetConfig",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Staked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Unstaked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "WithdrawedTreasury",
        type: "event",
      },
      {
        inputs: [],
        name: "WXTLockContract",
        outputs: [
          {
            internalType: "contract IWXTLock",
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
            internalType: "address[]",
            name: "users",
            type: "address[]",
          },
        ],
        name: "batchUpdateUsersAPYData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "bentoBox",
        outputs: [
          {
            internalType: "contract IBentoBoxMinimal",
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
            name: "",
            type: "uint256",
          },
        ],
        name: "config",
        outputs: [
          {
            internalType: "uint256",
            name: "version",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "APYTier2",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "configCurrentVersion",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "version",
            type: "uint256",
          },
        ],
        name: "getAPYDataConfig",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "WXTLocked",
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
            ],
            internalType: "struct NXUSDStaking.APYData[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserRewards",
        outputs: [
          {
            internalType: "uint256",
            name: "rewards",
            type: "uint256",
          },
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
            ],
            internalType: "struct NXUSDStaking.HistoryRewards",
            name: "historyRewards",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getWXTLockBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "historyUserRewards",
        outputs: [
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
        ],
        stateMutability: "view",
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
      {
        inputs: [],
        name: "multiFeeDistribution",
        outputs: [
          {
            internalType: "contract IMultiFeeDistribution",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "replenishTreasury",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "reservedTreasuryBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "WXTLocked",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "NXUSDByTier1",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "APYTier1",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "APYTier2",
            type: "uint256",
          },
        ],
        name: "setConfig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IWXTLock",
            name: "newContract",
            type: "address",
          },
        ],
        name: "setWXTLockContract",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "stake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "stakingToken",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalPaidRewards",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "treasuryBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
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
            internalType: "bool",
            name: "fullExit",
            type: "bool",
          },
        ],
        name: "unstake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "updateUserAPYData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userData",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "WXTLocked",
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
            ],
            internalType: "struct NXUSDStaking.APYData",
            name: "apyData",
            type: "tuple",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "storedReward",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastStakedTime",
            type: "uint256",
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
        ],
        name: "withdrawTreasury",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    bentoBox: {
      name: "BentoBoxV1",
      address: "0xa0f3b348998A766664E7a1372c1Db7bA1628753e",
      abi: [
        {
          inputs: [
            {
              internalType: "contract IERC20",
              name: "wethToken_",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
            {
              indexed: true,
              internalType: "address",
              name: "cloneAddress",
              type: "address",
            },
          ],
          name: "LogDeploy",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "share",
              type: "uint256",
            },
          ],
          name: "LogDeposit",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "borrower",
              type: "address",
            },
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "feeAmount",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
          ],
          name: "LogFlashLoan",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "protocol",
              type: "address",
            },
          ],
          name: "LogRegisterProtocol",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "user",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "LogSetMasterContractApproval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogStrategyDivest",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogStrategyInvest",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogStrategyLoss",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "LogStrategyProfit",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "contract IStrategy",
              name: "strategy",
              type: "address",
            },
          ],
          name: "LogStrategyQueued",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "contract IStrategy",
              name: "strategy",
              type: "address",
            },
          ],
          name: "LogStrategySet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "targetPercentage",
              type: "uint256",
            },
          ],
          name: "LogStrategyTargetPercentage",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "share",
              type: "uint256",
            },
          ],
          name: "LogTransfer",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "approved",
              type: "bool",
            },
          ],
          name: "LogWhiteListMasterContract",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "contract IERC20",
              name: "token",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "share",
              type: "uint256",
            },
          ],
          name: "LogWithdraw",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "DOMAIN_SEPARATOR",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes[]", name: "calls", type: "bytes[]" },
            { internalType: "bool", name: "revertOnFail", type: "bool" },
          ],
          name: "batch",
          outputs: [
            { internalType: "bool[]", name: "successes", type: "bool[]" },
            { internalType: "bytes[]", name: "results", type: "bytes[]" },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "contract IBatchFlashBorrower",
              name: "borrower",
              type: "address",
            },
            { internalType: "address[]", name: "receivers", type: "address[]" },
            {
              internalType: "contract IERC20[]",
              name: "tokens",
              type: "address[]",
            },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "batchFlashLoan",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "claimOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            { internalType: "bytes", name: "data", type: "bytes" },
            { internalType: "bool", name: "useCreate2", type: "bool" },
          ],
          name: "deploy",
          outputs: [
            { internalType: "address", name: "cloneAddress", type: "address" },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "contract IERC20",
              name: "token_",
              type: "address",
            },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "share", type: "uint256" },
          ],
          name: "deposit",
          outputs: [
            { internalType: "uint256", name: "amountOut", type: "uint256" },
            { internalType: "uint256", name: "shareOut", type: "uint256" },
          ],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "contract IFlashBorrower",
              name: "borrower",
              type: "address",
            },
            { internalType: "address", name: "receiver", type: "address" },
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "flashLoan",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "bool", name: "balance", type: "bool" },
            {
              internalType: "uint256",
              name: "maxChangeAmount",
              type: "uint256",
            },
          ],
          name: "harvest",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
          ],
          name: "masterContractApproved",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "masterContractOf",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "nonces",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "pendingOwner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "", type: "address" },
          ],
          name: "pendingStrategy",
          outputs: [
            { internalType: "contract IStrategy", name: "", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          name: "permitToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "registerProtocol",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "user", type: "address" },
            {
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            { internalType: "bool", name: "approved", type: "bool" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          name: "setMasterContractApproval",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            {
              internalType: "contract IStrategy",
              name: "newStrategy",
              type: "address",
            },
          ],
          name: "setStrategy",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            {
              internalType: "uint64",
              name: "targetPercentage_",
              type: "uint64",
            },
          ],
          name: "setStrategyTargetPercentage",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "", type: "address" },
          ],
          name: "strategy",
          outputs: [
            { internalType: "contract IStrategy", name: "", type: "address" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "", type: "address" },
          ],
          name: "strategyData",
          outputs: [
            {
              internalType: "uint64",
              name: "strategyStartDate",
              type: "uint64",
            },
            {
              internalType: "uint64",
              name: "targetPercentage",
              type: "uint64",
            },
            { internalType: "uint128", name: "balance", type: "uint128" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "uint256", name: "share", type: "uint256" },
            { internalType: "bool", name: "roundUp", type: "bool" },
          ],
          name: "toAmount",
          outputs: [
            { internalType: "uint256", name: "amount", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "bool", name: "roundUp", type: "bool" },
          ],
          name: "toShare",
          outputs: [
            { internalType: "uint256", name: "share", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "", type: "address" },
          ],
          name: "totals",
          outputs: [
            { internalType: "uint128", name: "elastic", type: "uint128" },
            { internalType: "uint128", name: "base", type: "uint128" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "share", type: "uint256" },
          ],
          name: "transfer",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract IERC20", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address[]", name: "tos", type: "address[]" },
            { internalType: "uint256[]", name: "shares", type: "uint256[]" },
          ],
          name: "transferMultiple",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
            { internalType: "bool", name: "direct", type: "bool" },
            { internalType: "bool", name: "renounce", type: "bool" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "masterContract",
              type: "address",
            },
            { internalType: "bool", name: "approved", type: "bool" },
          ],
          name: "whitelistMasterContract",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "whitelistedMasterContracts",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "contract IERC20",
              name: "token_",
              type: "address",
            },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "share", type: "uint256" },
          ],
          name: "withdraw",
          outputs: [
            { internalType: "uint256", name: "amountOut", type: "uint256" },
            { internalType: "uint256", name: "shareOut", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ],
    },
  },
];
