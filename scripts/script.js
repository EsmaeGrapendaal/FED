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
(function() { // nadat de pagina geladen is, de carrousels activeren
createHeroCarrousel("home-hero-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
})();

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
(function() { // nadat de pagina geladen is, de carrousels activeren
createActueelCarrousel("actueel-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
})();





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