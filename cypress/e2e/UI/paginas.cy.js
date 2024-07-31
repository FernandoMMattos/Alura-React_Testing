import { isMobile } from "../../support/utils";

describe("Testando múltiplas páginas", () => {
  it("Deve conseguir acessar a página de cartões", () => {
    cy.viewport("iphone-xr");

    cy.visit("/");
    cy.login(Cypress.env("email"), Cypress.env("senha"));
    cy.visit("/home");

    if (isMobile()) {
      cy.getByData("menu-burguer").should("be.visible");
      cy.getByData("menu-burguer").click();
      cy.getByData("app-home").find("a").eq(2).click({ force: true });
    } else {
      cy.getByData("app-home").find("a").eq(2).click({ force: true });
    }

    cy.getByData("titulo-cartoes")
      .should("exist")
      .and("have.text", "Meus cartões");

    cy.location("pathname").should("eq", "/home/cartoes");
  });
});
