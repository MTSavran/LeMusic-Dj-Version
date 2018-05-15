console.clear();
var slider = document.getElementById("slider");
slider.innerHTML = slider.value; // Display the default slider value


var slider2 = document.getElementById("slider2");
slider2.innerHTML = slider2.value; // Display the default slider value

var statusMessage = document.getElementById('status');

var player = document.getElementById('player');

var distanceFromTop = player.getBoundingClientRect().top;
var desiredOffsetFromTop = 400; //90 px, which is 1.5 times the height of the info bar. 
player.style.transform = translateObjectPixels(-200,-distanceFromTop + desiredOffsetFromTop);

var controlPanel = document.getElementById('control-panel');
var controlPanelRect = controlPanel.getBoundingClientRect();



playerBoard.get('ships').forEach(function(ship,i,j){
	ship.attributes.screenPosition[0] = controlPanelRect.x + controlPanelRect.width + 20;
	ship.attributes.startPosition[0] = controlPanelRect.x + controlPanelRect.width + 20;
	ship.attributes.screenPosition[1] = 0 + (i+2)*100;
	ship.attributes.startPosition[1] = 0 + (i+2)*100;

});

var albumArt = document.getElementById('album-art');
console.log(albumArt);
console.log(albumArt.getBoundingClientRect());
albumArt.style.transform = translateObjectPixels(-20,-desiredOffsetFromTop + 20);
var albumArtRect = albumArt.getBoundingClientRect();
var radius = albumArtRect.width/2;
var centerX = albumArtRect.x + albumArtRect.width/2 
var centerY = albumArtRect.y + albumArtRect.height/2
centerX = centerX - 20;
centerY = centerY + (- desiredOffsetFromTop + 20); 
console.log(centerX);
console.log(centerY);



var player2 = document.getElementById('player2');

var distanceFromTop = player2.getBoundingClientRect().top;
player2.style.transform = translateObjectPixels(200,-distanceFromTop + desiredOffsetFromTop);

var controlPanel2 = document.getElementById('control-panel2');
var controlPanelRect2 = controlPanel2.getBoundingClientRect();


var albumArt2 = document.getElementById('album-art2');
console.log(albumArt2);
albumArt2.style.transform = translateObjectPixels(-20,-desiredOffsetFromTop + 20);
var albumArtRect2 = albumArt2.getBoundingClientRect();
var centerX2 = albumArtRect2.x + albumArtRect2.width/2 
var centerY2 = albumArtRect2.y + albumArtRect2.height/2
centerX2 = centerX2 - 20;
centerY2 = centerY2 + (- desiredOffsetFromTop + 20); 
console.log(centerX2);
console.log(centerY2);


var windowWidth = document.documentElement.clientWidth;
console.log(windowWidth);

function translateObjectPixels(x,y) {
	return "translate(" + x +"px, " + y + "px)";
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    slider.innerHTML = this.value;
    newVolume = this.value/100;
    audio.volume = newVolume;
}

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
    slider2.innerHTML = this.value;
    newVolume = this.value/100;
    audio2.volume = newVolume;
}





class musicPlayer {
	constructor() {
		this.play = this.play.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.playBtn = document.getElementById('play');
		this.nextBtn = document.getElementById('next');
		this.prevBtn = document.getElementById('prev');
		this.playBtn.addEventListener('click', this.play);
		this.nextBtn.addEventListener('click',this.next);
		this.prevBtn.addEventListener('click',this.prev);
		this.controlPanel = document.getElementById('control-panel');
		this.infoBar = document.getElementById('info');	
	}

	play() {
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
			if (element !== "active"){
				audio.play();
				controlPanelObj.classList.add('active');
				var songName = songList[songIndex];
				var artistName = artistList[songIndex];
				var artWorkFile = artWorkList[songIndex];
				document.getElementById('name').innerHTML = songName;
				document.getElementById('artist').innerHTML = artistName;
				$('head').append('<style>.player .control-panel .album-art::before{background-image: url("artworks/' + artWorkFile +'");}</style>');
				
			}
			else {
				audio.pause();
				controlPanelObj.classList.remove('active');
			}});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 		infoBarObj.classList.remove('active');
			});

	}

	next() {
		if (!shuffleOn) {
		songIndex = songIndex + 1;
		songIndex = songIndex % songList.length;
		}
		else {
		var randomIndex = Math.floor(Math.random() * songList.length);
		songIndex = randomIndex;
		}
		audio.src = songRoot + songList[songIndex];
		console.log('new audio src is: ' + audio.src);
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
					return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
			});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 	infoBarObj.classList.remove('active');
			});
		this.play();
	}

	prev() {
		songIndex = Math.max(0,songIndex - 1);
		audio.src = songRoot + songList[songIndex];
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
					return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
			});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 	infoBarObj.classList.remove('active');
			});
		this.play();
	}
}

const newMusicplayer = new musicPlayer();


class musicPlayer2 {
	constructor() {
		this.play = this.play.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.playBtn = document.getElementById('play2');
		this.nextBtn = document.getElementById('next2');
		this.prevBtn = document.getElementById('prev2');
		this.playBtn.addEventListener('click', this.play);
		this.nextBtn.addEventListener('click',this.next);
		this.prevBtn.addEventListener('click',this.prev);
		this.controlPanel = document.getElementById('control-panel2');
		this.infoBar = document.getElementById('info2');	
	}

	play() {
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
			if (element !== "active"){
				audio2.play();
				controlPanelObj.classList.add('active');
				var songName = songList[songIndex2];
				var artistName = artistList[songIndex2];
				var artWorkFile = artWorkList[songIndex2];
				document.getElementById('name2').innerHTML = songName;
				document.getElementById('artist2').innerHTML = artistName;
				$('head').append('<style>.player2 .control-panel2 .album-art2::before{background-image: url("artworks/' + artWorkFile +'");}</style>');
				
			}
			else {
				audio2.pause();
				controlPanelObj.classList.remove('active');
			}});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 		infoBarObj.classList.remove('active');
			});

	}

	next() {
		if (!shuffleOn) {
		songIndex2 = songIndex2 + 1;
		songIndex2 = songIndex2 % songList.length;
		}
		else {
		var randomIndex = Math.floor(Math.random() * songList.length);
		songIndex2 = randomIndex;
		}
		audio2.src = songRoot + songList[songIndex2];
		console.log('new audio src is: ' + audio2.src);
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
					return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
			});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 	infoBarObj.classList.remove('active');
			});
		this.play();
	}

	prev() {
		songIndex2 = Math.max(0,songIndex2 - 1);
		audio2.src = songRoot + songList[songIndex2];
		let controlPanelObj = this.controlPanel,
		infoBarObj = this.infoBar
		Array.from(controlPanelObj.classList).find(function(element){
					return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
			});
		
		Array.from(infoBarObj.classList).find(function(element){
					return element !== "active" ? infoBarObj.classList.add('active') : 	infoBarObj.classList.remove('active');
			});
		this.play();
	}
}

const newMusicplayer2 = new musicPlayer2();





























