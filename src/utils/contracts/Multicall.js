export default [
  {
    name: "Multicall",
    contractChain: "0xa86a",
    address: "",
    abi: [
      {
        inputs: [
          {
            internalType: "bool",
            name: "requireSuccess",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address",
                name: "target",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "callData",
                type: "bytes",
              },
            ],
            internalType: "struct Multicall.Call[]",
            name: "calls",
            type: "tuple[]",
          },
        ],
        name: "tryAggregate",
        outputs: [
          {
            components: [
              {
                internalType: "bool",
                name: "success",
                type: "bool",
              },
              {
                internalType: "bytes",
                name: "returnData",
                type: "bytes",
              },
            ],
            internalType: "struct Multicall.Result[]",
            name: "returnData",
            type: "tuple[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
];
