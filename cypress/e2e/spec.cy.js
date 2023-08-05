describe('Different ways to retrieve elements in a cycle in Cypress', () => {

  it('Cypress connector .each()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');
    cy.get('h4').each(($el, index) => {
      cy.log(`Connector ${index}: ${$el.text()}`);
    });
  });
  
  it('Cypress connectors .each() and .then()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      $el.each((index, el) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
      });
      // Instead of Cypress.$(el), we can use cy.wrap(el) to create a Cypress object for each element.
      // $el.each((index, el) => {
      //   cy.wrap(el).invoke('text').then((text) => {
      //     cy.log(`Connector ${index}: ${text}`);
      //   });
      // });
    });
  });

  it('Cypress lodash Cypress._.each()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      Cypress._.each($el.get(), (el, index) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
      });
    });
  });

  it('Cypress lodash _.each()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      const { _ } = Cypress;
      _.each($el.get(), (el, index) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
      });
    });
  });
  
  it('JS iteration for', () => {
    cy.visit('https://example.cypress.io/commands/connectors');
    cy.get('h4').then(($el) => {
      for (let index = 0; index < $el.length; index++) {
        cy.log(`Connector ${index}: ${$el.eq(index).text()}`);
      }
    });
  });

  it('JS iteration for...of', () => {
    cy.visit('https://example.cypress.io/commands/connectors');
    cy.get('h4').then(($el) => {
      let index = 0;
      for (const el of $el) {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
        index++;
      }
    });
  });

  it('JS iteration while', () => {
    cy.visit('https://example.cypress.io/commands/connectors');
    cy.get('h4').then(($el) => {
      let index = 0;
      while (index < $el.length) {
        cy.log(`Connector ${index}: ${Cypress.$($el[index]).text()}`);
        index++;
      }
    });
  });

  it('JS iteration do...while', () => {
    cy.visit('https://example.cypress.io/commands/connectors');
    cy.get('h4').then(($el) => {
      let index = 0;
      do {
        cy.log(`Connector ${index}: ${Cypress.$($el[index]).text()}`);
        index++;
      } while (index < $el.length);
    });
  });

  it('JS object Array.prototype.forEach()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      const elementsArray = Array.from($el);
      elementsArray.forEach((el, index) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
      });
    });
  });

  it('JS object Map.prototype.forEach()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      const elementsMap = new Map(Array.from($el).map((el, index) => [el, index]));
      elementsMap.forEach((index, el) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
      });
    });
  });

  it('JS object Set.prototype.forEach()', () => {
    cy.visit('https://example.cypress.io/commands/connectors');;
    cy.get('h4').then(($el) => {
      const elementsSet = new Set($el.toArray());
      let index = 0;
      elementsSet.forEach((el) => {
        cy.log(`Connector ${index}: ${Cypress.$(el).text()}`);
        index++;
      });
    });
  });
});