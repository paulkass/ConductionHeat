var text = document.getElementById('hand');
Leap.loop(function (frame) {
	if(frame.hands.length > 0)
	{

		var dhand = frame.hands[0];
		if(dhand.grabStrength > 0.8)
		{
			pause.innerHTML = 'Paused';
			player.pause();
		}
		else if (!player.playing && dhand.grabStrength < 0.2)
		{
			player.resume();
			pause.innerHTML = '';
		}
		var position = dhand.palmPosition;
		hand.innerHTML = 'Volume: ' + position[1];
	}
	
});