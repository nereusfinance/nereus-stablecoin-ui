// import addressesByChainId from "@/utils/addressesByChainId";
// import nxusdStakingContractInfo from "@/utils/contracts/NXUSDStaking";
//
// export default {
// //     state: {
// //       userData: {},
// //       apyDataConfig: {},
// //     },
// //   // computed: {
// //   //   APYDataConfig() {
// //   //     return this.$store.getters.getAPYDataConfig;
// //   //   },
// //   //   stakeBalance() {
// //   //     return this.$store.getters.getStakeBalance;
// //   //   },
// //   //   userRewards() {
// //   //     return this.$store.getters.getUserRewards;
// //   //   },
// //   //   userData() {
// //   //     return this.$store.getters.getUserRewards;
// //   //   },
// //   // },
//   methods: {
//     createNXUSDStaking(address)
//     {
//       const nxusdStaking = new this.$ethers.Contract(
//         address,
//         JSON.stringify(nxusdStakingContractInfo.abi),
//         this.signer
//       );
//       return nxusdStaking;
//     }
//   ,
//     // getAPYDataConfig()
//     // {
//     //   const nxusdStaking = this.createWhitelistManager();
//     // }
//     // async getAPYDataConfig(NXUSDContract, decimals) {
//     //   const nxusdStaking = this.createNXUSDStaking(addressesByChainId[pool.contractChain].NXUSDStaking);
//     //   console.log("nxusdStaking", nxusdStaking);
//     //   const APYDataConfig = await nxusdStaking.getUserBalanceStaked;
//     //
//     //   try {
//     //     const APYDataConfig = await NXUSDContract.getAPYDataConfig(
//     //       this.account
//     //     );
//     //
//     //     const parsedAPYData = this.$ethers.utils.formatUnits(
//     //       APYDataConfig.toString(),
//     //       decimals
//     //     );
//     //
//     //     return parsedAPYData;
//     //   } catch (e) {
//     //     console.log("getAPYData err:", e);
//     //   }
//     // },
//   },
// };
//
