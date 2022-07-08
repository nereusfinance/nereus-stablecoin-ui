import StakePage from "../pages/stake";
import TradePage from "../pages/trade-page";
import DashboardPage from "../pages/dashboard-page";

const stakePage = new StakePage();
const tradePage = new TradePage();
const dashboardPage = new DashboardPage();
describe("Stake tests", () => {
  before(() => {
    cy.addMetamaskNetwork({
      networkName: "Test Stake",
      rpcUrl: "http://127.0.0.1:8545/",
      chainId: "43114",
      symbol: "AVAX",
      blockExplorer: "",
      isTestnet: true,
    }).then((networkAdded) => {
      expect(networkAdded).to.be.true;
    });
    cy.changeMetamaskNetwork("Test Stake").then((networkChanged) => {
      expect(networkChanged).to.be.true;
    });
  });
  beforeEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    dashboardPage.visit();
    stakePage.connectBrowserWallet();
  });
  context("Dashboard screen", () => {
    it(`should get NXUSD and add collateral`, () => {
      tradePage.visit(7);
      tradePage.clickCheckBox();
      cy.get("[data-cy=borrowed-value]").then(() => {
        cy.get("[data-cy=collateral-deposited]").then(() => {
          const value = 5;
          tradePage.inputPair(value.toString());
          tradePage.inputMain(value.toString());
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          cy.wait(5000);
        });
      });
    });
  });

  context("Stake screen", () => {
    it(`should make deposit`, () => {
      stakePage.visit();
      stakePage.clickDepositButton();
      cy.wait(5000);
      const value = 1;
      stakePage.stakeInput(value.toString());
      stakePage.clickContinueStakeButton();
      stakePage.depositAndWithdrawButton();
      cy.wait(5000);
      stakePage.confirmMetamaskTransaction();
      cy.wait(5000);
      stakePage.finishButton();
    });
    it(`should make withdraw`, () => {
      stakePage.visit();
      stakePage.clickWithdrawButton();
      cy.wait(5000);
      const value = 1;
      stakePage.unstakeInput(value.toString());
      stakePage.clickContinueUnstakeButton();
      stakePage.depositAndWithdrawButton();
      cy.wait(5000);
      stakePage.confirmMetamaskTransaction();
      cy.wait(5000);
      stakePage.finishButton();
    });
  });
});
