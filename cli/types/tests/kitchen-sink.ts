// additional tests that confirm types are done correctly
// these tests are in addition to type checking cypress-example-kitchensink
// (https://github.com/cypress-io/cypress-example-kitchensink)
// and should not repeat them

// extra code that is not in the kitchensink that type checks edge cases
cy.wrap('foo').then(subject => {
  subject // $ExpectType string
  return cy.wrap(subject)
}).then(subject => {
  subject // $ExpectType string
})

Cypress.minimatch('/users/1/comments', '/users/*/comments', {
  matchBase: true,
})

// check if cy.server() yields default server options
cy.server().should((server) => {
  server // $ExpectType ServerOptions
  expect(server.delay).to.eq(0)
  expect(server.method).to.eq('GET')
  expect(server.status).to.eq(200)
})

cy.visit('https://www.acme.com/', {
  auth: {
    username: 'wile',
    password: 'coyote'
  }
})

Cypress.spec.name // $ExpectType string
Cypress.spec.relative // $ExpectType string | null
Cypress.spec.absolute // $ExpectType string | null

Cypress.browser // $ExpectType Browser

// stubbing window.alert type on "Cypress" should
// work with plain function or with a Sinon stub
Cypress.on('window:alert', () => {})
Cypress.on('window:alert', cy.stub())
// same for a single test
cy.on('window:alert', () => {})
cy.on('window:alert', cy.stub())

// window:confirm stubbing
cy.on('window:confirm', () => {})
cy.on('window:confirm', cy.stub())

// specifying HTTP method directly in the options object
cy.request({
  url: "http://localhost:3000/myressource",
  method: "POST",
  body: {}
})

// if you want a separate variable, you need specify its type
// otherwise TSC does not cast string "POST" as HttpMethod
// https://github.com/cypress-io/cypress/issues/2093
const opts: Partial<Cypress.RequestOptions> = {
  url: "http://localhost:3000/myressource",
  method: "POST",
  body: {}
}
cy.request(opts)

// you can cast just the "method" property
const opts2 = {
  url: "http://localhost:3000/myressource",
  method: "POST" as Cypress.HttpMethod,
  body: {}
}
cy.request(opts2)

const obj = {
  foo: () => {}
}
cy.spy(obj, 'foo').as('my-spy')
