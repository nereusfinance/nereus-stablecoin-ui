import Page from "./page";

export default class TradePage extends Page {
  constructor() {
    super();
  }

  visit(poolNumber) {
    cy.visit("/pool/" + poolNumber);
  }

  checkCurrentlyDeposited(value) {
    return cy
      .get("[data-cy=collateral-deposited]")
      .invoke("text")
      .then(parseFloat)
      .should("be.eq", value);
  }

  checkCurrentlyBorrowed(value) {
    return cy.get("[data-cy=borrowed-value]").then((borrowed) => {
      const borrowedVal = Number(borrowed.text().split(" ")[2]);
      expect(Math.abs(borrowedVal - value)).to.be.lessThan(1);
    });
  }

  clickCheckBox() {
    cy.get("[data-cy=use-avax]").click();
  }

  clickRepay() {
    cy.get("[data-cy=repay-button]").click();
  }

  inputMain(value) {
    cy.get("[data-cy=main-input]").type(value);
  }

  inputPair(value) {
    cy.get("[data-cy=pair-input]").type(value);
  }

  clickBorrowRepay() {
    cy.get("[data-cy=borrow-repay]").click();
  }
}
