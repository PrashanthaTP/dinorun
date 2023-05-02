import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./utils.js";

const SPEED = 0.05; //same as ground
const CACTUS_INTERVAL_MIN = 500;
const CACTUS_INTERVAL_MAX = 2000;
const worldElem = document.querySelector( "[data-world]" );

let nextCactusTime
export const setupCactus = () => {
	nextCactusTime = CACTUS_INTERVAL_MIN
	document.querySelectorAll( "[data-cactus]" ).forEach( cactus => {
		cactus.remove()
	})
};
export const updateCactus = ( delta, speedScale ) => {
	document.querySelectorAll( "[data-cactus" ).forEach( cactus => {
		incrementCustomProperty( cactus, "--left", delta * speedScale * SPEED * -1 )
		if ( getCustomProperty( cactus, "--left" ) <= -100 ) {
			cactus.remove()
		}
	} )
	if ( nextCactusTime <= 0 ) {
		createCactus()
		nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX)/speedScale
	}
	nextCactusTime -= delta
};

const createCactus = () => {
	const cactus = document.createElement( "img" )
	cactus.dataset.cactus = true;
	cactus.src = "assets/cactus.png"
	cactus.classList.add( "cactus" )
	setCustomProperty(cactus,"--left",100)//put at right side of screeen
	worldElem.append(cactus)
}

export const getCactusRects = () => {
	return [ ...document.querySelectorAll( "[data-cactus]" ) ].map( cactus => {
		return cactus.getBoundingClientRect()
	} );
}

const randomNumberBetween = ( min, max ) => {
	return Math.floor(Math.random()*(max-min+1) + min)
}
