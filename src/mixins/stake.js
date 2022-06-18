import NXUSDStakingContractInfo from "@/utils/contracts/NXUSDStaking";
import NXUSDStakingCalculationInfo from "@/utils/contracts/NXUSDStakingCalculation";
import MultiFeeDistributionInfo from "@/utils/contracts/MultiFeeDistribution";

export default {
  computed: {
    chainId() {
      return this.$store.getters.getChainId;
    },
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
  },
  methods: {
    createNXUSDStaking() {
      const NXUSDStakingContractInfoByChainId = NXUSDStakingContractInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      console.log(
        "NXUSDStakingContractInfoByChainId",
        NXUSDStakingContractInfoByChainId
      );
      const nxusdStakingContract = new this.$ethers.Contract(
        NXUSDStakingContractInfoByChainId.address,
        JSON.stringify(NXUSDStakingContractInfoByChainId.abi),
        this.signer
      );

      this.$store.commit("setNXUSDStakingContract", nxusdStakingContract);

      return nxusdStakingContract;
    },
    createNXUSDStakingCalculation() {
      const NXUSDStakingCalculationInfoByChainId =
        NXUSDStakingCalculationInfo.find(
          (contract) => contract.contractChain === this.chainId
        );

      const nxusdStakingCalculationContract = new this.$ethers.Contract(
        NXUSDStakingCalculationInfoByChainId.address,
        JSON.stringify(NXUSDStakingCalculationInfoByChainId.abi),
        this.signer
      );

      this.$store.commit(
        "setNXUSDStakingCalculationContract",
        nxusdStakingCalculationContract
      );

      return nxusdStakingCalculationContract;
    },
    createMultiFeeDistribution() {
      const MultiFeeDistributionInfoByChainId = MultiFeeDistributionInfo.find(
        (contract) => contract.contractChain === this.chainId
      );

      const multiFeeDistributionContract = new this.$ethers.Contract(
        MultiFeeDistributionInfoByChainId.address,
        JSON.stringify(MultiFeeDistributionInfoByChainId.abi),
        this.signer
      );

      this.$store.commit(
        "setMultiFeeDistributionContract",
        multiFeeDistributionContract
      );

      return multiFeeDistributionContract;
    },

    async getAllParameters() {
      this.createNXUSDStaking();
      this.createNXUSDStakingCalculation();
      this.createMultiFeeDistribution();

      await this.$store.dispatch("checkUserData");

      const configCurrentVersion = await this.$store.dispatch(
        "checkConfigCurrentVersion"
      );

      await this.$store.dispatch("getAPYDataConfig", configCurrentVersion);

      await this.$store.dispatch("checkUserWXTLock");

      await this.$store.dispatch("checkUserCurrentRewards");

      await this.$store.dispatch(
        "calculateTableRewards",
        [86400, 604800, 2629746, 31556952]
      );
    },
  },
};
