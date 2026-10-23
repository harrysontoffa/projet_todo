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

### Données de test communes

Toutes les données sont fictives.

- **Compte Alice :** `alice@example.test` / `Test-Alice-2026!`
  - Tâches actives : « Faire les courses » (Maison), « Préparer réunion » (Travail)
  - Tâche terminée : « Arroser les plantes » (Maison)
- **Compte Bruno :** `bruno@example.test` / `Test-Bruno-2026!`
  - Tâche active : « Tâche de Bruno » (Travail)
- **Catégories existantes :** Travail, Maison


## 2 Décrire chaque cas

Copiez la fiche ci-dessous neuf fois, une fois par cas. Reprenez son identifiant dans le titre du test Cypress correspondant.

### INS-01 Inscription avec des données valides

- **Objectif :** vérifier qu’un visiteur peut créer un compte avec des informations correctes.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** prénom « Test », nom « Inscription », email unique `inscription-<date en millisecondes>@example.test`, mot de passe `Test-Inscription-2026!` saisi dans les deux champs.
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir tous les champs avec les données ci-dessus et cliquer sur le bouton d’inscription.
  3. Ouvrir `/login` et se connecter avec l’email et le mot de passe saisis.
- **Résultat attendu :** le compte est créé : la connexion réussit et l’utilisateur arrive sur `/`.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### INS-02 Inscription avec un champ obligatoire vide

- **Objectif :** vérifier qu’un compte ne peut pas être créé si un champ obligatoire est vide.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** prénom « Test », nom « Vide », email laissé vide, mot de passe `Test-Vide-2026!` saisi dans les deux champs.
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir tous les champs sauf l’email et cliquer sur le bouton d’inscription.
- **Résultat attendu :** l’inscription est refusée : l’utilisateur reste sur `/register` et un message signale le champ manquant.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### INS-03 Inscription avec deux mots de passe différents

- **Objectif :** vérifier qu’un compte ne peut pas être créé si la confirmation du mot de passe est différente.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/register`.
- **Données utilisées :** prénom « Test », nom « Différent », email unique `different-<date en millisecondes>@example.test`, mot de passe `Test-2026!`, confirmation `Autre-2026!`.
- **Actions :**
  1. Ouvrir `/register`.
  2. Remplir tous les champs avec les données ci-dessus et cliquer sur le bouton d’inscription.
  3. Ouvrir `/login` et essayer de se connecter avec cet email et `Test-2026!`.
- **Résultat attendu :** l’inscription est refusée : un message indique que les mots de passe ne correspondent pas et la connexion avec cet email échoue.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### TACHE-01 Ajout d’une tâche valide avec une catégorie

- **Objectif :** vérifier qu’un utilisateur connecté peut ajouter une tâche liée à une catégorie.
- **Préparation :** compte connecté `alice@example.test` / `Test-Alice-2026!`, catégorie « Travail » existante, page de départ `/task/new`.
- **Données utilisées :** titre unique `Tache-<date en millisecondes>`, description « Tâche créée par le test TACHE-01 », catégorie « Travail ».
- **Actions :**
  1. Se connecter avec Alice sur `/login` puis ouvrir `/task/new`.
  2. Remplir le titre, la description, choisir « Travail » et valider.
  3. Ouvrir `/task/activeall`.
- **Résultat attendu :** la nouvelle tâche apparaît dans `/task/activeall` avec la catégorie « Travail ».
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### TACHE-02 Ajout avec un champ obligatoire vide

- **Objectif :** vérifier qu’une tâche ne peut pas être créée sans titre.
- **Préparation :** compte connecté `alice@example.test` / `Test-Alice-2026!`, catégorie « Travail » existante, page de départ `/task/new`.
- **Données utilisées :** titre laissé vide, description unique `Sans-titre-<date en millisecondes>`, catégorie « Travail ».
- **Actions :**
  1. Se connecter avec Alice sur `/login` puis ouvrir `/task/new`.
  2. Laisser le titre vide, remplir la description, choisir « Travail » et valider.
  3. Ouvrir `/task/activeall`.
- **Résultat attendu :** la tâche n’est pas créée : un message d’erreur s’affiche et aucune tâche avec cette description n’apparaît dans `/task/activeall`.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### TACHE-03 Accès à la page sans être connecté

- **Objectif :** vérifier qu’un visiteur non connecté ne peut pas accéder au formulaire d’ajout de tâche.
- **Préparation :** aucun compte connecté, application et BDD démarrées, page de départ `/task/new`.
- **Données utilisées :** aucune.
- **Actions :**
  1. Ouvrir directement `/task/new` sans se connecter.
  2. Observer la page affichée et l’adresse dans le navigateur.
- **Résultat attendu :** le formulaire d’ajout n’est pas affiché et l’utilisateur est redirigé vers `/login`.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### LISTE-01 Les tâches actives du compte connecté sont affichées

- **Objectif :** vérifier que l’utilisateur connecté voit ses tâches actives.
- **Préparation :** compte connecté `alice@example.test` / `Test-Alice-2026!` ; Alice possède les tâches actives « Faire les courses » et « Préparer réunion » ; page de départ `/task/activeall`.
- **Données utilisées :** tâches actives d’Alice « Faire les courses » et « Préparer réunion ».
- **Actions :**
  1. Se connecter avec Alice sur `/login`.
  2. Ouvrir `/task/activeall`.
- **Résultat attendu :** « Faire les courses » et « Préparer réunion » sont visibles dans la liste.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### LISTE-02 Ses tâches terminées ne sont pas affichées

- **Objectif :** vérifier que les tâches terminées n’apparaissent pas dans la liste des tâches actives.
- **Préparation :** compte connecté `alice@example.test` / `Test-Alice-2026!` ; Alice possède la tâche terminée « Arroser les plantes » ; page de départ `/task/activeall`.
- **Données utilisées :** tâche terminée d’Alice « Arroser les plantes ».
- **Actions :**
  1. Se connecter avec Alice sur `/login`.
  2. Ouvrir `/task/activeall`.
- **Résultat attendu :** « Arroser les plantes » n’apparaît pas dans la liste.
- **Résultat obtenu :** [À compléter après le test]
- **Statut :** non exécuté

### LISTE-03 Les tâches d’un autre compte ne sont pas affichées

- **Objectif :** vérifier qu’un utilisateur ne voit pas les tâches d’un autre compte.
- **Préparation :** compte connecté `alice@example.test` / `Test-Alice-2026!` ; le compte `bruno@example.test` / `Test-Bruno-2026!` possède la tâche active « Tâche de Bruno » ; page de départ `/task/activeall`.
- **Données utilisées :** tâche active de Bruno « Tâche de Bruno ».
- **Actions :**
  1. Se connecter avec Alice sur `/login`.
  2. Ouvrir `/task/activeall`.
- **Résultat attendu :** « Tâche de Bruno » n’apparaît pas dans la liste d’Alice.
- **Résultat obtenu :** [À compléter après le test]
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
 LISTE-01 et LISTE-02 garantissent que la liste affichée est juste. Enfin, INS-02, INS-03 et TACHE-02 vérifient les erreurs de saisie : un échec gêne l’utilisateur ou crée des données incorrectes, 
 mais avec un impact moins grave.
 
## 4 Noter les résultats de la relance

Relancez les tests avec des données adaptées, puis complétez :

- **Les résultats sont-ils identiques à ceux du premier passage ?** [Oui ou non, puis explication]
- **Si un résultat change, quel cas est concerné et pourquoi ?** [À compléter ou aucun]
- **Preuves des deux passages :** [Liens vers les fichiers conservés dans resultats/]
