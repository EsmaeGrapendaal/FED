/**************************************************************/
/* Bron hamburger menu: https://codepen.io/shooft/pen/VwJXNEg */
/**************************************************************/
/********** Hoofdmenu openen **********/
const openButton = document.querySelector("header > button"); // stap 1: zoek de menu-button op en sla die op in een variabele
openButton.onclick = openMenu; // stap 2: laat de menu-button luisteren naar kliks en voer dan een functie uit


function openMenu() { // stap 3: voeg in de functie een class toe aan de nav
	// zoek de nav op
	let deNav = document.querySelector("header nav");
	// voeg class toe aan nav
	deNav.classList.add("toon-menu");
}

/********** Hoofdmenu sluiten **********/
const sluitButton = document.querySelector("header nav button"); // stap 1 - zoek sluiten button op
sluitButton.onclick = sluitMenu; // stap 2 - laat die button luisteren naar kliks
function sluitMenu() { // stap 3 - in de functie verwijder de class van de nav
	let deNav = document.querySelector("header nav");
	deNav.classList.remove("toon-menu");
}

/********** Hoofdmenu sluiten met escape **********/
window.onkeydown = handleKeydown;

function handleKeydown(event) {
	if (event.key == "Escape") {
		let deNav = document.querySelector("header nav");
		deNav.classList.remove("toon-menu");
	}
}

/********** Submenu openen **********/
const openSubMenuButton = document.querySelector("header nav ul li:nth-of-type(6) button");
openSubMenuButton.onclick = openSubMenu;


function openSubMenu() {
	let deSubNav = document.querySelector("header nav ul li:nth-of-type(6) ul.submenu");
	deSubNav.classList.add("toon-submenu");
}

/********** Submenu terug naar hoofdmenu **********/
const terugButton = document.querySelector("header nav ul li:nth-of-type(6) ul.submenu li:first-of-type button");
terugButton.onclick = sluitSubMenu;
function sluitSubMenu() {
	let deSubNav = document.querySelector("header nav ul li:nth-of-type(6) ul.submenu");
	deSubNav.classList.remove("toon-submenu");
}

//////////

/**************/
/* Transities */
/**************/
const transities = document.querySelector("main");

setTimeout(() => {
	transities.classList.add("visible");
}, 500);

//////////

