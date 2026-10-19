// Onglets du programme + mise en évidence de la séance en cours (heure de Tétouan).
(function () {
  var onglets = document.querySelectorAll('.onglets [role="tab"]');
  if (!onglets.length) return;

  function choisir(bouton) {
    onglets.forEach(function (b) {
      var actif = b === bouton;
      b.setAttribute('aria-selected', actif ? 'true' : 'false');
      b.tabIndex = actif ? 0 : -1;
      var panneau = document.getElementById(b.getAttribute('aria-controls'));
      if (panneau) { if (actif) panneau.removeAttribute('data-masque'); else panneau.setAttribute('data-masque', ''); }
    });
  }
  onglets.forEach(function (b, i) {
    b.addEventListener('click', function () { choisir(b); });
    b.addEventListener('keydown', function (e) {
      var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
      if (j === null) return;
      var cible = onglets[(j + onglets.length) % onglets.length];
      choisir(cible); cible.focus(); e.preventDefault();
    });
  });

  // Date et heure actuelles à Tétouan, au format "AAAA-MM-JJTHH:MM"
  function maintenant() {
    try {
      var p = {};
      new Intl.DateTimeFormat('fr-CA', { timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      return p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute;
    } catch (e) { return null; }
  }

  function actualiser() {
    var t = maintenant();
    if (!t) return;
    var jour = t.slice(0, 10);
    document.querySelectorAll('.creneau').forEach(function (c) {
      var d = c.dataset.debut, f = c.dataset.fin;
      var enCours = d <= t && (f ? t < f : t.slice(0, 10) === d.slice(0, 10) && t < d.slice(0, 11) + '13:00');
      var passe = f ? t >= f : false;
      c.classList.toggle('en-cours', enCours);
      c.classList.toggle('passe', passe && !enCours);
      var badge = c.querySelector('.badge-en-cours');
      if (badge) badge.hidden = !enCours;
    });
    onglets.forEach(function (b) { b.classList.toggle('aujourdhui', b.dataset.date === jour); });
    return jour;
  }

  var jour = actualiser();
  var auj = jour && document.querySelector('.onglets [data-date="' + jour + '"]');
  if (auj) choisir(auj);
  setInterval(actualiser, 60000);
})();
