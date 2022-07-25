import TradePage from "../pages/trade-page";

const tradePage = new TradePage();
const depositValue = 5;
const poolId = 10;
describe("Borrow-repay DAI tests", () => {
  before(() => {
    cy.addMetamaskNetwork({
      networkName: "Test_marketsD",
      rpcUrl:
          "http://127.0.0.1:8545/",
      chainId: "43114",
      symbol: "AVAX",
      blockExplorer: "",
      isTestnet: true,
    }).then((networkAdded) => {
      expect(networkAdded).to.be.true;
    });
    cy.changeMetamaskNetwork("Test_markets").then((networkChanged) => {
      expect(networkChanged).to.be.true;
    });
  });
  beforeEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    tradePage.visit(poolId);
    tradePage.connectBrowserWallet();
  });
  context("Borrow screen for DAI", () => {
    it(`should add DAI as collateral`, () => {
      tradePage.visit(poolId);
      cy.get("[data-cy=collateral-deposited]").then((deposited) => {
        tradePage.inputMain(depositValue.toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(20000);
        tradePage.checkCurrentlyDeposited(depositValue + Number(deposited.text()));
      });
    });
    it(`should borrow NXUSD`, () => {
      tradePage.visit(poolId);
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        const borrowedVal = Number(borrowed.text().split(" ")[2]);
        tradePage.inputPair((depositValue/2).toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(20000);
        tradePage.checkCurrentlyBorrowed(depositValue/2 + borrowedVal);
      });
    });
    it(`should borrow NXUSD and add DAI as collateral`, () => {
      tradePage.visit(poolId);
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        cy.get("[data-cy=collateral-deposited]").then((deposited) => {
          const borrowedVal = Number(borrowed.text().split(" ")[2]);
          tradePage.inputPair((depositValue/2).toString());
          tradePage.inputMain(depositValue.toString());
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          cy.wait(20000);
          tradePage.checkCurrentlyBorrowed(depositValue/2 + borrowedVal);
          tradePage.checkCurrentlyDeposited(depositValue + Number(deposited.text()));
        });
      });
    });
  });
  context("Repay screen", () => {
    it(`should repay NXUSD`, () => {
      tradePage.visit(poolId);
      tradePage.clickRepay();
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        const borrowedVal = Number(borrowed.text().split(" ")[2]);
        tradePage.inputMain((depositValue/5).toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.checkCurrentlyBorrowed(borrowedVal - (depositValue/5));
      });
    });
    it(`should remove collateral`, () => {
      tradePage.visit(poolId);
      tradePage.clickRepay();
      cy.get("[data-cy=collateral-deposited]").then((deposited) => {
        tradePage.inputPair((depositValue/5).toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(20000);
        tradePage.checkCurrentlyDeposited(Number(deposited.text()) - (depositValue/5));
      });
    });
    it(`should repay NXUSD and remove DAI collateral`, () => {
      tradePage.visit(poolId);
      tradePage.clickRepay();
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        cy.get("[data-cy=collateral-deposited]").then((deposited) => {
          const borrowedVal = Number(borrowed.text().split(" ")[2]);
          tradePage.inputMain((depositValue/5).toString());
          tradePage.inputPair(depositValue.toString());
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          cy.wait(5000);
          tradePage.checkCurrentlyBorrowed(borrowedVal - depositValue/5 - 0.1);
          tradePage.checkCurrentlyDeposited(
              Number(deposited.text()) - depositValue
          );
        });
      });
    });
  });
});