/*********************************************************/
/* Bron carrousel: https://codepen.io/shooft/pen/yLKjzWa */
/*********************************************************/
function createHeroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
	let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
	let bolletjes = carrousel.querySelectorAll(":scope > nav a");
	let autoScrollInterval;

	/********** DE BOLLETJES **********/
	// De bolletjes activeren
	function iniBolletjes() {
		for (bolletje of bolletjes) { // elk bolletje laten luisteren naar kliks
			bolletje.addEventListener("click", function(e) { // als er geklikt wordt
				e.preventDefault(); // de default-actie (de link volgen) niet uitvoeren
				let newElement = carrousel.querySelector(this.hash); // het nieuwe element opzoeken
				scrollToElement(newElement); // dan naar het element met ID scrollen
				resetAutoScroll();
		});
		}
	}

	/********** SWIPEN **********/
	// werkt op touch devices (is te simuleren in de inspector)
	function iniSwipen() {
		let touchstartX = 0;
		let touchendX = 0;
		let touchstartY = 0;
		let touchendY = 0;
		// het begin van de swipe

		carrousel.addEventListener('touchstart', function(e) {
			// vastleggen waar de swipe is begonnen
			touchstartX = e.changedTouches[0].screenX;
			touchstartY = e.changedTouches[0].screenY;
		}, false);

		// het einde van de swipe
		carrousel.addEventListener('touchend', function(e) { // vastleggen waar de swipe is geeindigd
			touchendX = e.changedTouches[0].screenX;
			touchendY = e.changedTouches[0].screenY;
			// dan berekenen of en in welke richting
			handleGesture();
			resetAutoScroll();
		}, false);

		// berekenen of en in welke richting
		function handleGesture() { // de afgelegde afstand in X- en Y-richting bepalen
			let deltaX = touchendX - touchstartX;
			let deltaY = touchendY - touchstartY;
			// er is geswiped als de deltaX 5x zo groot is als deltaY, dat betekent een redelijk horizontale swipe
			if ( Math.abs(deltaX) > (Math.abs(deltaY) * 5) ) {
			// dan moet de afgelegde afstand ook nog groter zijn dan 30px
				if (deltaX > 30) {
					goToElement("previous"); // als de afstand positoef is dan is van links naar rechts geswiped
				}
				
				else if (deltaX < -30) {
					goToElement("next"); // als de afstand negatief is dan is van rechts naar links geswiped
				}
			}
		}
	}

	/********** AUTOMATISCH SCROLLEN **********/
	function startAutoScroll() {
		autoScrollInterval = setInterval(() => {
			goToElement("next");
		}, 10000);
	}

	function stopAutoScroll() {
		clearInterval(autoScrollInterval); // Stop de automatische scroll
	}

	function resetAutoScroll() {
		stopAutoScroll(); // Stop de huidige interval
		startAutoScroll(); // Start opnieuw
	}

	/********** START POSITIE **********/
	function iniStartPosition() { // het eerste element en bolletje actief maken
		carrouselElements[0].classList.add("current"); // eerste element current maken
		bolletjes[0].classList.add("current"); // eerste bolletje current maken
		carrouselElementsContainer.scrollLeft = 0; // aan het begin van de container starten
	}

	/********** ALGEMENE FUNCTIES **********/
	//////////////////////////////////
	// naar volgende/vorige element //
	function goToElement(direction) {
		let currentElement = carrousel.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		let newElement;
		if (direction == "previous") {
			newElement = currentElement.previousElementSibling; // het nieuwe element is het vorige broertje/zusje
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:last-of-type"); // checken of nieuwe element bestaat - anders naar laatste
			}
		} else {
			newElement = currentElement.nextElementSibling; // het nieuwe element is het volgende broertje/zusje
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:first-of-type"); // checken of nieuwe element bestaat - anders naar eerste
			}
		}
		scrollToElement(newElement); // naar het nieuwe element scrollen
	}

	///////////////////////////
	// scroll to new element //
	function scrollToElement(newElement) {
		let CarrouselElementsContainer = newElement.closest("ul"); // carrousel container opzoeken
		let newElementOffset = newElement.offsetLeft; // de linker offset van het nieuwe element bepalen

		CarrouselElementsContainer.scrollTo({
			left: newElementOffset // de carrousel naar de berekende positie scrollen
		});
		
		updateCurrentElement(newElement); // nieuwe element current element maken
		updateBolletjes(newElement); // de bolletjes updaten
	}

	////////////////////////////
	// update current element //
	function updateCurrentElement(newElement) {
		let currentElement = carrousel.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		currentElement.classList.remove("current"); // de class current verwijderen
		newElement.classList.add("current"); // aan nieuwe element de class current toevoegen
	}

	//////////////////////
	// update bolletjes //
	function updateBolletjes(newElement){
		let currentBolletje = carrousel.querySelector(":scope > nav .current"); // het huidige current bolletje opzoeken
		currentBolletje.classList.remove("current"); // de class current verwijderen
		let newBolletje = carrousel.querySelector("a[href='#"+newElement.id+"']"); // het nieuwe bolletje opzoeken
		newBolletje.classList.add("current"); // de class current toevoegen
	}

	/********** INITIALISATIE **********/
	iniBolletjes(); // de bolletjes activeren
	iniSwipen(); // swipen activeren 
	iniStartPosition(); // de carrousel bij het begin starten
	startAutoScroll(); // Automatisch scrollen starten
}

