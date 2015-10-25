var env = flock.init();
env.start();

function returnSynthesizer(id, chan) {
	var object1 = {
			id: ""+id, 
			ugen: "flock.ugen.saw",
			freq: 440,
			mul: 1
		}
	var object2 = channel_options[chan]
	object1 = $.extend(true, {}, object1, object2)
	var object3 = {
		addToEnvironment:false
	}
	object3["synthDef"] = object1
	//alert(JSON.stringify(object3))
	var synth = flock.synth(object3);
	//synth.synthDef.id = id;
	return synth;
}

function changeTempo(new_tempo) {
	bpm = new_tempo;
}

function changeVolume(chan, factor) {
	channel_options[chan]["mul"]=factor;
}

var bpm = 120;
var channels = [[],[]];
channels[0]=[[{duration: 1, note: -5}], [{duration: 1, note: -7}], [{duration: 1, note: -9}], [{duration: 1, note: -7}], [{duration: 1, note: -5}], [{duration: 1, note: -5}], [{duration: 2, note: -5}], [{duration: 1, note: -7}], [{duration: 1, note: -7}], [{duration: 2, note: -7}], [{duration: 1, note: -5}], [{duration: 1, note: -5}], [{duration: 2, note: -5}]]
channels[1]=[[{duration: 8, note: -21}, {duration: null, note: -14}], [{duration: 4, note:-22}, {duration: null, note: -14}], [{duration: 4, note: -21}, {duration: null, note: -14}]]

var channel_options = new Array(2);
channel_options[0]={};
channel_options[1]={};

var channel_counts = [];
channel_counts[0]=channel_counts[1]=0;

function playNote(chan_index, input_note) {
	//alert("hi")
	var id = "channel_"+channel_counts[chan_index];
	var synth = returnSynthesizer(id, chan_index)
	//alert(JSON.stringify(channel_counts[0]))
	synth.set(id+".freq", 440*Math.pow(2, input_note.note/12))
	// if (!(channel_options[chan_index].length==0)) {
// 		alert(channel_options[chan_index].mul)
// 		synth.set(id+".mul", channel_options[chan_index].mul)
// 	}
	//env.head(synth);
	// for (l=0; l<channel_options[i]; l++) {
// 		var x = channel_options[chan_index][l][0]
// 		var y = channel_options[chan_index][l][1]
// 		synth.set(id+"."+x, y)
// 	}
	var return_arr = [synth, id]
	return return_arr;
}

function changeTempo(rate) {
	tempo_que.push(rate);
}

function changeVolume(channel, mul) {
	volume_change_que.push([channel, mul])
}

var start = Date.now();
var time = 0;
	
var tick_count = new Array(2);
tick_count[0]=tick_count[1]=1;
	
var current_synths = [[],[]];
var increment = getIncrement();
var tempo_que = [];
var volume_change_que = [];
	
function start_timer() {
	setTimeout(function() {
		start = Date.now();
		timer_instance();
	}, increment);
}

function timer_instance()
{
	
    time += increment;

    // elapsed = Math.floor(time / 100) / 10;
//     if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

for (i=0; i<tick_count.length; i++) {
	if (tick_count[i]!=1) {
		tick_count[i]--;
	} else {
		if (!(current_synths[i]==undefined)) {
			for (l=0; l<current_synths[i].length; l++) {
				current_synths[i][l][0].set(current_synths[i][l][1]+".mul", 0);
			}
			
			clearArray(current_synths[i]);
			console.log("Array lenght is "+current_synths[i].length)
		}
		if (channels[i].length!=0) {
		var nextNoteObject = channels[i].shift();
		tick_count[i]=nextNoteObject[0].duration;
		for (l=0; l<nextNoteObject.length; l++) {
			
		//alert(tick_count[i])
			var synthArr = playNote(i, nextNoteObject[l]);
			
		//alert(synthArr[0].get(synthArr[1]+".freq"))
			env.head(synthArr[0])
		
			current_synths[i].push([synthArr[0], synthArr[1]])
		}
	}
	}
}

    var diff = (new Date().getTime() - start) - time;
	console.log(tick_count[0]+" "+tick_count[1])
	//alert(diff);
	if (tempo_que.length!=0) {
		bpm = tempo_que.pop();
		increment = getIncrement();
		clearArray(tempo_que);
	}
	if (volume_change_que.length!=0) {
		new_volume = volume_change_que.pop();
		for (i=0; i<current_synths[new_volume[0]].length; i++) {
			var id = current_synths[new_volume[0]][i][1]
			current_synths[new_volume[0]][i][0].set(current_synths[new_volume[0]][i][1]+".mul", new_volume[1])
		}
		channel_options[new_volume[0]]["mul"] = new_volume[1]
		clearArray(volume_change_que);
	}
   	setTimeout(timer_instance, (increment - diff));
}

function getIncrement() {
	return 1000.0/(bpm/60.0)
}

function clearArray(arr) {
	arr.length=0;
}
//setTimeout(timer_instance, 100);

// playNextNote(0);
// playNextNote(1);

// setTimeout(function() {
// 	changeVolume(0, 50);
// }, 1000);