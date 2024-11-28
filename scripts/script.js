/*********************************************************/
/* Bron carrousel: https://codepen.io/shooft/pen/yLKjzWa */
/*********************************************************/
function createHeroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
	let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
	let bolletjes = carrousel.querySelectorAll(":scope > nav a");
	let linkButtons = carrousel.querySelectorAll(":scope > a");

	/********** DE BOLLETJES **********/
	// De bolletjes activeren
	function iniBolletjes() {
		for (bolletje of bolletjes) { // elk bolletje laten luisteren naar kliks
			bolletje.addEventListener("click", function(e) { // als er geklikt wordt
				e.preventDefault(); // de default-actie (de link volgen) niet uitvoeren
				let newElement = carrousel.querySelector(this.hash); // het nieuwe element opzoeken
				scrollToElement(newElement); // dan naar het element met ID scrollen
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

	iniBolletjes(); // de bolletjes activeren
	iniSwipen(); // swipen activeren 
	iniStartPosition(); // de carrousel bij het begin starten
}

/********** DE CARROUSEL CREËREN **********/
(function() { // nadat de pagina geladen is, de carrousels activeren
	createHeroCarrousel("home-hero-slider"); // hier de id gebruiken van de section in de html (je kunt hier ook meerdere carrousellen activeren)
})();
