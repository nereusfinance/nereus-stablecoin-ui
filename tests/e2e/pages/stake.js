import Page from "./page";

export default class StakePage extends Page {
  constructor() {
    super();
  }

  clickDepositButton() {
    cy.get("[data-cy=stake-button]").click();
  }

  clickWithdrawButton() {
    cy.get("[data-cy=unstake-button]").click();
  }

  stakeInput(value) {
    cy.get("[data-cy=stake-input]").type(value);
  }

  unstakeInput(value) {
    cy.get("[data-cy=unstake-input]").type(value);
  }

  clickContinueStakeButton() {
    cy.get("[data-cy=stake-continue]").click();
  }

  clickContinueUnstakeButton() {
    cy.get("[data-cy=unstake-continue]").click();
  }

  depositAndWithdrawButton() {
    cy.get("[data-cy=deposit-withdraw-button]").click();
  }

  finishButton() {
    cy.get("[data-cy=finish-button]").click();
  }

  visit() {
    cy.visit("/stake");
  }

  connectBrowserWallet() {
    cy.get("[data-cy=connect-button-head]").first().click();
    cy.findByText("Metamask").click();
    this.acceptMetamaskAccessRequest();
  }
}
