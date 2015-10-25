var tempo = bpm;
var volume = [1,1];
var volumebuffer = [0,0];
var posbuffer;
var enter = true;
var controller = Leap.loop({enableGestures: true}, function (frame) {
	if(frame.hands.length > 0)
	{
		var hand = frame.hands[0];
		if(hand.palmPosition[2] > 0)
		{
			enter = true;
			return;
		}
		var type = hand.type == "right" ? 1 : 0;
		var position = hand.palmPosition[1];
		if(controller.frame(1).hands.length == 0 || enter)
		{
			volumebuffer[type] = volume[type];
			posbuffer = position;
			enter = false;
		}
		volume[type] = 0.01*(position -posbuffer) + volumebuffer[type];
		if(volume[type] < 0)
			volume[type] = 0;
		changeVolume(type, volume[type]);
		if(hand.grabStrength > 0.8)
		{
			startHold();
			document.getElementById("pause").innerHTML = 'Held';
		}
		else if (hand.grabStrength < 0.2)
		{
			stopHold();
			document.getElementById("pause").innerHTML = 'Normal';
		}
	}
	if(frame.valid && frame.gestures.length > 0)
	{
    	frame.gestures.forEach(function(gesture) {
    		if(gesture.type == "circle")
			{
				var clockwise = false;
				var pointableID = gesture.pointableIds[0];
				var direction = frame.pointable(pointableID).direction;
				if(direction === undefined)
					return;
				var dotProduct = Leap.vec3.dot(direction, gesture.normal);
				if(dotProduct > 0)
					clockwise = true;
				var circleProgress = clockwise ? gesture.progress : -gesture.progress;
				tempo *= Math.pow(Math.pow(2,1/256),circleProgress);
				tempo = Math.round(tempo);
				changeTempo(tempo);
			}
    	});
	}
	document.getElementById("first").innerHTML = 'Volume: ' + processFloat(volume[0]) + ' ' + processFloat(volume[1]);
	document.getElementById("second").innerHTML = 'Tempo: ' + tempo + ' ';
});

function processFloat(n) {
	return Math.round(n*1000)/1000;
}