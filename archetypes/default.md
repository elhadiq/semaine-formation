---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
resume: ""
# Fichiers du dossier : titres affichés (facultatif). Ordre = ordre des noms (01-, 02-…).
# resources:
#   - src: "01-mon-fichier.pdf"
#     title: "Titre affiché"
draft: false
---

Texte de la page.
