# Info CPGE — site web

Site en ligne : **https://info-cpge.men** (Hugo, publié par GitHub Pages à chaque `git push`).

## Organisation du site

| Adresse | Dossier | Contenu |
|---|---|---|
| `/` | `content/_index.md` + `layouts/index.html` | Accueil : formation à la une, rubriques, actualités, derniers ajouts |
| `/formations/` | `content/formations/` | Liste automatique de toutes les éditions de formation |
| `/formation-2026/` | `content/formation-2026/` + `data/formation-2026/` | Semaine de Formation Académique 2026 |
| `/cours/` | `content/cours/` | Cours |
| `/ressources/` | `content/ressources/` | TP, notebooks, sujets, outils |
| `/actualites/` | `content/actualites/` | Annonces et événements |

Réglages généraux (titre, accroche, dépôt GitHub pour Colab, menu) : `hugo.toml`.

## Règle commune : une page = un dossier

Dans toutes les rubriques, une page est un dossier contenant un `index.md` et ses fichiers :

```
content/ressources/tp-graphes/
├── index.md              ← titre, résumé, texte
├── 01-enonce.pdf
└── 02-tp-parcours.ipynb
```

- Les fichiers déposés dans le dossier apparaissent **automatiquement** sur la page, dans l'ordre de leur nom (`01-`, `02-`…).
- Formats reconnus : PDF, `.ipynb`, PowerPoint, Word, ODT, ZIP, `.py`, `.ml`, `.sql`, `.csv`, `.xlsx`, `.html`, `.tex`, `.txt`.
- Pas d'espaces ni d'accents dans les noms de fichiers ; utiliser des tirets.
- Les notebooks ont un bouton « Ouvrir dans Colab ».

En-tête type d'un `index.md` :

```yaml
---
title: "TP — Parcours de graphes"
date: 2026-11-05
resume: "Parcours en largeur et en profondeur, avec notebook."
domaine: "Graphes"          # facultatif, étiquette affichée
weight: 10                  # facultatif, ordre dans la rubrique
resources:                  # facultatif, titres lisibles des fichiers
  - src: "01-enonce.pdf"
    title: "Énoncé du TP"
  - src: "02-tp-parcours.ipynb"
    title: "Notebook à compléter"
---

Texte de la page (Markdown).
```

- Le nom après `src:` doit correspondre **exactement** au nom du fichier.
- Garder l'indentation à 2 espaces : en YAML, un décalage casse la publication.

Pour **regrouper** des pages (ex. `content/cours/mp/`, `content/cours/psi/`), créer un sous-dossier avec un `_index.md` (titre + `description`) : il devient une sous-rubrique.

## Ajouter des ressources à un cours de la formation 2026

Exemple avec **Théorie des graphes** :

1. Copier les fichiers dans `content\formation-2026\formations\theorie-des-graphes\` (ex. `01-cours-graphes.pdf`, `02-tp-dijkstra.ipynb`).
2. (Facultatif) Ajouter leurs titres dans le bloc `resources:` de `theorie-des-graphes\index.md`.
3. Publier (voir plus bas).

**Remplacer** : écraser le fichier en gardant le même nom. **Retirer** : supprimer le fichier et son entrée `- src:` éventuelle.

## Publier une actualité

1. Créer `content\actualites\2026-11-mon-annonce\index.md` avec `title`, `date`, `resume` et le texte.
2. Publier. Les 3 plus récentes s'affichent sur l'accueil.

## Créer une nouvelle édition de formation (ex. 2027)

1. Copier `content\formation-2026\` en `content\formation-2027\` et `data\formation-2026\` en `data\formation-2027\`.
2. Dans `content\formation-2027\_index.md` : modifier titre, `date`, `dates`, lieu, thèmes… (garder `edition: true` et le bloc `cascade`).
3. Remplacer `affiche.png` / `affiche.jpg`, et mettre à jour `programme.yaml` et `intervenants.yaml` dans `data\formation-2027\`.
4. Remplacer les dossiers de `content\formation-2027\formations\` par ceux de la nouvelle édition.

L'édition apparaît automatiquement dans `/formations/` et à la une de l'accueil (la plus récente).

## Publier

```powershell
git add .
git commit -m "Description de la modification"
git push
```

Ou dans GitHub Desktop : **Commit to main**, puis **Push origin**. Le site est à jour en une à deux minutes (onglet **Actions**).

## Aperçu local (facultatif)

Avec Hugo installé : `hugo server`, puis ouvrir http://localhost:1313.
