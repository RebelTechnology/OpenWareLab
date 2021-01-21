/**
 * @namespace
 */
var HoxtonOwl;
if (!HoxtonOwl) {
    HoxtonOwl = { };
}

HoxtonOwl.midiClient = {

    midiAccess: null,  // global MIDIAccess object
    midiInputs: [],
    midiInput: null,
    midiOutputs: [],
    midiOutput: null,
    midiInitialisedCallback: 'undefined',
    midiChannel: 0,

    setChannel: function(ch){
	this.midiChannel = ch&0x0f;
    },

    logMidiEvent: function(ev){
        // HoxtonOwl.midiClient.logMidiData(ev.data);
    },

    logMidiData: function(data){
      // var arr = [];
      // for(var i=0; i<data.length; i++) arr.push((data[i]<16 ? '0' : '') + data[i].toString(16));
      // console.log('MIDI:', arr.join(' '));
    },

    onMIDIInit: function(midi, options) {
        console.log("MIDI sysex options: "+options);
        console.log("MIDI sysex: "+midi.sysexEnabled);
        console.log("MIDI onstatechange: "+midi.onstatechange);
        midiAccess = midi;

        var i = 0;
        var inputs = midiAccess.inputs.values();
        for(var input = inputs.next(); input && !input.done; input = inputs.next()) {
            HoxtonOwl.midiClient.midiInputs.push(input.value);
            console.log("added MIDI input "+input.value.name+" ("+input.value.manufacturer+") "+input.value.id);
        }
        if(inputs.size === 0)
            console.log("No MIDI input devices present.")

        i = 0;
        var outputs = midiAccess.outputs.values();
        for(var output = outputs.next(); output && !output.done; output = outputs.next()) {
            HoxtonOwl.midiClient.midiOutputs.push(output.value);
            console.log("added MIDI output "+output.value.name+" ("+output.value.manufacturer+") "+output.value.id);
        }
        if(outputs.size === 0)
    	    console.log("No MIDI output devices present.")

        if(midiInitialisedCallback)
    	    midiInitialisedCallback();
    },

    onMIDIReject: function(err) {
        console.log("error "+err);
        var retry = confirm("The MIDI system failed to start.\n"+err+"\nRetry?");
        if(retry)
    	initialiseMidi();
    },

    // var sysexMessage = [];
    MIDIMessageEventHandler: function(event) {
        // console.log("MIDI 0x"+event.data[0].toString(16)+" "+event.data.length+" bytes");
        HoxtonOwl.midiClient.logMidiEvent(event);
        switch(event.data[0] & 0xf0) {
        case 0x90:
    	    if(event.data[2] != 0) {  // if velocity != 0, this is a note-on message
    		noteOn(event.data[0], event.data[1], event.data[2]);
    		return;
    	    }
        case 0x80:
    	    noteOff(event.data[0], event.data[1]);
    	    return;
        case 0xB0:
    	    controlChange(event.data[0], event.data[1], event.data[2]);
    	    return;
        case 0xC0:
    	    programChange(event.data[1]);
    	    return;
	case 0xE0:
	    pitchBend(event.data[0] & 0x0f, event.data[1] | (event.data[2] << 7))
	    return;
        case 0xF0:
      	    systemExclusive(event.data);
    	// sysexMessage = sysexMessage.concat(event.data);
    	// console.log("sysex evt 0x"+event.data[0].toString(16)+":0x"+event.data[event.data.length-1].toString(16));
    	// console.log("sysex msg 0x"+sysexMessage[0].toString(16)+":0x"+sysexMessage[sysexMessage.length-1].toString(16));
    	// if(sysexMessage.indexOf(0xf7) != -1){
      	//     systemExclusive(sysexMessage);
    	//     sysexMessage = [];
    	// }
    	return;
        }
    },

    selectMidiInput: function(index) {
        var midiInput = HoxtonOwl.midiClient.midiInput;

        if(midiInput)
        {
            midiInput.onmidimessage = undefined;
        }
        midiInput = HoxtonOwl.midiClient.midiInputs[index];
        if(midiInput){
            console.log("selecting MIDI input "+index+": "+ midiInput.name+" ("+ midiInput.manufacturer+")");
            midiInput.onmidimessage = this.MIDIMessageEventHandler;
        }
    },

    selectMidiOutput: function(index) {
        var midiOutput = HoxtonOwl.midiClient.midiOutput = HoxtonOwl.midiClient.midiOutputs[index];
        if(midiOutput)
        {
          console.log("selecting MIDI output "+index+": "+midiOutput.name+" ("+midiOutput.manufacturer+")");        
        }
    },

    sendPc: function(value) {
	value = parseInt(value);
        console.log("sending PC "+value);
        if(this.midiOutput)
          this.midiOutput.send([0xC0|this.midiChannel, value], 0);
    },

    sendChCc: function(ch, cc, value) {
	ch = parseInt(ch);
	cc = parseInt(cc);
	value = parseInt(value);
        console.log("sending CC "+ch+"/"+cc+"/"+value);
        if(this.midiOutput)
          this.midiOutput.send([0xB0|ch, cc, value], 0);            
    },

    sendCc: function(cc, value) {
	cc = parseInt(cc);
	value = parseInt(value);
        console.log("sending CC "+cc+"/"+value);
        if(this.midiOutput)
        {
          this.midiOutput.send([0xB0|this.midiChannel, cc, value], 0);            
        }
    },

    sendPb: function(value) {
	value = parseInt(value);
        console.log("sending PB "+value);
        if(this.midiOutput)
          this.midiOutput.send([0xE0|this.midiChannel, value&0x7f, (value>>7)&0x7f], 0); 
    },

    sendNoteOn: function(note, velocity) {
        console.log("sending note on "+note+"/"+velocity);
        if(this.midiOutput)
        {
          this.midiOutput.send([0x90|this.midiChannel, note, velocity], 0);            
        }
    },

    sendNoteOff: function(note, velocity) {
        console.log("sending note off "+note+"/"+velocity);
        if(this.midiOutput)
        {
          this.midiOutput.send([0x80|this.midiChannel, note, velocity], 0);            
        }
    },
    
    sendStop: function() {
        console.log("sending STOP");
        if(this.midiOutput)
        {
          this.midiOutput.send([0xFC], 0);
        }
    },

    sendStart: function() {
        console.log("sending START");
        if(this.midiOutput)
        {
          this.midiOutput.send([0xFA], 0);
        }
    },

    // function sendSysexMessage(msg) {
    //     console.log("sending sysex msg "+msg);
    //     var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE ];
    //     msg.push.apply(msg, data.split(''));
    //     msg.push(0xf7);
    //     this.logMidiData(msg);
    //     if(this.midiOutput)
    //       this.midiOutput.send(msg, 0);
    // }

    sendSysexCommand: function(cmd) {
        console.log("sending sysex command 0x"+cmd.toString(16));
        var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, cmd, 0xf7 ];
        this.logMidiData(msg);
        if(this.midiOutput)
            this.midiOutput.send(msg, 0);
    },

    sendSysexData: function(cmd, data) {
        console.log("sending sysex data ");
        var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, cmd ];
        for(var i=0; i<data.length; ++i)
    	    msg.push(data[i]);
        msg.push(0xf7);
        this.logMidiData(msg);
        if(this.midiOutput)
          this.midiOutput.send(msg, 0);
    },

    sendSysexString: function(cmd, str) {
        console.log("sending sysex string "+str);
        var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, cmd ];
        for(var i=0; i<str.length; ++i)
    	    msg.push(str.charCodeAt(i));
        msg.push(0xf7);
        this.logMidiData(msg);
        if(this.midiOutput)
          this.midiOutput.send(msg, 0);
    },

    initialiseMidi: function(callback){
        midiInitialisedCallback = callback;
        if(navigator.requestMIDIAccess)
    	    navigator.requestMIDIAccess( { sysex: true } ).then( this.onMIDIInit, this.onMIDIReject );
        else
    	    alert("No MIDI support present in your browser.")
    }

}
