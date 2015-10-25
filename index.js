var env = flock.init();
env.start();

function returnSynthesizer(id) {
	var synth = flock.synth({
		synthDef: {
			id: ""+id, 
			ugen: "flock.ugen.saw",
			freq: 440,
			mul: 1
		},
		addToEnvironment: false
	});
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
channel_options[0]=channel_options[1]={};

var channel_counts = [];
channel_counts[0]=channel_counts[1]=0;

function playNote(chan_index, input_note) {
	//alert("hi")
	var id = "channel_"+channel_counts[chan_index];
	var synth = returnSynthesizer(id)
	//alert(JSON.stringify(channel_counts[0]))
	synth.set(id+".freq", 440*Math.pow(2, input_note.note/12))
	// if (!(channel_options[chan_index].length==0)) {
// 		alert(channel_options[chan_index].mul)
// 		synth.set(id+".mul", channel_options[chan_index].mul)
// 	}
	//env.head(synth);
	var return_arr = [synth, id]
	return return_arr;
}

var start = Date.now();
var time = 0;
	
	var tick_count = new Array(2);
	tick_count[0]=tick_count[1]=1;
	
	var current_synths = [[],[]];
var increment = 1000.0/(bpm/60.0)
	
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
			//current_synths[i] = [];
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
   	setTimeout(timer_instance, (increment - diff));
}

//setTimeout(timer_instance, 100);

// playNextNote(0);
// playNextNote(1);

// setTimeout(function() {
// 	changeVolume(0, 50);
// }, 1000);