import DashboardPage from "../pages/dashboard-page";
import TradePage from "../pages/trade-page";

const dashboardPage = new DashboardPage();
const tradePage = new TradePage();
describe("Leverage tests", () => {
  before(() => {
    cy.addMetamaskNetwork({
      networkName: "Test NXUSD leverage",
      rpcUrl:
        "https://rpc.tenderly.co/fork/42860c15-ac06-48a3-b42e-15261167a129",
      chainId: "43114",
      symbol: "AVAX",
      blockExplorer: "",
      isTestnet: true,
    }).then((networkAdded) => {
      expect(networkAdded).to.be.true;
    });
    cy.changeMetamaskNetwork("Test NXUSD leverage").then((networkChanged) => {
      expect(networkChanged).to.be.true;
    });
    dashboardPage.visit();
    dashboardPage.connectBrowserWallet();
    tradePage.visit(7);
    tradePage.clickCheckBox();
    const value = 10;
    tradePage.inputMain(value.toString());
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
  context("Leverage", () => {
    it(`should change borrow amount to max`, () => {
      tradePage.visit(7);
      tradePage.clickLeverageCheckBox();
      cy.get("[data-cy=available-borrow]").then((availableBorrow) => {
        const availableBorrowVal = Number(availableBorrow.text());
        cy.get("[data-cy=pair-input]").then((input) => {
          expect(
            Math.abs(Number(input.val()) - availableBorrowVal)
          ).to.be.lessThan(availableBorrowVal / 100);
        });
      });
    });
    it(`should go through leverage flow`, () => {
      tradePage.visit(7);
      tradePage.clickLeverageCheckBox();
      cy.get("[data-cy=available-borrow]").then((availableBorrow) => {
        const availableBorrowVal = Number(availableBorrow.text()) / 5;
        tradePage.clearPairInput();
        tradePage.inputPair(availableBorrowVal);
        cy.wait(5000);
        tradePage.changeLeverageSlider();
        cy.wait(5000);
        cy.get("[data-cy=expected-leverage]").then((expected) => {
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          tradePage.visit(7);
          cy.wait(20000);
          cy.get("[data-cy=borrowed-value]").then((borrowed) => {
            const borrowedVal = Number(borrowed.text().split(" ")[2]);
            expect(
              Math.abs(Number(expected.text()) - borrowedVal)
            ).to.be.lessThan(Number(expected.text()) / 100);
          });
        });
      });
    });
    it(`should go through leverage flow with borrow`, () => {
      tradePage.visit(7);
      cy.get("[data-cy=available-borrow]").then((availableBorrow) => {
        const availableBorrowVal = Number(availableBorrow.text()) + 1;
        tradePage.clickCheckBox();
        tradePage.inputMain(5);
        tradePage.clickLeverageCheckBox();
        tradePage.clearPairInput();
        tradePage.inputPair(availableBorrowVal);
        cy.wait(5000);
        tradePage.changeLeverageSlider();
        cy.wait(5000);
        cy.get("[data-cy=expected-leverage]").then((expected) => {
          tradePage.clickBorrowRepay();
          cy.wait(5000);
          tradePage.confirmMetamaskTransaction();
          tradePage.visit(7);
          cy.wait(20000);
          cy.get("[data-cy=borrowed-value]").then((borrowed) => {
            const borrowedVal = Number(borrowed.text().split(" ")[2]);
            expect(
              Math.abs(Number(expected.text()) - borrowedVal)
            ).to.be.lessThan(Number(expected.text()) / 100);
          });
        });
      });
    });
  });
});
