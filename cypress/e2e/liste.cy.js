describe('Liste des tâches actives', () => {
  let alice;
  let bruno;
  let taches;
  let categorie;

  beforeEach(() => {
    cy.fixture('users.json').then((data) => {
      alice = data.alice;
      bruno = data.bruno;
    });
    cy.fixture('taches.json').then((data) => {
      taches = data;
      categorie = `${taches.categorie}-${Date.now()}`;
    });
  });

  it('LISTE-01 affiche les tâches actives du compte connecté', () => {
    // créer le compte d'Alice  et se connecter.
    const titre = `${taches.titre}-${Date.now()}`;
    cy.visit('/register');
    cy.get('input[name="firstname"]').type(alice.prenom);
    cy.get('input[name="lastname"]').type(alice.nom);
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="confirm-password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('be.visible');
    cy.visit('/login');
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/');

    //  créer une catégorie et une tâche active pour Alice.
    cy.visit('/category/new');
    cy.get('input[name="name"]').type(categorie);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La category ${categorie} a été ajouté en BDD`);
    cy.visit('/task/new');
    cy.get('input[name="title"]').type(titre);
    cy.get('textarea[name="description"]').type(taches.description);
    cy.contains('select[name="categories[]"] option', categorie)
      .invoke('val')
      .then((valeur) => {
        cy.get('select[name="categories[]"]').select(valeur);
      });
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La tache : ${titre} a été ajouté en BDD`);

    //  ouvrir la liste des tâches actives.
    cy.visit('/task/activeall');

    // la tâche est affichée, même après rechargement.
    cy.contains('main article h3', titre).should('be.visible');
    cy.reload();
    cy.contains('main article h3', titre).should('be.visible');
  });

  it('LISTE-02 n\'affiche pas les tâches terminées', () => {
    // créer le compte d'Alice  et se connecter.
    const titre = `${taches.titre}-${Date.now()}`;
    cy.visit('/register');
    cy.get('input[name="firstname"]').type(alice.prenom);
    cy.get('input[name="lastname"]').type(alice.nom);
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="confirm-password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('be.visible');
    cy.visit('/login');
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // créer une catégorie et une tâche.
    cy.visit('/category/new');
    cy.get('input[name="name"]').type(categorie);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La category ${categorie} a été ajouté en BDD`);
    cy.visit('/task/new');
    cy.get('input[name="title"]').type(titre);
    cy.get('textarea[name="description"]').type(taches.description);
    cy.contains('select[name="categories[]"] option', categorie)
      .invoke('val')
      .then((valeur) => {
        cy.get('select[name="categories[]"]').select(valeur);
      });
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La tache : ${titre} a été ajouté en BDD`);

    // terminer la tâche en suivant le lien de son bouton "désactiver".
    cy.visit('/task/activeall');
    cy.contains('main article', titre)
      .find('a')
      .invoke('attr', 'href')
      .then((lien) => {
        cy.visit(lien);
      });

     
    cy.visit('/task/activeall');

    //  la tâche n'est pas dans les actives, mais existe bien dans les terminées.
    cy.contains('main article h3', titre).should('not.exist');
    cy.visit('/task/inactiveall');
    cy.contains('main article h3', titre).should('be.visible');
  });

  it('LISTE-03 n\'affiche pas les tâches d\'un autre compte', () => {
    // créer le compte de Bruno et se connecter.
    const titreBruno = `${taches.titre}-${Date.now()}`;
    cy.visit('/register');
    cy.get('input[name="firstname"]').type(bruno.prenom);
    cy.get('input[name="lastname"]').type(bruno.nom);
    cy.get('input[name="email"]').type(bruno.email);
    cy.get('input[name="password"]').type(bruno.motDePasse);
    cy.get('input[name="confirm-password"]').type(bruno.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('be.visible');
    cy.visit('/login');
    cy.get('input[name="email"]').type(bruno.email);
    cy.get('input[name="password"]').type(bruno.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // Bruno crée une tâche, vérifie qu'elle est dans sa liste, puis se déconnecte.
    cy.visit('/category/new');
    cy.get('input[name="name"]').type(categorie);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La category ${categorie} a été ajouté en BDD`);
    cy.visit('/task/new');
    cy.get('input[name="title"]').type(titreBruno);
    cy.get('textarea[name="description"]').type(taches.description);
    cy.contains('select[name="categories[]"] option', categorie)
      .invoke('val')
      .then((valeur) => {
        cy.get('select[name="categories[]"]').select(valeur);
      });
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('have.text', `La tache : ${titreBruno} a été ajouté en BDD`);
    cy.visit('/task/activeall');
    cy.contains('main article h3', titreBruno).should('be.visible');
    cy.visit('/logout');

    //  créer le compte d'Alice   et se connecter.
    cy.visit('/register');
    cy.get('input[name="firstname"]').type(alice.prenom);
    cy.get('input[name="lastname"]').type(alice.nom);
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="confirm-password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.get('main p').should('be.visible');
    cy.visit('/login');
    cy.get('input[name="email"]').type(alice.email);
    cy.get('input[name="password"]').type(alice.motDePasse);
    cy.get('input[name="submit"]').click();
    cy.location('pathname').should('eq', '/');

    // Alice ouvre sa liste des tâches actives.
    cy.visit('/task/activeall');

    // la page est chargée et la tâche de Bruno n'y est pas.
    cy.contains('main h2', 'Liste des taches').should('be.visible');
    cy.contains('main article h3', titreBruno).should('not.exist');
  });
});