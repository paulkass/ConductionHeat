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
channels[0]=[{duration: 1, note: -5}, {duration: 1, note: -7}, {duration: 1, note: -9}, {duration: 1, note: -7}, {duration: 1, note: -5}, {duration: 1, note: -5}, {duration: 2, note: -5}, {duration: 1, note: -7}, {duration: 1, note: -7}, {duration: 2, note: -7}, {duration: 1, note: -5}, {duration: 1, note: -5}, {duration: 2, note: -5}]
channels[1]=[{duration: 8, note: -21}, {duration: 4, note:-22}, {duration: 4, note: -21}]

var channel_options = new Array(2);
channel_options[0]=channel_options[1]={};

var channel_counts = [];
channel_counts[0]=channel_counts[1]=0;

function playNextNote(chan_index) {
	var id = "channel_"+channel_counts[chan_index];
	var synth = returnSynthesizer(id)
	//alert(JSON.stringify(channel_counts[0]))
	synth.set(id+".freq", 440*Math.pow(2, channels[chan_index][channel_counts[chan_index]].note/12))
	// if (!(channel_options[chan_index].length==0)) {
// 		alert(channel_options[chan_index].mul)
// 		synth.set(id+".mul", channel_options[chan_index].mul)
// 	}
	env.head(synth);
	setTimeout(function() {
		channel_counts[chan_index]++;
		synth.set(id+".mul", 0);

		if (channel_counts[chan_index]>=channels[chan_index].length) {
			alert("Done!");
		} else {
			playNextNote(chan_index);
		}
	}, 1000.0/(bpm/60.0)*channels[chan_index][channel_counts[chan_index]].duration);
}

ar start = new Date().getTime(),
    time = 0,
    elapsed = '0.0';

function instance()
{
    time += 100;

    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

    document.title = elapsed;

    var diff = (new Date().getTime() - start) - time;
    window.setTimeout(instance, (100 - diff));
}

setTimeout(instance, 100);

// playNextNote(0);
// playNextNote(1);

// setTimeout(function() {
// 	changeVolume(0, 50);
// }, 1000);