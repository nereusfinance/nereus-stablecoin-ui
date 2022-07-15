import DashboardPage from "../pages/dashboard-page";
import TradePage from "../pages/trade-page";

const dashboardPage = new DashboardPage();
const tradePage = new TradePage();
describe("Borrow-repay tests", () => {
  before(() => {
    cy.addMetamaskNetwork({
      networkName: "Test NXUSD",
      rpcUrl: "http://127.0.0.1:8545/",
      chainId: "43114",
      symbol: "AVAX",
      blockExplorer: "",
      isTestnet: true,
    }).then((networkAdded) => {
      expect(networkAdded).to.be.true;
    });
    cy.changeMetamaskNetwork("Test NXUSD").then((networkChanged) => {
      expect(networkChanged).to.be.true;
    });
  });
  beforeEach(() => {
    dashboardPage.visit();
    dashboardPage.connectBrowserWallet();
  });
  context("Borrow screen", () => {
    it(`should add collateral`, () => {
      tradePage.visit(7);
      tradePage.clickCheckBox();
      cy.get("[data-cy=collateral-deposited]").then((deposited) => {
        const value = 5;
        tradePage.inputMain(value.toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.checkCurrentlyDeposited(value + Number(deposited.text()));
      });
    });
    it(`should get NXUSD`, () => {
      tradePage.visit(7);
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        const borrowedVal = Number(borrowed.text().split(" ")[2]);
        const value = 5;
        tradePage.inputPair(value.toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.checkCurrentlyBorrowed(value + borrowedVal);
      });
    });
    it(`should get NXUSD and add collateral`, () => {
      tradePage.visit(7);
      tradePage.clickCheckBox();
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        cy.get("[data-cy=collateral-deposited]").then((deposited) => {
          const value = 5;
          const borrowedVal = Number(borrowed.text().split(" ")[2]);
          tradePage.inputPair(value.toString());
          tradePage.inputMain(value.toString());
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          cy.wait(5000);
          tradePage.checkCurrentlyBorrowed(value + borrowedVal);
          tradePage.checkCurrentlyDeposited(value + Number(deposited.text()));
        });
      });
    });
  });
  context("Repay screen", () => {
    it(`should repay NXUSD`, () => {
      tradePage.visit(7);
      tradePage.clickRepay();
      tradePage.clickCheckBox();
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        const borrowedVal = Number(borrowed.text().split(" ")[2]);
        const value = 5;
        tradePage.inputMain(value.toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.checkCurrentlyBorrowed(borrowedVal - value);
      });
    });
    it(`should remove collateral`, () => {
      tradePage.visit(7);
      tradePage.clickRepay();
      tradePage.clickCheckBox();
      cy.get("[data-cy=collateral-deposited]").then((deposited) => {
        const value = 5;
        tradePage.inputPair(value.toString());
        tradePage.clickBorrowRepay();
        cy.wait(5000);
        tradePage.confirmMetamaskTransaction();
        cy.wait(5000);
        tradePage.checkCurrentlyDeposited(Number(deposited.text()) - value);
      });
    });
    it(`should repay NXUSD and remove collateral`, () => {
      tradePage.visit(7);
      tradePage.clickRepay();
      tradePage.clickCheckBox();
      cy.get("[data-cy=borrowed-value]").then((borrowed) => {
        cy.get("[data-cy=collateral-deposited]").then((deposited) => {
          const value = 5;
          const collateralValue = 4;
          const borrowedVal = Number(borrowed.text().split(" ")[2]);
          tradePage.inputMain(value.toString());
          tradePage.inputPair(collateralValue.toString());
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          cy.wait(5000);
          tradePage.checkCurrentlyBorrowed(borrowedVal - value);
          tradePage.checkCurrentlyDeposited(
            Number(deposited.text()) - collateralValue
          );
        });
      });
    });
  });
});
