# Semaine de Formation Académique — ajouter des ressources à un cours

Site en ligne : **https://info-cpge.men**

Ajouter une ressource à un cours se fait en 3 gestes : **déposer le fichier, lui donner un titre (facultatif), publier**.

Exemple ci-dessous avec le cours **Théorie des graphes**.

## 1. Déposer le fichier dans le dossier du cours

Copier le fichier dans :

```
site-formation\content\formations\theorie-des-graphes\
```

Règles de nommage :

- **Préfixer par un numéro** pour fixer l'ordre d'affichage : `01-cours-graphes.pdf`, `02-tp-parcours.ipynb`, `03-exercices.pdf`.
- **Pas d'espaces ni d'accents**, utiliser des tirets : `02-tp-dijkstra.ipynb` plutôt que `TP Dijkstra (final).ipynb`.

Formats reconnus : PDF, notebooks `.ipynb`, PowerPoint, Word, ZIP, `.py`, `.ml` (OCaml), `.sql`, `.csv`, `.xlsx`, `.html`.

Le fichier apparaît **automatiquement** sur la page du cours. Sans titre, le site affiche son nom nettoyé (« Cours graphes »).

## 2. (Facultatif) Lui donner un titre lisible

Ouvrir `theorie-des-graphes\index.md` et ajouter un bloc `resources:` dans l'en-tête, entre les deux lignes `---` :

```yaml
---
title: "Théorie des graphes"
domaine: "Graphes"
intervenants: [essaddouki]
weight: 50
resume: "Théorie des graphes pour l'enseignement en classes préparatoires."
resources:
  - src: "01-cours-graphes.pdf"
    title: "Support de cours — Théorie des graphes"
  - src: "02-tp-dijkstra.ipynb"
    title: "TP — Plus courts chemins avec Dijkstra"
---
```

- Le nom après `src:` doit correspondre **exactement** au nom du fichier.
- Garder l'indentation à 2 espaces : en YAML, un décalage casse la publication.

Le texte sous le second `---` (objectifs, prérequis…) s'affiche sur la page du cours.

## 3. Publier

Dans PowerShell, depuis `site-formation` :

```powershell
git add .
git commit -m "Ajout des supports Théorie des graphes"
git push
```

Ou dans GitHub Desktop : **Commit to main**, puis **Push origin**.

En une à deux minutes, l'onglet **Actions** passe au vert et les fichiers sont en ligne sur `info-cpge.men/formations/theorie-des-graphes/`, avec le bouton « Ouvrir dans Colab » pour les notebooks.

## Remplacer ou retirer une ressource

- **Remplacer :** écraser le fichier en gardant le même nom, puis publier.
- **Retirer :** supprimer le fichier, retirer son entrée `- src:` dans `index.md` s'il en avait une, puis publier.

## Structure des adresses

- `https://info-cpge.men/` : page générale, fichier `racine/index.html` (HTML simple, à modifier directement).
- `https://info-cpge.men/formation-2026/` : site de la formation, généré par Hugo à partir de `content/`, `data/` et `hugo.toml`.

Tout fichier ajouté dans `racine/` est publié à la racine du domaine (ex. `racine/contact.html` → `info-cpge.men/contact.html`).
