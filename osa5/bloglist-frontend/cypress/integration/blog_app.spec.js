describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('Blog app')
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })


    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('hups')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Cypress diaries')
      cy.get('#author').type('CypressMan')
      cy.get('#url').type('www.cypressdiaries.com')
      cy.get('#submit-blog').click()
      cy.contains('Cypress diaries')
    })

    describe('an existing blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress diaries',
          author: 'CypressMan',
          url: 'www.cypressdiaries.com',
          likes: 0
        })
      })

      it('can be liked', function () {
        cy.get('#view-button').click()
        cy.contains('CypressMan').parent().find('button')
          .should('contain', 'like')
      })

      it('can be removed by the original adder', function () {
        cy.get('#view-button').click()
        cy.contains('CypressMan').contains('remove').click()
        cy.get('html').should('not.contain', 'CypressMan')
      })

      it('blogs are ordered by likes', function () {
        cy.createBlog({
          title: 'A few likes',
          author: 'F. Ew',
          url: 'www.three.com',
          likes: 3
        })

        cy.createBlog({
          title: 'Many likes',
          author: 'A. Lot',
          url: 'www.hundred.com',
          likes: 100
        })

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).should('contain', 'Many likes')
          cy.wrap(blogs[1]).should('contain', 'A few likes')
        })
      })

    })
  })
})
