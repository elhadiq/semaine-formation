# Semaine de Formation Académique — site web

Site statique (Hugo) publié sur **https://info-cpge.men** par GitHub Pages, déployé automatiquement par GitHub Actions à chaque `git push`.

## Où modifier quoi

| Je veux…                                | Fichier / dossier                                   |
|-----------------------------------------|-----------------------------------------------------|
| Changer titre, dates, lieu, thèmes      | `hugo.toml` (section `[params]`)                    |
| Modifier le programme (horaires, salles)| `data/programme.yaml`                               |
| Ajouter / corriger un intervenant       | `data/intervenants.yaml`                            |
| Ajouter, modifier ou supprimer une formation et ses supports | `content/formations/<nom>/`    |
| Remplacer l'affiche                     | `static/img/programme.png` (+ `programme.jpg`)      |

Les gabarits (`layouts/`), le style (`assets/css/style.css`) et le script (`assets/js/main.js`) n'ont pas besoin d'être touchés pour la mise à jour du contenu.

## Une formation = un dossier

```
content/formations/simulation-des-lois/
├── index.md                       ← titre, intervenants, description
├── 01-cours-simulation-des-lois.pdf
├── 02-tp-loi-exponentielle-inversion.ipynb
└── …
```

**Ajouter une formation**

1. Copier un dossier existant (ou lancer `hugo new formations/mon-cours/index.md`).
2. Remplir l'en-tête de `index.md` : `title`, `domaine`, `intervenants` (identifiants de `data/intervenants.yaml`), `weight` (ordre d'affichage), `resume`.
3. Déposer les fichiers dans le dossier : PDF, notebooks, PowerPoint, Word, ZIP, Python, OCaml, SQL, CSV… Ils apparaissent automatiquement, dans l'ordre de leur nom (préfixer `01-`, `02-`…).
4. (Facultatif) Donner un titre lisible à chaque fichier dans `resources:` ; sans titre, le nom du fichier est affiché.
5. Pour l'afficher dans le programme : ajouter `formation: mon-cours` au créneau concerné de `data/programme.yaml`.

**Supprimer une formation** : supprimer son dossier, puis retirer la ligne `formation: …` du programme si elle y figure (sinon le créneau s'affiche simplement sans lien).

**Masquer temporairement** : mettre `draft: true` dans `index.md`.

## Notebooks : bouton « Ouvrir dans Colab »

Dans `hugo.toml`, renseigner `githubRepo = "utilisateur/depot"`. Les notebooks gagnent alors un bouton qui les ouvre directement dans Google Colab (le dépôt doit être public).

## Aperçu local

```bash
hugo server
```
puis ouvrir http://localhost:1313.

## Mise en ligne (une seule fois)

### 1. Dépôt GitHub
```bash
git init -b main
git add .
git commit -m "Site de la Semaine de Formation Académique"
git remote add origin https://github.com/<utilisateur>/<depot>.git
git push -u origin main
```

### 2. GitHub Pages
Dépôt → **Settings → Pages** → *Source* : **GitHub Actions**.
Le workflow `.github/workflows/hugo.yml` construit et publie le site à chaque push (onglet **Actions** pour suivre).

Toujours dans **Settings → Pages** → *Custom domain* : `info-cpge.men` → **Save**.
(Le fichier `static/CNAME` contient déjà ce domaine.)

### 3. Cloudflare (DNS de info-cpge.men)
Dans **DNS → Records**, créer :

| Type  | Nom   | Cible                       | Proxy         |
|-------|-------|-----------------------------|---------------|
| CNAME | `@`   | `<utilisateur>.github.io`   | DNS only (gris) |
| CNAME | `www` | `<utilisateur>.github.io`   | DNS only (gris) |

Cloudflare « aplatit » automatiquement le CNAME à la racine, c'est donc valide pour `@`.

Attendre que GitHub affiche « DNS check successful », puis cocher **Enforce HTTPS** (le certificat peut prendre jusqu'à une heure).

Une fois HTTPS actif, vous pouvez repasser les enregistrements en **Proxied** (orange) à condition de régler **SSL/TLS → Overview** sur **Full** (jamais *Flexible*, qui provoque une boucle de redirection).

### Fichiers volumineux
GitHub refuse les fichiers de plus de 100 Mo et recommande un dépôt de moins de 1 Go. Pour de grosses vidéos, préférer un lien externe dans `index.md`.
