import { AvailableLoginFormFieldsId } from "../../src/models/form-fields";

describe("Login", () => {
  it("should login existent user", () => {
    cy.visit("/");

    const email = "o@bk.ru";
    const password = "qwerty";

    cy.get(`#${AvailableLoginFormFieldsId.EMAIL}`).type(email);
    cy.get(`#${AvailableLoginFormFieldsId.PASSWORD}`).type(password);
    cy.contains(/login/i).click();
  });
});
