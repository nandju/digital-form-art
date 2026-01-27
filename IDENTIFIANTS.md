# Identifiants de l'Application

## 🔐 Identifiants de Connexion

### Administrateur
- **Email** : `admin@digitalformart.com`
- **Mot de passe** : `admin123`
- **Route** : `/admin/login`

### Utilisateur (Client)
- **Note** : Pour la démo, n'importe quel email et mot de passe fonctionnent (validation simple)
- **Route** : `/login`

---

## 👥 Utilisateurs Mockés

### Utilisateurs Réguliers

#### Utilisateur 1 - Jean Dupont
- **ID** : `1`
- **Nom** : Jean Dupont
- **Email** : `jean.dupont@email.com`
- **Téléphone** : `+33 6 12 34 56 78`
- **WhatsApp préféré** : Oui
- **Statut** : Actif (non bloqué)
- **Nombre de demandes** : 1
- **Date d'inscription** : 2025-01-15

#### Utilisateur 2 - Marie Martin
- **ID** : `2`
- **Nom** : Marie Martin
- **Email** : `marie.martin@email.com`
- **Téléphone** : `+33 6 98 76 54 32`
- **WhatsApp préféré** : Non
- **Statut** : Actif (non bloqué)
- **Nombre de demandes** : 2
- **Date d'inscription** : 2025-01-20

#### Utilisateur 3 - Pierre Bernard
- **ID** : `3`
- **Nom** : Pierre Bernard
- **Email** : `pierre.bernard@email.com`
- **Téléphone** : `+33 6 11 22 33 44`
- **WhatsApp préféré** : Oui
- **Statut** : Actif (non bloqué)
- **Nombre de demandes** : 1
- **Date d'inscription** : 2025-01-25

### Administrateur

#### Admin 1
- **ID** : `1`
- **Nom** : Admin 1
- **Email** : `admin@digitalformart.com`

---

## 📋 Demandes Mockées

### Demande 1
- **ID** : `1`
- **Client** : Jean Dupont
- **Email** : `jean.dupont@email.com`
- **Téléphone** : `+33 6 12 34 56 78`
- **Date** : 2025-02-10
- **Type** : Création
- **Statut** : En attente (pending)
- **Administrateur assigné** : Aucun
- **CV URL** : `null`
- **Lettre URL** : `null`

### Demande 2
- **ID** : `2`
- **Client** : Marie Martin
- **Email** : `marie.martin@email.com`
- **Téléphone** : `+33 6 98 76 54 32`
- **Date** : 2025-02-12
- **Type** : Amélioration
- **Statut** : En attente (pending)
- **Administrateur assigné** : Aucun
- **CV URL** : `null`
- **Lettre URL** : `null`

### Demande 3
- **ID** : `3`
- **Client** : Pierre Bernard
- **Email** : `pierre.bernard@email.com`
- **Téléphone** : `+33 6 11 22 33 44`
- **Date** : 2025-02-05
- **Type** : Création
- **Statut** : Terminé (completed)
- **Administrateur assigné** : Admin 1
- **Finalisé par** : Admin 1
- **Date de finalisation** : 2025-02-07
- **CV URL** : `/cv-example.pdf`
- **Lettre URL** : `/letter-example.pdf`

---

## 📊 Demandes dans le Dashboard (Client)

### Demande Dashboard 1
- **ID** : `1`
- **Date** : 2025-01-15
- **Statut** : Terminé (completed)
- **CV URL** : `/cv-example.pdf`
- **Lettre URL** : `/letter-example.pdf`

### Demande Dashboard 2
- **ID** : `2`
- **Date** : 2025-02-01
- **Statut** : En cours (in-progress)
- **CV URL** : `null`
- **Lettre URL** : `null`

### Demande Dashboard 3
- **ID** : `3`
- **Date** : 2025-02-10
- **Statut** : En attente (pending)
- **CV URL** : `null`
- **Lettre URL** : `null`

---

## 📱 Contact WhatsApp

- **Numéro WhatsApp personnel** : `+2250708091011`
- **Format URL** : `https://wa.me/2250708091011`
- **Groupe WhatsApp** : Lien dans le footer (actuellement `https://chat.whatsapp.com`)

---

## 🔑 LocalStorage Keys

### Authentification Utilisateur
- `isAuthenticated` : `"true"` (si connecté)
- `userEmail` : Email de l'utilisateur connecté

### Authentification Admin
- `isAdmin` : `"true"` (si admin connecté)
- `adminEmail` : Email de l'admin connecté

### Session
- `newRequestCreated` : `"true"` (si une nouvelle demande vient d'être créée)

---

## 📝 Notes Importantes

1. **Toutes ces données sont mockées** et doivent être remplacées par des appels API réels en production.

2. **Pour la connexion utilisateur**, n'importe quel email/mot de passe fonctionne en mode démo (validation simple).

3. **Pour la connexion admin**, seuls les identifiants `admin@digitalformart.com` / `admin123` fonctionnent.

4. **Les IDs** sont des strings simples (`"1"`, `"2"`, `"3"`) et peuvent être remplacés par des UUIDs en production.

5. **Les dates** sont au format ISO (`YYYY-MM-DD`).

---

## 🔄 Routes d'Accès

- **Page d'accueil** : `/`
- **Connexion utilisateur** : `/login`
- **Connexion admin** : `/admin/login`
- **Dashboard utilisateur** : `/dashboard`
- **Espace admin** : `/admin`
- **Formulaire CV/Lettre** : `/works/cv-lettre-motivation/form`
- **Formulaire en mode mise à jour** : `/works/cv-lettre-motivation/form?mode=update&requestId={id}`
