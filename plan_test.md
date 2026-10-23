# Plan de tests

**Nom et prénom :** [Toffa Harryson]  
**Date :** [23/10/2026]

Complétez ce fichier avant de coder les tests, puis ajoutez les résultats après leur exécution.

## 1 Les neuf cas à tester

| ID | Page | Situation à vérifier |
| --- | --- | --- |
| INS-01 | /register | Inscription avec des données valides |
| INS-02 | /register | Inscription avec un champ obligatoire vide |
| INS-03 | /register | Inscription avec deux mots de passe différents |
| TACHE-01 | /task/new | Ajout d’une tâche valide avec une catégorie |
| TACHE-02 | /task/new | Ajout avec un champ obligatoire vide |
| TACHE-03 | /task/new | Accès à la page sans être connecté |
| LISTE-01 | /task/activeall | Les tâches actives du compte connecté sont affichées |
| LISTE-02 | /task/activeall | Ses tâches terminées ne sont pas affichées |
| LISTE-03 | /task/activeall | Les tâches d’un autre compte ne sont pas affichées |

 
## 2 Décrire chaque cas

Copiez la fiche ci-dessous neuf fois, une fois par cas. Reprenez son identifiant dans le titre du test Cypress correspondant.

### INS-01 Inscription avec des données valides

- **Objectif :** vérifier qu’un visiteur peut créer un compte avec des informations correctes.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** fixture `users.json` (objet `alice`) ; email unique généré à chaque lancement : `<date en millisecondes>-alice@example.test`.
- **Actions :**
  1. Ouvrir `/register`, remplir tous les champs et cliquer sur « Inscription ».
  2. Se connecter sur `/login` avec l’email et le mot de passe saisis.
- **Résultat attendu :** le message « Le compte : <email> a été ajouté en BDD » s’affiche, la connexion réussit et le lien « Déconnexion » apparaît.
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

### INS-02 Inscription avec un champ obligatoire vide

- **Objectif :** vérifier qu’un compte ne peut pas être créé si un champ obligatoire est vide.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** fixture `users.json` (objet `alice`) ; champ email laissé vide.
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir tous les champs sauf l’email et cliquer sur « Inscription ».
- **Résultat attendu :** l’utilisateur reste sur `/register` et le message « Veuillez remplir tous les champs du formulaire » s’affiche.
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

### INS-03 Inscription avec deux mots de passe différents

- **Objectif :** vérifier qu’un compte ne peut pas être créé si la confirmation du mot de passe est différente.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** fixture `users.json` (objet `alice`) ; email unique `<date en millisecondes>-alice@example.test` ; confirmation différente `Autre-2026!`.
- **Actions :**
  1. Ouvrir `/register`, remplir tous les champs et cliquer sur « Inscription ».
  2. Essayer de se connecter sur `/login` avec cet email et `Test-2026!`.
- **Résultat attendu :** le message « Les 2 mots de passe ne sont pas identiques » s’affiche, puis la connexion est refusée avec « Les informations de connexion sont incorrectes ».
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

### TACHE-01 Ajout d’une tâche valide avec une catégorie

- **Objectif :** vérifier qu’un utilisateur connecté peut ajouter une tâche liée à une catégorie et qu’elle est conservée.
- **Préparation :** compte fictif `alice@example.test` / `Test-Alice-2026!` créé par le test s’il n’existe pas, connexion avec ce compte, catégorie unique créée par le test, page de départ `/task/new`.
- **Données utilisées :** fixtures `users.json` (objet `alice`) et `taches.json` ; catégorie `Categorie-<date en millisecondes>`, titre `Tache-<date en millisecondes>`, description « Tâche créée par Cypress ».
- **Actions :**
  1. Remplir le titre, la description, choisir la catégorie et cliquer sur « Ajouter ».
  2. Ouvrir `/task/activeall` puis recharger la page.
- **Résultat attendu :** la tâche apparaît dans `/task/activeall` avec sa catégorie et reste visible après rechargement.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### TACHE-02 Ajout avec un champ obligatoire vide

- **Objectif :** vérifier qu’une tâche ne peut pas être créée sans titre.
- **Préparation :** compte fictif `alice@example.test` connecté, catégorie unique créée par le test, page de départ `/task/new`.
- **Données utilisées :** fixtures `users.json` (objet `alice`) et `taches.json` ; titre laissé vide, description unique `Tâche créée par Cypress-<date en millisecondes>`, catégorie `Categorie-<date en millisecondes>`.
- **Actions :**
  1. Laisser le titre vide, remplir la description, choisir la catégorie et cliquer sur « Ajouter ».
  2. Ouvrir `/task/activeall`.
