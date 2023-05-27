const buttonColours = [ 'red', 'blue', 'green', 'yellow' ];
let gamePattern = [];
let userClickedPattern = [];
let isGameOver = true;
let count = 0;
// Detecting Click on Buttons
$('.btn').click(function() {
	let userChosenColour = this.id;

	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];

	$('h1').text(`Level ${count}`);

	count++;

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	let audio = new Audio(`./sounds/${name}.mp3`);
	audio.play();
}

function animatePress(currentColour) {
	$(`#${currentColour}`).addClass('pressed');
	setTimeout(function() {
		$(`#${currentColour}`).removeClass('pressed');
	}, 100);
}
// Key Event To Start or Restart The Game!
$(document).keypress(function() {
	if (isGameOver) {
		nextSequence();
	}
	isGameOver = false;
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	} else {
		playSound('wrong');
		$('body').addClass('game-over');
		setTimeout(function() {
			$('body').removeClass('game-over');
		}, 200);
		$('h1').text('Game Over, Press Any Key To Restart');
		startOver();
	}
}

function startOver() {
	count = 0;
	gamePattern = [];
	isGameOver = true;
}
