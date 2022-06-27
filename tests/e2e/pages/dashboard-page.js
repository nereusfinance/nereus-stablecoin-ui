import Page from "./page";

export default class DashboardPage extends Page {
  constructor() {
    super();
  }

  visit() {
    cy.visit("/");
  }

  connectBrowserWallet() {
    cy.findAllByText("Connect").spread((firstButton, secondButton) => {
      firstButton.click();
    });
    cy.findByText("Metamask").click();
    this.acceptMetamaskAccessRequest();
  }
}
