function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function noteOn(status, note, velocity) {
    console.log("received noteOn "+(status&0x0f)+"/"+note+"/"+velocity);
}

function noteOff(status, note) {
    console.log("received noteOff "+(status&0x0f)+"/"+note);
}

function getStringFromSysex(data, startOffset, endOffset){
  var str = "";
  for(i=startOffset; i<(data.length-endOffset) && data[i] != 0x00; ++i)
    str += String.fromCharCode(data[i]);
  return str;
}

function registerPatch(idx, name){
    $('#patchnames').append($("<option>").attr('value',idx).text(name));
}

function log(msg){
    $('#log').append('<li><span class="badge">' + msg + '</span></li>');
}

function systemExclusive(data) {
    if(data.length > 3 && data[0] == 0xf0
       && data[1] == MIDI_SYSEX_MANUFACTURER){
       // && data[2] == MIDI_SYSEX_DEVICE){
	// console.log("sysex: 0x"+data[3].toString(16)+" length: "+data.length);
	switch(data[3]){
	case OpenWareMidiSysexCommand.SYSEX_PRESET_NAME_COMMAND:
            var name = getStringFromSysex(data, 5, 1);
	    var idx = data[4];
	    registerPatch(idx, name);
	    // log("preset "+idx+": "+name);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_RESOURCE_NAME_COMMAND:
            var name = getStringFromSysex(data, 5, 1);
	    var idx = data[4];
	    log("resource "+idx+": "+name);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PARAMETER_NAME_COMMAND:
            var name = getStringFromSysex(data, 5, 1);
	    var pid = data[4]+1;
	    console.log("parameter "+pid+" :"+name);
	    if(pid >= 1 && pid <= 8)
		$("#p"+pid).text(name); // update the prototype slider names
	    break;
	case OpenWareMidiSysexCommand.SYSEX_DEVICE_ID:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("device id "+msg);
	    log("Unique Device ID: "+msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_FIRMWARE_VERSION:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("firmware "+msg);
	    log("Firmware version: "+msg);
	    $("#ourstatus").text("Connected to "+msg);	    
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_MESSAGE:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("program message "+msg);
	    log("Program Message: "+msg);
	    $("#patchmessage").text(msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_STATS:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("program stats "+msg);
	    // log("Program Stats: "+msg);
	    $("#patchstatus").text(msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_PROGRAM_ERROR:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("program error "+msg);
	    log("Error: "+msg);
	    break;
	case OpenWareMidiSysexCommand.SYSEX_DEVICE_STATS:
            var msg = getStringFromSysex(data, 4, 1);
	    console.log("device stats "+msg);
	    log("Device Stats: "+msg);
	    break;	    
	default:
            var msg = getStringFromSysex(data, 4, 1);
	    log("Unhandled message["+data[3]+"]: "+msg);
	    break;
	}
    }
}

function programChange(pc){
    console.log("received PC "+pc);
    // resetParameterNames();
    var name = $("#patchnames option:eq("+pc+")").text();
    console.log("patch name "+name);
    $("#patchname").text(name);			    
}


function sendRequest(type){
    HoxtonOwl.midiClient.sendCc(OpenWareMidiControl.REQUEST_SETTINGS, type);
}

function sendStatusRequest(){
    sendRequest(OpenWareMidiSysexCommand.SYSEX_PROGRAM_MESSAGE);
    // sendRequest(OpenWareMidiSysexCommand.SYSEX_DEVICE_STATS);
    sendRequest(OpenWareMidiSysexCommand.SYSEX_PROGRAM_STATS);
    // sendRequest(OpenWareMidiControl.PATCH_PARAMETER_A); // request parameter values
}

function setParameter(pid, value){
    console.log("parameter "+pid+": "+value);
    HoxtonOwl.midiClient.sendCc(OpenWareMidiControl.PATCH_PARAMETER_A+pid, value);
}

function resetParameterNames(){
    for(i=1; i<=8; ++i)
        $("#p"+i).text(String.fromCharCode(64+i)); // reset the prototype slider names
}

function selectOwlPatch(pid){
    console.log("select patch "+pid);
    sendPc(pid);
}

function sendLoadRequest(){
    sendRequest(OpenWareMidiSysexCommand.SYSEX_PRESET_NAME_COMMAND);
    sendRequest(OpenWareMidiSysexCommand.SYSEX_PARAMETER_NAME_COMMAND);
}

function onMidiInitialised(){
    // auto set the input and output to an OWL   
    var outConnected = false,
        inConnected = false;
    for (var i = 0; i < HoxtonOwl.midiClient.midiOutputs.length; i++) {
	var name = HoxtonOwl.midiClient.midiOutputs[i].name;
	console.log("option: "+i+": "+name);
        if (!outConnected && name.match('^OWL-')) {
            HoxtonOwl.midiClient.selectMidiOutput(i);
            outConnected = true;
	    $('#midiOutputs').append($('<option>', {value:i, text: name, selected: true}));
        }else{
	    $('#midiOutputs').append($('<option>', {value:i, text: name}));
	}
    }
    for (var i = 0; i < HoxtonOwl.midiClient.midiInputs.length; i++) {
	var name = HoxtonOwl.midiClient.midiInputs[i].name;
	console.log("option: "+i+": "+name);
        if (!inConnected && name.match('^OWL-')) {
            HoxtonOwl.midiClient.selectMidiInput(i);
            inConnected = true;
	    $('#midiInputs').append($('<option>', {value:i, text: name, selected: true}));
        }else{
	    $('#midiInputs').append($('<option>', {value:i, text: name}));
	}
    }
    if (inConnected && outConnected) {
        console.log('connected to an OWL');
        $('#ourstatus').text('Connected')
        $('#load-owl-button').show();
	sendRequest(OpenWareMidiSysexCommand.SYSEX_FIRMWARE_VERSION);
	sendLoadRequest(); // load patches
	setMonitor(true);
    } else {
        console.log('failed to connect to an OWL');
        $('#ourstatus').text('Failed to connect. Try again.')
        $('#load-owl-button').hide();
    }
}

function updatePermission(name, status) {
    console.log('update permission for ' + name + ' with ' + status);
    log('update permission for ' + name + ' with ' + status);
}

function connectToOwl() {
    if(navigator && navigator.requestMIDIAccess){
        navigator.requestMIDIAccess({sysex:true});
	HoxtonOwl.midiClient.initialiseMidi(onMidiInitialised);
    }
}

var monitorTask = undefined;
function setMonitor(poll){
    if(poll && monitorTask == undefined){
    	monitorTask = window.setInterval(sendStatusRequest, 1000);
    }else if(!poll && monitorTask != undefined){
    	clearInterval(monitorTask);
    	monitorTask = undefined;
    }
}

function sendProgram(files, resolve){
    return new Promise((resolve, reject) => {
	for (var i = 0, f; f = files[i]; i++) {
	    // Only process syx files.
	    // if (!f.name.match('*\\.syx')) {
            //     continue;
	    // }
	    var reader = new FileReader();

	    // Closure to capture the file information.
	    reader.onload = (function(theFile) {
		return function(e) {
		    log("Reading file "+theFile.name);
		    sendProgramFromUrl(e.target.result, resolve).then(
			function(){resolve && resolve();});
		};
	    })(f);
	    reader.readAsDataURL(f);
	    // reader.readAsBinaryString(f);
	}	
    });
}

function sendFirmwareFlash(checksum){
    var crc = parseInt(checksum, 16);
    console.log("sending firmware flash ["+checksum+":"+crc+"] command");
    var b = [ ((crc&0x80000000)?8:0) | ((crc&0x800000)?4:0) | ((crc&0x8000)?2:0) | ((crc&0x80)?1:0),
	      (crc>>24) & 0x7f, 
	      (crc>>16) & 0x7f, 
	      (crc>>8) & 0x7f, 
	      (crc>>0) & 0x7f];
    console.log("bytes ["+b+"] command");
    var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, 
               OpenWareMidiSysexCommand.SYSEX_FIRMWARE_FLASH, b[0], b[1], b[2], b[3], b[4], 0xf7 ];
    HoxtonOwl.midiClient.logMidiData(msg);
    if(HoxtonOwl.midiClient.midiOutput)
        HoxtonOwl.midiClient.midiOutput.send(msg, 0);
}

function sendProgramRun(){
    return new Promise((resolve, reject) => {
	console.log("sending sysex run command");
	var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, 
		   OpenWareMidiSysexCommand.SYSEX_FIRMWARE_RUN, 0xf7 ];
	HoxtonOwl.midiClient.logMidiData(msg);
	if(HoxtonOwl.midiClient.midiOutput)
            HoxtonOwl.midiClient.midiOutput.send(msg, 0);
    });
}

function sendProgramStore(slot){
    return new Promise((resolve, reject) => {
	console.log("sending sysex store ["+slot+"] command");
	var msg = [0xf0, MIDI_SYSEX_MANUFACTURER, MIDI_SYSEX_OMNI_DEVICE, 
		   OpenWareMidiSysexCommand.SYSEX_FIRMWARE_STORE, 0, 0, 0, 0, slot, 0xf7 ];
	HoxtonOwl.midiClient.logMidiData(msg);
	if(HoxtonOwl.midiClient.midiOutput)
            HoxtonOwl.midiClient.midiOutput.send(msg, 0);
    });
}

function chunkData(data){
    var chunks = [];
    var start = 0;
    for(var i = 0; i < data.length; ++i){
        if(data[i] == 0xf0){
            start = i;
        } else if(data[i] == 0xf7){
            chunks.push(data.subarray(start, i + 1));
        }
    }
    return chunks;
}

function sendDataChunks(index, chunks, resolve){
    if(index < chunks.length){
        HoxtonOwl.midiClient.logMidiData(chunks[index]);
        if(HoxtonOwl.midiClient.midiOutput){
            console.log("sending chunk "+ index + ' with '+ chunks[index].length +" bytes sysex");
            HoxtonOwl.midiClient.midiOutput.send(chunks[index], 0);            
        }
        window.setTimeout(function(){
            sendDataChunks(++index, chunks, resolve);
        }, 1);
    } else {
        resolve && resolve();
    }
}

function sendProgramData(data, resolve){
    return new Promise( (resolve, reject) => {
        log("Sending data "+data.length+" bytes"); 
        var chunks = chunkData(data);
        sendDataChunks(0, chunks, resolve);
    });
}

function sendProgramFromUrl(url, resolve){
    return new Promise((resolve, reject) => {
        console.log("sending patch from url "+url.substring(0, 64));
        var oReq = new XMLHttpRequest();
        oReq.responseType = "arraybuffer";
        oReq.onload = function (oEvent) {   
            var arrayBuffer = oReq.response; // Note: not oReq.responseText
            if(arrayBuffer) {  
                var data = new Uint8Array(arrayBuffer);
                resolve(
                    sendProgramData(data, resolve).then(function(){
			console.log("data sent");
			resolve && resolve();
                    }, function(err){
                        console.error(err);
                    })
                );
            }
        }
        oReq.open("GET", url, true);
        oReq.send();
    });
}

function loadPatchFromServer(patchId){
    return sendProgramFromUrl(API_END_POINT + '/builds/' + patchId + '?format=sysx&amp;download=1');
}