- **Résultat attendu :** le navigateur bloque l’envoi (champ titre obligatoire), l’utilisateur reste sur `/task/new` et aucune tâche avec cette description n’apparaît dans `/task/activeall`.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### TACHE-03 Accès à la page sans être connecté

- **Objectif :** vérifier qu’un visiteur non connecté ne peut pas accéder au formulaire d’ajout de tâche.
- **Préparation :** aucun compte connecté, application et BDD démarrées.
- **Données utilisées :** aucune.
- **Actions :**
  1. Ouvrir directement `/task/new` sans se connecter.
  2. Observer l’adresse et le contenu de la page.
- **Résultat attendu :** l’utilisateur est redirigé vers l’accueil `/`, le formulaire d’ajout n’est pas affiché et le lien « Connexion » est visible.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### LISTE-01 Les tâches actives du compte connecté sont affichées

- **Objectif :** vérifier que l’utilisateur connecté voit ses tâches actives.
- **Préparation :** compte fictif `alice@example.test` connecté ; le test crée une catégorie unique et une tâche active unique pour Alice.
- **Données utilisées :** fixtures `users.json` (objet `alice`) et `taches.json` ; catégorie `Categorie-<date en millisecondes>`, tâche `Tache-<date en millisecondes>`.
- **Actions :**
  1. Ouvrir `/task/activeall`.
  2. Recharger la page.
- **Résultat attendu :** la tâche `Tache-<date>` créée par le test est visible dans la liste, avant et après rechargement.
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

### LISTE-02 Ses tâches terminées ne sont pas affichées

- **Objectif :** vérifier que les tâches terminées n’apparaissent pas dans la liste des tâches actives.
- **Préparation :** compte fictif `alice@example.test` connecté ; le test crée une tâche unique puis la termine avec le bouton « désactiver ».
- **Données utilisées :** fixtures `users.json` (objet `alice`) et `taches.json` ; catégorie `Categorie-<date en millisecondes>`, tâche `Tache-<date en millisecondes>`.
- **Actions :**
  1. Ouvrir `/task/activeall`.
  2. Ouvrir `/task/inactiveall` pour contrôle.
- **Résultat attendu :** la tâche terminée `Tache-<date>` n’apparaît pas dans `/task/activeall` et apparaît dans `/task/inactiveall`.
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

### LISTE-03 Les tâches d’un autre compte ne sont pas affichées

- **Objectif :** vérifier qu’un utilisateur ne voit pas les tâches d’un autre compte.
- **Préparation :** comptes fictifs `bruno@example.test` / `Test-Bruno-2026!` et `alice@example.test` / `Test-Alice-2026!` créés par le test s’ils n’existent pas ; Bruno crée une tâche unique et se déconnecte, puis Alice se connecte.
- **Données utilisées :** fixtures `users.json` (objets `alice` et `bruno`) et `taches.json` ; catégorie `Categorie-<date en millisecondes>`, tâche de Bruno `Tache-<date en millisecondes>`.
- **Actions :**
  1. Connecté avec Alice, ouvrir `/task/activeall`.
  2. Chercher la tâche de Bruno dans la liste.
- **Résultat attendu :** la liste d’Alice s’affiche et la tâche de Bruno `Tache-<date>` n’y apparaît pas.
- **Résultat obtenu :** [Réussi]
- **Statut :** non exécuté

Choisissez ensuite l’un des statuts suivants :

- **Réussi** : le résultat obtenu correspond au résultat attendu.
- **Échoué** : le résultat obtenu ne correspond pas au résultat attendu.
- **Bloqué** : un problème empêche d’effectuer la vérification.
- **Non exécuté** : le test n’a pas été lancé.

## 3 Expliquer vos priorités

**Quels cas sont les plus importants à vérifier en premier et pourquoi ?**

Les cas prioritaires sont LISTE-03 et TACHE-03, car ils touchent à la confidentialité et à la sécurité :
 s’ils échouent, un utilisateur pourrait voir les tâches d’un autre compte ou utiliser une page réservée sans être connecté. 
 ensuite INS-01 et TACHE-01, qui vérifient le parcours principal : sans inscription ni ajout de tâche, l’application est inutilisable. 
 LISTE-01 et LISTE-02 garantissent que la liste affichée est juste. Enfin, INS-02, INS-03 et TACHE-02 vérifient les erreurs de saisie : un échec gêne l’utilisateur ou crée des données incorrectes.
  

## 4 Noter les résultats de la relance

Relancez les tests avec des données adaptées, puis complétez :

- **Les résultats sont-ils identiques à ceux du premier passage ?** [Oui ou non, puis explication]
- **Si un résultat change, quel cas est concerné et pourquoi ?** [À compléter ou aucun]
- **Preuves des deux passages :** [Liens vers les fichiers conservés dans resultats/]
