import DashboardPage from "../pages/dashboard-page";
import TradePage from "../pages/trade-page";

const dashboardPage = new DashboardPage();
const tradePage = new TradePage();
describe("Deleverage tests", () => {
  before(() => {
    cy.addMetamaskNetwork({
      networkName: "Test NXUSD deleverage",
      rpcUrl:
        "https://rpc.tenderly.co/fork/2db64d6a-e1a8-4065-b5ea-2f5dc1eb19f8",
      chainId: "43114",
      symbol: "AVAX",
      blockExplorer: "",
      isTestnet: true,
    }).then((networkAdded) => {
      expect(networkAdded).to.be.true;
    });
    cy.changeMetamaskNetwork("Test NXUSD deleverage").then((networkChanged) => {
      expect(networkChanged).to.be.true;
    });
    dashboardPage.visit();
    dashboardPage.connectBrowserWallet();
    tradePage.visit(8);
    const valueMain = 5;
    tradePage.inputMain(valueMain.toString());
    tradePage.clickBorrowRepay();
    cy.wait(5000);
    tradePage.confirmMetamaskTransaction();
    cy.wait(5000);
    const value = 50;
    tradePage.inputPair(value.toString());
    tradePage.clickBorrowRepay();
    cy.wait(5000);
    tradePage.confirmMetamaskTransaction();
    cy.wait(5000);
  });
  beforeEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    dashboardPage.visit();
    dashboardPage.connectBrowserWallet();
  });
  context("Deleverage screen", () => {
    it(`should deleverage position with some tokens in wallet`, () => {
      tradePage.visit(8);
      tradePage.transferAllNXUSD();
      cy.wait(10000);
      tradePage.confirmMetamaskTransaction();
      cy.wait(30000);
      tradePage.deleverageFlow();
    });
    it(`should deleverage position without tokens in wallet`, () => {
      tradePage.visit(8);
      tradePage.deleverageFlow();
    });
  });
});
