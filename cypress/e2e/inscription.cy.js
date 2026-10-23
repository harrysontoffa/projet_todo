describe('Inscription', () => {
  let user;
  let emailUnique;

  beforeEach(() => {
    cy.fixture('users.json').then((data) => {
      user = data.alice;
      emailUnique = `${Date.now()}-${user.email}`;
    });
    cy.visit('/register');
  });

  it('INS-01 inscription avec des données valides', () => {
     

    //   remplir et envoyer le formulaire.
    cy.get('input[name="firstname"]').type(user.prenom);
    cy.get('input[name="lastname"]').type(user.nom);
    cy.get('input[name="email"]').type(emailUnique);
    cy.get('input[name="password"]').type(user.motDePasse);
    cy.get('input[name="confirm-password"]').type(user.motDePasse);
    cy.get('input[name="submit"]').click();

    //  le message s'affiche et le compte permet de se connecter.
    cy.get('main p').should('have.text', `Le compte : ${emailUnique} a été ajouté en BDD`);
    cy.visit('/login');
    cy.get('input[name="email"]').type(emailUnique);
    cy.get('input[name="password"]').type(user.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/');
    cy.contains('nav a', 'Déconnexion').should('be.visible');
  });

  it('INS-02 inscription refusée avec un champ obligatoire vide', () => {
     

    //  remplir tous les champs sauf l'email, puis envoyer.
    cy.get('input[name="firstname"]').type(user.prenom);
    cy.get('input[name="lastname"]').type(user.nom);
    cy.get('input[name="password"]').type(user.motDePasse);
    cy.get('input[name="confirm-password"]').type(user.motDePasse);
    cy.get('input[name="submit"]').click();

    //  on reste sur /register avec le message d'erreur.
    cy.location('pathname').should('eq', '/register');
    cy.get('main p').should('have.text', 'Veuillez remplir tous les champs du formulaire');
  });

  it('INS-03 inscription refusée avec deux mots de passe différents', () => {
     

    //  saisir une confirmation différente du mot de passe, puis envoyer.
    cy.get('input[name="firstname"]').type(user.prenom);
    cy.get('input[name="lastname"]').type(user.nom);
    cy.get('input[name="email"]').type(emailUnique);
    cy.get('input[name="password"]').type(user.motDePasse);
    cy.get('input[name="confirm-password"]').type('Autre-2026!');
    cy.get('input[name="submit"]').click();

    //  message d'erreur et le compte n'existe pas (connexion refusée).
    cy.get('main p').should('have.text', 'Les 2 mots de passe ne sont pas identiques');
    cy.visit('/login');
    cy.get('input[name="email"]').type(emailUnique);
    cy.get('input[name="password"]').type(user.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('main p').should('have.text', 'Les informations de connexion sont incorrectes');
  });
});