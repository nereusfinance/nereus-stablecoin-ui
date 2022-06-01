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

  clickLeverageCheckBox() {
    cy.get("[data-cy=leverage-checkbox]").click();
  }

  clickRepay() {
    cy.get("[data-cy=repay-button]").click();
  }

  changeLeverageSlider() {
    cy.get('[data-cy=leverage-slider]').invoke('val', 15) .trigger('input')
        .click()
  }

  inputMain(value) {
    cy.get("[data-cy=main-input]").type(value);
  }

  inputPair(value) {
    cy.get("[data-cy=pair-input]").type(value);
  }

  clearPairInput() {
    for( let i=0;i<20;i++){
      cy.get("[data-cy=pair-input]").type("{backspace}");
    }
  }

  clickBorrowRepay() {
    cy.get("[data-cy=borrow-repay]").click();
  }

}
