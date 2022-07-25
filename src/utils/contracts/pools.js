import cauldronV2Abi from "@/utils/contracts/abis/cauldronV2Abi.json";
import erc20Abi from "@/utils/contracts/abis/erc20Abi.json";
import nxusdAbi from "@/utils/contracts/abis/nxusdAbi.json";
import swapperAbi from "@/utils/contracts/abis/swapperAbi.json";
import usdcAbi from "@/utils/contracts/abis/usdcAbi.json";
import sAvaxAbi from "@/utils/contracts/abis/sAvaxAbi.json";
import reverseSwapperContractAbiV1 from "./reverseSwapperContractAbiV1";

export default [
  {
    name: "AVAX",
    contractChain: "0xa869",
    id: 1,
    contract: {
      name: "CauldronV2",
      address: "0x0D093937007cF4e5c3F113f669025Fe1B08B504F",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WAVAX",
      decimals: 18,
      address: "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3",
      oracleId: 1,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x5498bb86bc934c8d34fda08e81d444153d0d06ad",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0x08Ccc70e9D460e8EbD9D384e261CDEDAe68F1E41",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 75,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WETH",
    contractChain: "0xa869",
    id: 2,
    contract: {
      name: "CauldronV2",
      address: "0x6a0d8c798F74E29f365B3C8E95e0d8Fa9f05689E",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WETH",
      decimals: 18,
      address: "0x1efae2c9Db545bE5875303462918be930a23C294",
      oracleId: 2,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0xE9490791171630664Ea40db9Ca664e9F1b58A799",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0x08Ccc70e9D460e8EbD9D384e261CDEDAe68F1E41",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 85,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WBTC",
    contractChain: "0xa869",
    id: 3,
    contract: {
      name: "CauldronV2",
      address: "0x5aB5498957294ED557AEc54f679146ec14f2456e",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WBTC",
      decimals: 8,
      address: "0xb77Af13D67A5796C860427603a638708c3054233",
      oracleId: 3,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x31cf013a08c6ac228c94551d535d5bafe19c602a",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0x08Ccc70e9D460e8EbD9D384e261CDEDAe68F1E41",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 85,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "DAI",
    contractChain: "0xa869",
    id: 4,
    contract: {
      name: "CauldronV2",
      address: "0x06927091e65B6295C019Df00a85ECdB108c04c69",
      abi: cauldronV2Abi,
    },
    token: {
      name: "DAI",
      decimals: 18,
      address: "0xea2D28c00Bef56A353C363084Da76058057B8b05",
      oracleId: 4,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x7898accc83587c3c55116c5230c17a6cd9c71bad",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0x08Ccc70e9D460e8EbD9D384e261CDEDAe68F1E41",
      abi: nxusdAbi,
    },
    stabilityFee: 5,
    interest: 0,
    ltv: 90,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WXT",
    contractChain: "0xa869",
    id: 5,
    contract: {
      name: "CauldronV2",
      address: "0x905D370c69DB2AAb1AAdA9B5e7Da071601fA6266",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WXT",
      decimals: 18,
      address: "0x14f7313b49452a13515F99FE9891b466ECA039bf",
      oracleId: 5,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x17f7589c98e6e58fda9b1ceaa2021db3779549fa",
        decimals: 6,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0x08Ccc70e9D460e8EbD9D384e261CDEDAe68F1E41",
      abi: nxusdAbi,
    },
    whitelistManager: "0x789348B5A0c24EAe846D2691e93ff41BC28AFe4b",
    stabilityFee: 10,
    interest: 0,
    ltv: 80,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WXT",
    contractChain: "0xa86a",
    id: 6,
    contract: {
      name: "CauldronV2",
      address: "0xD70Bfc49f4a293920c8642e97217807a0132284B",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WXT",
      decimals: 18,
      address: "0xfcDe4A87b8b6FA58326BB462882f1778158B02F1",
      oracleId: 6,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0xc22a84ce336b39e2d08324c032a12cbe8bb7e0f1",
        decimals: 6,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    whitelistManager: "0x662e896e36e57606B0334708B366212c6fe0CAB6",
    stabilityFee: 10,
    interest: 0,
    ltv: 80,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "AVAX",
    contractChain: "0xa86a",
    id: 7,
    contract: {
      name: "CauldronV2",
      address: "0xc337467F7266Fa6677d8459D4bC531d056348Da8",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WAVAX",
      decimals: 18,
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      oracleId: 7,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0A77230d17318075983913bC2145DB16C7366156",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 75,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0xDe694A5A3B16A93549f61480833A2CAf122C7681",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WETH",
    contractChain: "0xa86a",
    id: 8,
    contract: {
      name: "CauldronV2",
      address: "0x570F08643B4B1573514244d8f0B5005718Fa3e8a",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WETH",
      decimals: 18,
      address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      oracleId: 8,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 85,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x24577fb3FF3368a3883F2821B1Cd8ed04f6eAc7e",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "WBTC",
    contractChain: "0xa86a",
    id: 9,
    contract: {
      name: "CauldronV2",
      address: "0x88A6414466D61b9Fb6aaFC763c1BaB6EE1462631",
      abi: cauldronV2Abi,
    },
    token: {
      name: "WBTC",
      decimals: 8,
      address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
      oracleId: 9,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 85,
    initialMax: 20,
    swapContractInfo: {
      address: "0x6931536784c64CCF942E170EC842e3B45c60C352",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "DAI",
    contractChain: "0xa86a",
    id: 10,
    contract: {
      name: "CauldronV2",
      address: "0x42E07D41312E752143d72Fd0daE60B301ff139De",
      abi: cauldronV2Abi,
    },
    token: {
      name: "DAI",
      decimals: 18,
      address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      oracleId: 10,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x51D7180edA2260cc4F6e4EebB82FEF5c3c2B8300",
        decimals: 8,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 5,
    interest: 0,
    ltv: 90,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
  },
  {
    name: "USDC",
    contractChain: "0xa86a",
    id: 11,
    contract: {
      name: "CauldronV2",
      address: "0x55893534b8e6343F726a012D99524146eFb46688",
      abi: cauldronV2Abi,
    },
    token: {
      name: "USDC",
      decimals: 6,
      address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      oracleId: 11,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: usdcAbi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 5,
    interest: 0,
    ltv: 90,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "av3CRV",
    contractChain: "0xa86a",
    id: 12,
    contract: {
      name: "CauldronV2",
      address: "0x22097ED0Bb12E741e0A832d510A9b3CB596B16e2",
      abi: cauldronV2Abi,
    },
    token: {
      name: "av3CRV",
      decimals: 18,
      address: "0x1337BedC9D22ecbe766dF105c9623922A27963EC",
      oracleId: 12,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 87.5,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "sAVAX",
    contractChain: "0xa86a",
    id: 13,
    contract: {
      name: "CauldronV2",
      address: "0x8a0DBf7072A59d70EA59B3EDDB72764437CF06b2",
      abi: cauldronV2Abi,
    },
    token: {
      name: "sAVAX",
      decimals: 18,
      address: "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
      oracleId: 13,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: sAvaxAbi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 75,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "JOE",
    contractChain: "0xa86a",
    id: 14,
    contract: {
      name: "CauldronV2",
      address: "0x8598Ea8f5672Fa133C3abbE6b73d7a9E58e74882",
      abi: cauldronV2Abi,
    },
    token: {
      name: "JOE",
      decimals: 18,
      address: "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
      oracleId: 14,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 50,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "LINK.e",
    contractChain: "0xa86a",
    id: 15,
    contract: {
      name: "CauldronV2",
      address: "0x7E15B17Ed0945d320030031eB3E2A473E288452b",
      abi: cauldronV2Abi,
    },
    token: {
      name: "LINK.e",
      decimals: 18,
      address: "0x5947BB275c521040051D82396192181b413227A3",
      oracleId: 15,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 50,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "BTC.b",
    contractChain: "0xa86a",
    id: 16,
    contract: {
      name: "CauldronV2",
      address: "0x13d370e3de628387FD27709aE9fA9Bc7d2bc9C29",
      abi: cauldronV2Abi,
    },
    token: {
      name: "BTC.b",
      decimals: 8,
      address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
      oracleId: 9,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 7,
    interest: 0,
    ltv: 85,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
  {
    name: "AVAX-USDC JLP",
    contractChain: "0xa86a",
    id: 17,
    contract: {
      name: "CauldronV2",
      address: "0x43aa6Fb5E7adAdd2Cb9c17AE5A5133f2bDA37EDD",
      abi: cauldronV2Abi,
    },
    token: {
      name: "AVAX-USDC JLP",
      decimals: 18,
      address: "0xf4003F4efBE8691B60249E6afbD307aBE7758adb",
      oracleId: 17,
      oracleDatas: {
        multiply: "0x0000000000000000000000000000000000000000",
        divide: "0x0000000000000000000000000000000000000000",
        decimals: 0,
      },
      abi: erc20Abi,
    },
    pairToken: {
      name: "NXUSD",
      decimals: 18,
      address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      abi: nxusdAbi,
    },
    stabilityFee: 12.5,
    interest: 0,
    ltv: 75,
    initialMax: 20,
    swapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: swapperAbi,
    },
    reverseSwapContractInfo: {
      address: "0x197De282d7b5cEFfFD8f8B0196c30e8401593CF6",
      abi: reverseSwapperContractAbiV1,
    },
  },
];
