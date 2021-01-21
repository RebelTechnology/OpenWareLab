
function pitchBend(channel, value) {
    // console.log("received PB "+channel+":"+value);
}    

function controlChange(status, cc, value){
    var ch = parseInt(status)&0x0f;
    cc = parseInt(cc);
    console.log("received CC "+ch+":"+cc+":"+value);
}

function sendSetting(sid, value){
    console.log("Setting "+sid+" = "+value);
    // HoxtonOwl.midiClient.sendSysexString(OpenWareMidiSysexCommand.SYSEX_CONFIGURATION_COMMAND, sid+parseInt(value).toString(16));
    HoxtonOwl.midiClient.sendSysexString(OpenWareMidiSysexCommand.SYSEX_CONFIGURATION_COMMAND, sid+parseInt(value).toString(16));
}

function handleSetting(sid, value){
    console.log("Setting: "+sid+" = "+parseInt(value, 16));
    if(["IO", "IS", "OO", "OS"].indexOf(sid) > -1)
	log("Setting: "+sid+" = "+parseInt(value, 16)/65535);
	// log("Setting: "+sid+" = 0x"+(parseInt(value, 16) >>> 0).toString(16));
}

function systemExclusive(data){
    console.log("received sysex "+data);
    if(data.length > 3 && data[0] == 0xf0
       && data[1] == MIDI_SYSEX_MANUFACTURER){
	switch(data[3]){
	case OpenWareMidiSysexCommand.SYSEX_PRESET_NAME_COMMAND:
            var name = getStringFromSysex(data, 5, 1);
	    var idx = data[4];
	    log("Preset "+idx+": "+name);
	    if(idx == 0)
		$("#patchname").text(name);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PARAMETER_NAME_COMMAND:
            var name = getStringFromSysex(data, 5, 1);
	    var idx = data[4];
	    log("Parameter "+idx+": "+name);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_DEVICE_ID:
            var msg = getStringFromSysex(data, 4, 1);
	    log("Unique Device ID: "+msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_FIRMWARE_VERSION:
            var msg = getStringFromSysex(data, 4, 1);
	    log("Firmware: "+msg);
	    $("#ourstatus").text("Connected to "+msg);	    
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_MESSAGE:
            var msg = getStringFromSysex(data, 4, 1);
	    // log("Message: "+msg);
	    $("#patchmessage").text(msg);
	    var str = msg.split(':');
	    if(str[0] == 'Sample High')
		$("#sample-high").val(parseFloat(str[1]));
	    else if(str[0] == 'Sample Low')
		$("#sample-low").val(parseFloat(str[1]));
	    else if(str[0] == 'Test High')
		$("#test-high").val(parseFloat(str[1]));
	    else if(str[0] == 'Test Low')
		$("#test-low").val(parseFloat(str[1]));
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_STATS:
            var msg = getStringFromSysex(data, 4, 1);
	    $("#patchstatus").text(msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_ERROR:
            var msg = getStringFromSysex(data, 4, 1);
	    log("<b>"+msg+"</b>");
	    $("#patchstatus").text(msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_DEVICE_STATS:
            var msg = getStringFromSysex(data, 4, 1);
	    log("Device Stats: "+msg);
	    break;	    
	case OpenWareMidiSysexCommand.SYSEX_CONFIGURATION_COMMAND:
            var msg = getStringFromSysex(data, 4, 1);
	    handleSetting(msg.substring(0, 2), msg.substring(2));
	    break;	    
	default:
            var msg = getStringFromSysex(data, 4, 1);
	    log("Unhandled message: "+msg);
	    break;
	}
    }
}

$(document).ready(function() {
    $('#clear').on('click', function() {
	$('#log').empty();
	return false;
    });
    connectToOwl();
});
