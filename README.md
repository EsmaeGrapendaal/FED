# Procesverslag
Markdown is een simpele manier om HTML te schrijven.
Markdown cheat cheet: [Hulp bij het schrijven van Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Nb. De standaardstructuur en de spartaanse opmaak van de README.md zijn helemaal prima. Het gaat om de inhoud van je procesverslag. Besteedt de tijd voor pracht en praal aan je website.

Nb. Door *open* toe te voegen aan een *details* element kun je deze standaard open zetten. Fijn om dat steeds voor de relevante stuk(ken) te doen.



## Jij

<details>
  <summary>Uitwerken voor kick-off werkgroep</summary>

  ### Auteur:
  Esmae Grapendaal

  #### Je startniveau:
  Blauw/Rood

  #### Je focus:
  Surface plane
</details>



## Je website

<details>
  <summary>Uitwerken voor kick-off werkgroep</summary>

  ### Je opdracht:
  Voor mijn opdracht wil ik de website van [Porsche Nederland](https://www.porsche.com/netherlands/nl/ "Porsche Nederland") maken.

  #### Screenshot(s) van de eerste pagina (small screen): 
  [Home | Porsche Nederland](https://www.porsche.com/netherlands/nl/ "Porsche's Homepage")
  <img src="readme-images/home-porsche-nederland.png" width="375px" alt="Home pagina van de website van Porsche Nederland">

  #### Screenshot(s) van de tweede pagina (small screen):
  [Porsche24. | Porsche Nederland](https://www.porsche.com/netherlands/nl/motorsportandevents/porsche24/ "Porsche24. pagina")
  <img src="readme-images/Porsche24-porsche-nederland.png" width="375px" alt="Porsche24. pagina van de website van Porsche Nederland">

</details>



## Toegankelijkheidstest 1/2 (week 1)

<details>
  <summary>Uitwerken na test in 2<sup>e</sup> werkgroep</summary>

  ### Lijst met bevindingen
  #### Screenreader test:
  * **Kopstructuur:**
    * Koppen van niveau 1 en 2 worden goed voorgelezen met niveau-aanduiding, wat storend kan zijn als dit meerdere keren wordt herhaald.
    * Footer-koppen worden niet herkend door de screenreader, omdat deze als `<div>` in plaats van bijvoorbeeld `<h4>` zijn geschreven.
  * **Linkbeschrijvingen:**
    * Niet alle links geven duidelijk aan waar ze naartoe leiden, vooral in de hero-sectie.

  #### WCAG checklist:
  * **Content**
      * Gebruik van eenvoudige taal en unieke, beschrijvende content voor knoppen en links is goed.
  * **Globale Code:**
      * HTML is gevalideerd en heeft wat info, warning en errors.
      * Heeft een unieke titel voor elke pagina en het gebruik van een lang-attribuut.
  * Toetsenbordnavigatie:
      * Navigatie-elementen hebben zichtbare focusstijlen en de focusvolgorde komt overeen met de visuele lay-out.
  * **Mobiel en Touch:**
      * Website ondersteunt oriëntatierotatie en vermijdt horizontaal scrollen.
      * Interactieve elementen zijn goed gepositioneerd en gemakkelijk te activeren.
  * **Koppen**
      * Koppen zijn logisch en volgen een juiste hiërarchie, maar footer-items worden niet als koppen herkend.
  * **Lijsten**
      * Lijstinhoud maakt correct gebruik van lijst-elementen zoals `<ul>` en `<ol>`.
  * **Afbeeldingen**
      * Afbeeldingen hebben een alt-attribuut, maar afbeeldingen met tekst missen een volledige beschrijving.
      * Decoratieve afbeeldingen gebruiken correct een lege alt.
  * **Media (Video & Audio)**
      * Media speelt automatisch af, er is wel een mogelijkheid om te pauzeren.
      * Er zijn geen video-onderschriften of audio-transcripties beschikbaar.
  * **Controls**
      * Links en knoppen zijn herkenbaar en hebben een focusstijl.
      * Skip-links zijn niet duidelijk zichtbaar.
  * **Uiterlijk**
      * Ondersteuning voor dark mode en high-contrast mode ontbreekt. Wel via de Chrome accessibility. 
      * Tekst kan worden vergroot tot 200% zonder problemen.
  * **Animaties**
      * Animaties blijven actief, zelfs als reduced-motion is ingeschakeld.
  * **Kleurcontrast**
      * Contrasten zijn over het algemeen goed, maar witte tekst op een witte achtergrond is soms moeilijk leesbaar. Dit is bij sommige afbeeldingen.
</details>



## Breakdownschets (week 1)

<details>
  <summary>Uitwerken na afloop 3<sup>e</sup> werkgroep</summary>

  ### De hele pagina:
  <img src="readme-images/Breakdownschets-Home-Porsche-Nederland.jpg" width="375px" alt="breakdown van de hele home pagina">

  ### Dynamisch deel (bijv menu): 
  <img src="readme-images/dummy-plaatje.jpg" width="375px" alt="breakdown van een dynamisch deel">

  ### Wellicht nog een dynamisch deel (bijv filter): 
  <img src="readme-images/dummy-plaatje.jpg" width="375px" alt="breakdown van nog een dynamisch deel">

</details>





## Voortgang 1 (week 2)

<details open>
  <summary>Uitwerken voor 1<sup>e</sup> voortgang</summary>

  ### Stand van zaken
  Hier dit ging goed & dit was lastig (neem ook screenshots op van delen van je website en code)


  ### Agenda voor meeting
  | Esmae | student 2 | student 3 | student 4 |
  | --- | --- | --- | --- |
  | Carrousel slider | en dit | en ik dit | en dan ik dat |
  | en dat ook nog | dit als er tijd is | nog een punt | dit wil ik zeker |
  | ... | ... | ... | ... |


  ### Verslag van meeting
  * Maak de H1 onzichtbaar met visibility hidden op de home pagina
  * Voor een article > Eerst een h5, p, img, button. Verander de volgorde met order in de css. Zo blijft alles hetzelfde in de html maar met de styling wordt het veranderd.
  * In de Hero wordt de heading een h3 en dan een hidden h2
  * Voor de carousel worden de items in een ul gezet
  * HR wordt gewoon border-top en border-bottom
  * Footer h4 worden h3 en dan ook weer een hidden h2
  * Voor de accordeon gebruik je details en summary
  * Social media links worden een flex ipv grid

</details>





## Voortgang 2 (week 3)

<details open>
  <summary>Uitwerken voor 2<sup>e</sup> voortgang</summary>

  ### Stand van zaken
  Hier dit ging goed & dit was lastig (neem ook screenshots op van delen van je website en code)

  #### Wat ging goed?
  * **Afbeeldingen en tekst combineren zonder `background-image`**<br>
    Soms zijn er afbeeldingen met tekst, hiervoor kon ik geen `background-image` gebruiken vanwege toegankelijkheid. Hiervoor moest je `position` gebruiken om de tekst over de `img` te zetten.

  #### Wat was lastig?
  * **Logo centreren in de header**<br>
    Ik kon maar het logo niet precies in het midden krijgen. Ik heb hiervoor `flex` moeten gebruiken om het logo een soort stretch te geven, maar dat de buitenste elementen wel tegen de rand blijven staan.
  * **Hero carrousel maken**<br>
  Hiervoor heb ik een code kunnen gebruiken van Sanne. Ik heb wel gekeken naar de code zodat ik wel begrijp wat alles betekent. Ik vind het Javascript gedeelte wel nog lastig om helemaal te begrijpen.

  ### Agenda voor meeting
  samen met je groepje opstellen

  | Esmae | student 2 | student 3 | student 4 |
  | --- | --- | --- | --- |
  | Eigen tekst per slide bij home pagina (Hero) | en dit | en ik dit | en dan ik dat |
  | Navigatie bij Porsche24 pagina | nog een punt | dit wil ik zeker |
  | Andere soort slider bij Porsche24 pagina | ... | ... | ... |


  ### Verslag van meeting
  * punt 1
  * punt 2
  * nog een punt
  * ...

</details>





## Toegankelijkheidstest 2/2 (week 4)

<details>
  <summary>Uitwerken na test in 9<sup>e</sup> werkgroep</summary>

  ### Bevindingen
  Lijst met je bevindingen die in de test naar voren kwamen (geef ook aan wat er verbeterd is):

</details>





## Voortgang 3 (week 4)

<details>
  <summary>Uitwerken voor 3<sup>e</sup> voortgang</summary>

  ### Stand van zaken
  hier dit ging goed & dit was lastig (neem ook screenshots op van delen van je website en code)


  ### Agenda voor meeting
  samen met je groepje opstellen

  | student 1      | student 2          | student 3    | student 4        |
  | ---            | ---                | ---          | ---              |
  | dit bespreken  | en dit             | en ik dit    | en dan ik dat    |
  | en dat ook nog | dit als er tijd is | nog een punt | dit wil ik zeker |
  | ...            | ...                | ...          | ...              |


  ### Verslag van meeting
  hier na afloop snel de uitkomsten van de meeting vastleggen

  - punt 1
  - punt 2
  - nog een punt
  - ...

</details>





## Eindgesprek (week 5)

<details>
  <summary>Uitwerken voor eindgesprek</summary>

  ### Je uitkomst - karakteristiek screenshots:
  <img src="readme-images/dummy-plaatje.jpg" width="375px" alt="uitomst opdracht 1">


  ### Dit ging goed/Heb ik geleerd: 
  Korte omschrijving met plaatjes

  <img src="readme-images/dummy-plaatje.jpg" width="375px" alt="top">


  ### Dit was lastig/Is niet gelukt:
  Korte omschrijving met plaatjes

  <img src="readme-images/dummy-plaatje.jpg" width="375px" alt="bummer">
</details>





## Bronnenlijst

<details open>
  <summary>continu bijhouden terwijl je werkt</summary>

  Nb. Wees specifiek ('css-tricks' als bron is bijv. niet specifiek genoeg). 
  Nb. ChatGpT en andere AI horen er ook bij.
  Nb. Vermeld de bronnen ook in je code.

  1. bron 1
  2. bron 2
  3. ...

</details>
