context('sonalake-task-react App', () => {
describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.visit("http://localhost:3001");
    cy.location().should((loc) => {
    expect(loc.origin).to.eq("http://localhost:3001");
    })
  });
  
  it("should display the title", () => {
    cy.get("h1").should("have.text", "List View");
  });

  it("should display the SonalakeTask", () => {
    cy.get("a:first").should("have.text", "Sonalake Task");
  });

  it("checks if the table on page 1 has 6 columns and 10 rows + 6 headers", () => {
    cy.get("tbody").children()
      .should("have.length", 10);
    cy.get("tbody>tr").children()
        .should("have.length", 60);
    cy.get("thead>tr")
      .children()
      .should("have.length", 6);
  });
  it("should check the corectness of GET", () => {
    cy.request("GET", "http://localhost:3000/characters").as("characters");
    cy.get("@characters").should(response => {
        expect(response.body).to.have.length(43);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");
       });
     });
  it("should search Human name and delete it and check number of records", () => {
    cy.get("#searchInput").type("Human{enter}");
    cy.get("tbody>tr:first>td").eq(1).should("have.text", "Human");
    cy.get("#searchInput").type("{selectall}{backspace}{enter}");
    cy.get("ul > li:nth-child(1)").should("have.class", "page-item disabled");
    cy.get("ul > li:nth-child(2)>button").should('contain',1);
    cy.get("ul > li:nth-child(3)>button").should("contain", 2);
    cy.get("ul > li:nth-child(4)>button").should("contain", 3);
    cy.get("ul > li:nth-child(5)>button").should("contain", 4);
    cy.get("ul > li:nth-child(6)>button").should("contain", 5);
    cy.get("ul > li:nth-child(7)")
      .should("contain", "Next")
      .and("have.class", "page-item");
  });
   it("should check if next and previous work - pagination", () => {
     cy.get("ul > li:nth-child(1)").should("have.class", "page-item disabled");
     cy.get("ul > li:nth-child(2)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(7)>button").click();
     cy.get("ul > li:nth-child(3)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(7)>button").click();
     cy.get("ul > li:nth-child(4)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(7)>button").click();
     cy.get("ul > li:nth-child(5)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(7)>button").click();
     cy.get("ul > li:nth-child(6)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(7)").should("have.class", "page-item disabled");
     cy.get("ul > li:nth-child(1)>button").click();
     cy.get("ul > li:nth-child(5)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(1)>button").click();
     cy.get("ul > li:nth-child(4)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(1)>button").click();
     cy.get("ul > li:nth-child(3)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(1)>button").click();
     cy.get("ul > li:nth-child(2)").should("have.class", "page-item active");
     cy.get("ul > li:nth-child(1)").should("have.class", "page-item disabled");
   });

   it("should check if clicking pagination buttons change the table content", () => {
    cy.get("ul > li:nth-child(7)>button").click();
    cy.get("table > tbody")
      .children()
      .should("have.length", 10);
    cy.get("ul > li:nth-child(7)>button").click();
    cy.get("table > tbody")
      .children()
      .should("have.length", 10);
    cy.get("ul > li:nth-child(7)>button").click();
    cy.get("table > tbody")
        .children()
        .should("have.length", 10);
  cy.get("ul > li:nth-child(7)>button").click();
  cy.get("table > tbody")
    .children()
    .should("have.length", 3);

  cy.get("ul > li:nth-child(1)>button").click();
  cy.get("table > tbody")
      .children()
      .should("have.length", 10);
  cy.get("ul > li:nth-child(1)>button").click();
  cy.get("table > tbody")
      .children()
      .should("have.length", 10);
  cy.get("ul > li:nth-child(1)>button").click();
  cy.get("table > tbody")
      .children()
      .should("have.length", 10);
  cy.get("ul > li:nth-child(1)>button").click();
   });

  it("should redirect to new view after clicking add new", () => {
    cy.get(
      "div > div.col-sm-6.text-sm-right > a"
    ).click();
    cy.location().should((loc) => {
  expect(loc.pathname).to.eq('/add_new')
})
  });
  it('goes to add_view and clicks submit without filling the form', function() {
    cy.visit("http://localhost:3001/add_new");
        cy.get("#submit").should("be.disabled");
  });
  it("add_view and clicks sonalake task or list view with redirection to list", function() {
    cy.visit("http://localhost:3001/add_new");
    cy.get("a").contains('Sonalake Task').click();
    cy.location().should(loc => {
      expect(loc.origin).to.eq("http://localhost:3001");
    });
    cy.get("div > div.col-sm-6.text-sm-right > a").click();
    cy.get("a")
      .contains("List View")
      .click();
    cy.location().should(loc => {
      expect(loc.origin).to.eq("http://localhost:3001");
    });
  });
  it("should submit a new request after writing all credentials", function() {
    cy.visit("http://localhost:3001/add_new");
    cy.get("#name").type("User1");
    cy.get("#species").select("Aleena");
    cy.get('[type="radio"]').first().check();
    cy.get("#homeworld").type("Homeworld1");
    cy.get("#submit").click();
    cy.get("ul > li:nth-child(6)").click();
    cy.get("table>tbody>tr:nth-child(4)>td:nth-child(2)").should("have.text","User1");
  });
  it("should validate name species and gender after clicking submit but it should show top field from name species gender in red border", function() {
    cy.visit("http://localhost:3001/add_new"); //before executing this test remove disabled on button !!!!!!
    cy.get("#submit").click();
    cy.get("form > div:nth-child(2)").should("have.class",'invalid-feedback d-block');
    cy.get("form > div:nth-child(4)").should("have.class",'invalid-feedback d-block');
    cy.get("form > div:nth-child(6)").should("have.class",'invalid-feedback d-block');
    cy.get("#name").should("have.class",'form-control is-invalid');
    cy.get("#name").type("User2");
    cy.get("#submit").click();
    cy.get("#species").should("have.class",'form-control is-invalid');
    cy.get("#species").select("Aleena");
    cy.get("#submit").click();
    cy.get('[type="radio"]').should("have.class",'errorGender is-invalid');
    cy.get('[type="radio"]').first().check();
    cy.get('[type="radio"]').should("have.class",'');
  });
  it("should check if there are 40 rows on select", function() {
    cy.visit("http://localhost:3001/add_new");
    cy.request("GET", "http://localhost:3000/species").as("species");
    cy.get("@species").should(response => {
        expect(response.body).to.have.length(37);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");
       });
  });
});
});
