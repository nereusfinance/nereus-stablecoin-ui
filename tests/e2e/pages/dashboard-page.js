import Page from "./page";

export default class DashboardPage extends Page {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/");
  }

  connectBrowserWallet() {
    cy.get("[data-cy=connect-button-head]").first().click();
    cy.findByText("Metamask").click();
    this.acceptMetamaskAccessRequest();
  }
}