/********** DE CARROUSEL CREËREN **********/
// ChatGPT prompt: Kan je ook bepaalde functions creeren op bepaalde pagina's met javascript? Ik krijg anders errors
if (window.location.pathname === "./index.html") {
	(function() { // nadat de pagina geladen is, de carrousels activeren
		createHeroCarrousel("home-hero-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
		})();
}

//////////

/*********************************************************/
/* Bron carrousel: https://codepen.io/shooft/pen/yLKjzWa */
/*********************************************************/
function createActueelCarrousel(carrouselID2) {
	let carrousel2 = document.querySelector("#"+carrouselID2);
	let CarrouselElementsContainer2 = carrousel2.querySelector(":scope > ul");
	let carrouselElements2 = CarrouselElementsContainer2.querySelectorAll("li");
	let bolletjes2 = carrousel2.querySelectorAll(":scope > nav a");
	let autoScrollInterval2;

	/********** DE BOLLETJES **********/
	// De bolletjes activeren
	function iniBolletjes2() {
		for (bolletje2 of bolletjes2) { // elk bolletje laten luisteren naar kliks
			bolletje2.addEventListener("click", function(e) { // als er geklikt wordt
				e.preventDefault(); // de default-actie (de link volgen) niet uitvoeren
				let newElement2 = carrousel2.querySelector(this.hash); // het nieuwe element opzoeken
				scrollToElement2(newElement2); // dan naar het element met ID scrollen
				resetAutoScroll2();
		});
		}
	}

	/********** SWIPEN **********/
	// werkt op touch devices (is te simuleren in de inspector)
	function iniSwipen2() {
		let touchstartX2 = 0;
		let touchendX2 = 0;
		let touchstartY2 = 0;
		let touchendY2 = 0;
		// het begin van de swipe

		carrousel2.addEventListener('touchstart', function(e) {
			// vastleggen waar de swipe is begonnen
			touchstartX2 = e.changedTouches[0].screenX;
			touchstartY2 = e.changedTouches[0].screenY;
		}, false);

		// het einde van de swipe
		carrousel2.addEventListener('touchend', function(e) { // vastleggen waar de swipe is geeindigd
			touchendX2 = e.changedTouches[0].screenX;
			touchendY2 = e.changedTouches[0].screenY;
			// dan berekenen of en in welke richting
			handleGesture2();
			resetAutoScroll2();
		}, false);

		// berekenen of en in welke richting
		function handleGesture2() { // de afgelegde afstand in X- en Y-richting bepalen
			let deltaX2 = touchendX2 - touchstartX2;
			let deltaY2 = touchendY2 - touchstartY2;
			// er is geswiped als de deltaX 5x zo groot is als deltaY, dat betekent een redelijk horizontale swipe
			if ( Math.abs(deltaX2) > (Math.abs(deltaY2) * 5) ) {
			// dan moet de afgelegde afstand ook nog groter zijn dan 30px
				if (deltaX2 > 30) {
					goToElement2("previous"); // als de afstand positoef is dan is van links naar rechts geswiped
				}
				
				else if (deltaX2 < -30) {
					goToElement2("next"); // als de afstand negatief is dan is van rechts naar links geswiped
				}
			}
		}
	}

	/********** AUTOMATISCH SCROLLEN **********/
	function startAutoScroll2() {
		autoScrollInterval2 = setInterval(() => {
			goToElement2("next");
		}, 10000);
	}

	function stopAutoScroll2() {
		clearInterval(autoScrollInterval2); // Stop de automatische scroll
	}

	function resetAutoScroll2() {
		stopAutoScroll2(); // Stop de huidige interval
		startAutoScroll2(); // Start opnieuw
	}

	/********** START POSITIE **********/
	function iniStartPosition2() { // het eerste element en bolletje actief maken
		carrouselElements2[0].classList.add("current"); // eerste element current maken
		bolletjes2[0].classList.add("current"); // eerste bolletje current maken
		CarrouselElementsContainer2.scrollLeft = 0; // aan het begin van de container starten
	}

	/********** ALGEMENE FUNCTIES **********/
	//////////////////////////////////
	// naar volgende/vorige element //
	function goToElement2(direction) {
		let currentElement2 = carrousel2.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		let newElement2;
		if (direction == "previous") {
			newElement2 = currentElement2.previousElementSibling; // het nieuwe element is het vorige broertje/zusje
			if (!newElement2) {
				newElement2 = carrousel2.querySelector(":scope > ul > li:last-of-type"); // checken of nieuwe element bestaat - anders naar laatste
			}
		} else {
			newElement2 = currentElement2.nextElementSibling; // het nieuwe element is het volgende broertje/zusje
			if (!newElement2) {
				newElement2 = carrousel2.querySelector(":scope > ul > li:first-of-type"); // checken of nieuwe element bestaat - anders naar eerste
			}
		}
		scrollToElement2(newElement2); // naar het nieuwe element scrollen
	}

	///////////////////////////
	// scroll to new element //
	function scrollToElement2(newElement2) {
		let CarrouselElementsContainer2 = newElement2.closest("ul"); // carrousel container opzoeken
		let newElementOffset2 = newElement2.offsetLeft; // de linker offset van het nieuwe element bepalen

		CarrouselElementsContainer2.scrollTo({
			left: newElementOffset2 // de carrousel naar de berekende positie scrollen
		});
		
		updateCurrentElement2(newElement2); // nieuwe element current element maken
		updateBolletjes2(newElement2); // de bolletjes updaten
	}

	////////////////////////////
	// update current element //
	function updateCurrentElement2(newElement2) {
		let currentElement2 = carrousel2.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		currentElement2.classList.remove("current"); // de class current verwijderen
		newElement2.classList.add("current"); // aan nieuwe element de class current toevoegen
	}

	//////////////////////
	// update bolletjes //
	function updateBolletjes2(newElement2){
		let currentBolletje2 = carrousel2.querySelector(":scope > nav .current"); // het huidige current bolletje opzoeken
		currentBolletje2.classList.remove("current"); // de class current verwijderen
		let newBolletje2 = carrousel2.querySelector("a[href='#"+newElement2.id+"']"); // het nieuwe bolletje opzoeken
		newBolletje2.classList.add("current"); // de class current toevoegen
	}

	/********** INITIALISATIE **********/
	iniBolletjes2(); // de bolletjes activeren
	iniSwipen2(); // swipen activeren 
	iniStartPosition2(); // de carrousel bij het begin starten
	startAutoScroll2(); // Automatisch scrollen starten
}

/********** DE CARROUSEL CREËREN **********/
// ChatGPT prompt: Kan je ook bepaalde functions creeren op bepaalde pagina's met javascript? Ik krijg anders errors
if (window.location.pathname === "./index.html") {
	(function() { // nadat de pagina geladen is, de carrousels activeren
		createActueelCarrousel("actueel-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
		})();
}

//////////

/*********************************************************/
/* Bron carrousel: https://codepen.io/shooft/pen/yLKjzWa */
/*********************************************************/
function createLevelsCarrousel(carrouselID3) {
	let carrousel3 = document.querySelector("#"+carrouselID3);
	let CarrouselElementsContainer3 = carrousel3.querySelector(":scope > ul");
	let carrouselElements3 = CarrouselElementsContainer3.querySelectorAll("li");
	let bolletjes3 = carrousel3.querySelectorAll(":scope > nav a");
	let linkButtons3 = carrousel3.querySelectorAll(":scope > div a");

	/********** DE BOLLETJES **********/
	// De bolletjes activeren
	function iniBolletjes3() {
		for (bolletje3 of bolletjes3) { // elk bolletje laten luisteren naar kliks
			bolletje3.addEventListener("click", function(e) { // als er geklikt wordt
				e.preventDefault(); // de default-actie (de link volgen) niet uitvoeren
				let newElement3 = carrousel3.querySelector(this.hash); // het nieuwe element opzoeken
				scrollToElement3(newElement3); // dan naar het element met ID scrollen
		});
		}
	}

	/********** SWIPEN **********/
	// werkt op touch devices (is te simuleren in de inspector)
	function iniSwipen3() {
		let touchstartX3 = 0;
		let touchendX3 = 0;
		let touchstartY3 = 0;
		let touchendY3 = 0;
		// het begin van de swipe

		carrousel3.addEventListener('touchstart', function(e) {
			// vastleggen waar de swipe is begonnen
			touchstartX3 = e.changedTouches[0].screenX;
			touchstartY3 = e.changedTouches[0].screenY;
		}, false);

		// het einde van de swipe
		carrousel3.addEventListener('touchend', function(e) { // vastleggen waar de swipe is geeindigd
			touchendX3 = e.changedTouches[0].screenX;
			touchendY3 = e.changedTouches[0].screenY;
			// dan berekenen of en in welke richting
			handleGesture3();
		}, false);

		// berekenen of en in welke richting
		function handleGesture3() { // de afgelegde afstand in X- en Y-richting bepalen
			let deltaX3 = touchendX3 - touchstartX3;
			let deltaY3 = touchendY3 - touchstartY3;
			// er is geswiped als de deltaX 5x zo groot is als deltaY, dat betekent een redelijk horizontale swipe
			if ( Math.abs(deltaX3) > (Math.abs(deltaY3) * 5) ) {
			// dan moet de afgelegde afstand ook nog groter zijn dan 30px
				if (deltaX3 > 30) {
					goToElement3("vorige"); // als de afstand positoef is dan is van links naar rechts geswiped
				}
				
				else if (deltaX3 < -30) {
					goToElement3("volgende"); // als de afstand negatief is dan is van rechts naar links geswiped
				}
			}
		}
	}

	/********** Vorige/volgende knoppen **********/
	// de links/rechts link-buttons initialiseren en activeren
	function iniLinkButtons3() {
		for(linkButton3 of linkButtons3) {
			// beide link-buttins naar kliks laten luisteren
			linkButton3.addEventListener("click", function(e){
			// als er geklikt wordt
					// de default-actie (de link volgen) niet uitvoeren
					e.preventDefault();
	
					// bepalen of er op 'previous' of 'next' geklikt is
					let direction = this.getAttribute("href");
					// naar het element gaan
					goToElement3(direction);
			});
		}
	}

	/********** START POSITIE **********/
	function iniStartPosition3() { // het eerste element en bolletje actief maken
		carrouselElements3[0].classList.add("current"); // eerste element current maken
		bolletjes3[0].classList.add("current"); // eerste bolletje current maken
		CarrouselElementsContainer3.scrollLeft = 0; // aan het begin van de container starten
	}

	/********** ALGEMENE FUNCTIES **********/
	//////////////////////////////////
	// naar volgende/vorige element //
	function goToElement3(direction) {
		let currentElement3 = carrousel3.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		let newElement3;
		if (direction == "vorige") {
			newElement3 = currentElement3.previousElementSibling; // het nieuwe element is het vorige broertje/zusje
			if (!newElement3) {
				newElement3 = carrousel3.querySelector(":scope > ul > li:last-of-type"); // checken of nieuwe element bestaat - anders naar laatste
			}
		} else {
			newElement3 = currentElement3.nextElementSibling; // het nieuwe element is het volgende broertje/zusje
			if (!newElement3) {
				newElement3 = carrousel3.querySelector(":scope > ul > li:first-of-type"); // checken of nieuwe element bestaat - anders naar eerste
			}
		}
		scrollToElement3(newElement3); // naar het nieuwe element scrollen
	}

	///////////////////////////
	// scroll to new element //
	function scrollToElement3(newElement3) {
		let CarrouselElementsContainer3 = newElement3.closest("ul"); // carrousel container opzoeken
		let newElementOffset3 = newElement3.offsetLeft; // de linker offset van het nieuwe element bepalen

		CarrouselElementsContainer3.scrollTo({
			left: newElementOffset3 // de carrousel naar de berekende positie scrollen
		});
		
		updateCurrentElement3(newElement3); // nieuwe element current element maken
		updateBolletjes3(newElement3); // de bolletjes updaten
	}

	////////////////////////////
	// update current element //
	function updateCurrentElement3(newElement3) {
		let currentElement3 = carrousel3.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		currentElement3.classList.remove("current"); // de class current verwijderen
		newElement3.classList.add("current"); // aan nieuwe element de class current toevoegen
	}

	//////////////////////
	// update bolletjes //
	function updateBolletjes3(newElement3){
		let currentBolletje3 = carrousel3.querySelector(":scope > nav .current"); // het huidige current bolletje opzoeken
		currentBolletje3.classList.remove("current"); // de class current verwijderen
		let newBolletje3 = carrousel3.querySelector("a[href='#"+newElement3.id+"']"); // het nieuwe bolletje opzoeken
		newBolletje3.classList.add("current"); // de class current toevoegen
	}

	/********** INITIALISATIE **********/
	iniBolletjes3(); // de bolletjes activeren
	iniSwipen3(); // swipen activeren
	iniLinkButtons3(); // de carrousel bij het begin starten
	iniStartPosition3(); // de carrousel bij het begin starten
}

/********** DE CARROUSEL CREËREN **********/
// ChatGPT prompt: Kan je ook bepaalde functions creeren op bepaalde pagina's met javascript? Ik krijg anders errors
if (window.location.pathname === "./porsche-24.html") {
	(function() { // nadat de pagina geladen is, de carrousels activeren
		createLevelsCarrousel("levels-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
		})();
}

//////////

/*********************************************************/
/* Bron carrousel: https://codepen.io/shooft/pen/yLKjzWa */
/*********************************************************/
function createAftermoviesCarrousel(carrouselID4) {
	let carrousel4 = document.querySelector("#"+carrouselID4);
	let CarrouselElementsContainer4 = carrousel4.querySelector(":scope > ul");
	let carrouselElements4 = CarrouselElementsContainer4.querySelectorAll("li");
	let bolletjes4 = carrousel4.querySelectorAll(":scope > nav a");

	/********** DE BOLLETJES **********/
	// De bolletjes activeren
	function iniBolletjes4() {
		for (bolletje4 of bolletjes4) { // elk bolletje laten luisteren naar kliks
			bolletje4.addEventListener("click", function(e) { // als er geklikt wordt
				e.preventDefault(); // de default-actie (de link volgen) niet uitvoeren
				let newElement4 = carrousel4.querySelector(this.hash); // het nieuwe element opzoeken
				scrollToElement4(newElement4); // dan naar het element met ID scrollen
		});
		}
	}

	/********** SWIPEN **********/
	// werkt op touch devices (is te simuleren in de inspector)
	function iniSwipen4() {
		let touchstartX4 = 0;
		let touchendX4 = 0;
		let touchstartY4 = 0;
		let touchendY4 = 0;
		// het begin van de swipe

		carrousel4.addEventListener('touchstart', function(e) {
			// vastleggen waar de swipe is begonnen
			touchstartX4 = e.changedTouches[0].screenX;
			touchstartY4 = e.changedTouches[0].screenY;
		}, false);

		// het einde van de swipe
		carrousel4.addEventListener('touchend', function(e) { // vastleggen waar de swipe is geeindigd
			touchendX4 = e.changedTouches[0].screenX;
			touchendY4 = e.changedTouches[0].screenY;
			// dan berekenen of en in welke richting
			handleGesture4();
		}, false);

		// berekenen of en in welke richting
		function handleGesture4() { // de afgelegde afstand in X- en Y-richting bepalen
			let deltaX4 = touchendX4 - touchstartX4;
			let deltaY4 = touchendY4 - touchstartY4;
			// er is geswiped als de deltaX 5x zo groot is als deltaY, dat betekent een redelijk horizontale swipe
			if ( Math.abs(deltaX4) > (Math.abs(deltaY4) * 5) ) {
			// dan moet de afgelegde afstand ook nog groter zijn dan 40px
				if (deltaX4 > 40) {
					goToElement4("vorige"); // als de afstand positoef is dan is van links naar rechts geswiped
				}
				
				else if (deltaX4 < -40) {
					goToElement4("volgende"); // als de afstand negatief is dan is van rechts naar links geswiped
				}
			}
		}
	}

	/********** START POSITIE **********/
	function iniStartPosition4() { // het eerste element en bolletje actief maken
		carrouselElements4[0].classList.add("current"); // eerste element current maken
		bolletjes4[0].classList.add("current"); // eerste bolletje current maken
		CarrouselElementsContainer4.scrollLeft = 0; // aan het begin van de container starten
	}

	/********** ALGEMENE FUNCTIES **********/
	//////////////////////////////////
	// naar volgende/vorige element //
	function goToElement4(direction) {
		let currentElement4 = carrousel4.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		let newElement4;
		if (direction == "vorige") {
			newElement4 = currentElement4.previousElementSibling; // het nieuwe element is het vorige broertje/zusje
			if (!newElement4) {
				newElement4 = carrousel4.querySelector(":scope > ul > li:last-of-type"); // checken of nieuwe element bestaat - anders naar laatste
			}
		} else {
			newElement4 = currentElement4.nextElementSibling; // het nieuwe element is het volgende broertje/zusje
			if (!newElement4) {
				newElement4 = carrousel4.querySelector(":scope > ul > li:first-of-type"); // checken of nieuwe element bestaat - anders naar eerste
			}
		}
		scrollToElement4(newElement4); // naar het nieuwe element scrollen
	}

	///////////////////////////
	// scroll to new element //
	function scrollToElement4(newElement4) {
		let CarrouselElementsContainer4 = newElement4.closest("ul"); // carrousel container opzoeken
		let newElementOffset4 = newElement4.offsetLeft; // de linker offset van het nieuwe element bepalen

		CarrouselElementsContainer4.scrollTo({
			left: newElementOffset4 // de carrousel naar de berekende positie scrollen
		});
		
		updateCurrentElement4(newElement4); // nieuwe element current element maken
		updateBolletjes4(newElement4); // de bolletjes updaten
	}

	////////////////////////////
	// update current element //
	function updateCurrentElement4(newElement4) {
		let currentElement4 = carrousel4.querySelector(":scope > ul > .current"); // het huidige current element opzoeken
		currentElement4.classList.remove("current"); // de class current verwijderen
		newElement4.classList.add("current"); // aan nieuwe element de class current toevoegen
	}

	//////////////////////
	// update bolletjes //
	function updateBolletjes4(newElement4){
		let currentBolletje4 = carrousel4.querySelector(":scope > nav .current"); // het huidige current bolletje opzoeken
		currentBolletje4.classList.remove("current"); // de class current verwijderen
		let newBolletje4 = carrousel4.querySelector("a[href='#"+newElement4.id+"']"); // het nieuwe bolletje opzoeken
		newBolletje4.classList.add("current"); // de class current toevoegen
	}

	/********** INITIALISATIE **********/
	iniBolletjes4(); // de bolletjes activeren
	iniSwipen4(); // swipen activeren
	iniStartPosition4(); // de carrousel bij het begin starten
}

/********** DE CARROUSEL CREËREN **********/
// ChatGPT prompt: Kan je ook bepaalde functions creeren op bepaalde pagina's met javascript? Ik krijg anders errors
if (window.location.pathname === "./porsche-24.html") {
	(function() { // nadat de pagina geladen is, de carrousels activeren
		createAftermoviesCarrousel("aftermovies-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
		})();
}

//////////

/*******************/
/* Tekst vergroten */
/*******************/
const body = document.body;
const tekstVergrotenButton = document.querySelector('.tekst-grootte');

tekstVergrotenButton.addEventListener('click', tekstGrootte);

function tekstGrootte(){
	body.classList.toggle('tekst-groot');
	if(tekstVergrotenButton.textContent == "Tekst vergroten"){
		tekstVergrotenButton.textContent = "Tekst verkleinen";
	} else{
		tekstVergrotenButton.textContent = "Tekst vergroten";
	}
}

//////////

/*****************************/
/* Porsche24 pagina nav lijn */
/*****************************/
// Bron: Bahaa Salaymeh tijdens voortgangsgesprek geholpen + ChatGPT gevraagd of hij ervoor kon zorgen dat het aangepast wordt per a
// ChatGPT prompt: Eerst had ik de code van Bahaa veranderd en toen aan ChatGPT gevraagd wat ik moest aanpassen om ervoor te zorgen dat hij de border-bottom switch van a naar a (.porsche-24-pagina main > nav ul li a)

const navLijnen = document.querySelectorAll('#porsche24, #porsche24-levels, #download-de-app, #aftermovies, #veelgestelde-vragen');
const links = document.querySelectorAll('.porsche-24-pagina main > nav ul li a');

window.addEventListener('scroll', () => {
	navLijnen.forEach((navLijn, index) => {
		const rect = navLijn.getBoundingClientRect();
		if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.	innerHeight / 2) {
			links.forEach(link => link.style.borderBottom = 'none');
			const kleur = navLijn.getAttribute('data-kleur');
			if (kleur) {
			    links[index].style.borderBottom = `2px solid ${kleur}`;
			}
		}
	});
});

//////////

/*************************************/
/* Porsche24 pagina videos + knoppen */
/*************************************/
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
const videos = document.querySelectorAll('.video-afspeler');
const videoKnoppen = document.querySelectorAll('.afspelen-pauze-knop');

videoKnoppen.forEach((videoKnop, index) => {
	const video = videos[index];

	videoKnop.addEventListener('click', () => {
		if (video.paused) {
			video.play();
			videoKnop.textContent = 'Pauzeren';
		} else {
			video.pause();
			videoKnop.textContent = 'Afspelen';
		}
	});
});