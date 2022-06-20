export default [
  {
    name: "MultiFeeDistribution",
    contractChain: "0xa86a",
    address: "0x4e8A4628468222c191589962b29304dF5df4Df9B",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_stakingToken",
            type: "address",
          },
          { internalType: "address", name: "_treasury", type: "address" },
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
        name: "Recovered",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "rewardsToken",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "reward",
            type: "uint256",
          },
        ],
        name: "RewardPaid",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
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
          {
            indexed: false,
            internalType: "bool",
            name: "locked",
            type: "bool",
          },
        ],
        name: "Staked",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "receivedAmount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "penaltyPaid",
            type: "uint256",
          },
        ],
        name: "Withdrawn",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "_rewardsToken", type: "address" },
        ],
        name: "addReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "claimableRewards",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            internalType: "struct MultiFeeDistribution.RewardData[]",
            name: "rewards",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "earnedBalances",
        outputs: [
          {
            internalType: "uint256",
            name: "total",
            type: "uint256",
          },
          {
            components: [
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "uint256",
                name: "unlockTime",
                type: "uint256",
              },
            ],
            internalType: "struct MultiFeeDistribution.LockedBalance[]",
            name: "earningsData",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "bool", name: "claimRewards", type: "bool" }],
        name: "exit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_rewardTokens",
            type: "address[]",
          },
        ],
        name: "getReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_rewardsToken", type: "address" },
        ],
        name: "getRewardForDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "incentivesController",
        outputs: [
          {
            internalType: "contract IChefIncentivesController",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_rewardsToken", type: "address" },
        ],
        name: "lastTimeRewardApplicable",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "lockDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "lockedBalances",
        outputs: [
          { internalType: "uint256", name: "total", type: "uint256" },
          {
            internalType: "uint256",
            name: "unlockable",
            type: "uint256",
          },
          { internalType: "uint256", name: "locked", type: "uint256" },
          {
            components: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              { internalType: "uint256", name: "unlockTime", type: "uint256" },
            ],
            internalType: "struct MultiFeeDistribution.LockedBalance[]",
            name: "lockData",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "lockedSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "user", type: "address" },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          { internalType: "bool", name: "withPenalty", type: "bool" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "minters",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "mintersAreSet",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
        name: "penaltyPercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "tokenAddress", type: "address" },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        name: "recoverERC20",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "rewardData",
        outputs: [
          { internalType: "uint256", name: "periodFinish", type: "uint256" },
          {
            internalType: "uint256",
            name: "rewardRate",
            type: "uint256",
          },
          { internalType: "uint256", name: "lastUpdateTime", type: "uint256" },
          {
            internalType: "uint256",
            name: "rewardPerTokenStored",
            type: "uint256",
          },
          { internalType: "uint256", name: "balance", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_rewardsToken", type: "address" },
        ],
        name: "rewardPerToken",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "rewardTokens",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "rewards",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "rewardsDuration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IChefIncentivesController",
            name: "_controller",
            type: "address",
          },
        ],
        name: "setIncentivesController",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address[]", name: "_minters", type: "address[]" },
        ],
        name: "setMinters",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "bool",
            name: "lock",
            type: "bool",
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
          { internalType: "contract IERC20", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "totalBalance",
        outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
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
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "unlockedBalance",
        outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "", type: "address" },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "userRewardPerTokenPaid",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "withdrawExpiredLocks",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "user", type: "address" }],
        name: "withdrawableBalance",
        outputs: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "penaltyAmount",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
];
