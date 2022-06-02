import Page from "./page";
import tokenAbi from "../../../src/utils/contracts/tokenAbi";
import { ethers, providers } from "ethers";

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

  clickDeleverageCheckBox() {
    cy.get("[data-cy=checkbox-deleverage]").click();
  }

  clickDontShowAgain() {
    cy.get("[data-cy=dont-show-again]").click();
  }

  changeDeleverageSlider(value) {
    cy.get("[data-cy=deleverage-slider]")
      .invoke("val", value)
      .trigger("input")
      .click();
  }

  transferAllNXUSD() {
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      JSON.stringify(tokenAbi),
      signer
    );
    const balance = contract.balanceOf(signer.getAddress());
    contract.transfer("0x87b4da4e71d5a7554c8492425723029eca2343c7", balance);
  }
}
