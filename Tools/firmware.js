
function pitchBend(channel, value) {
    // console.log("received PB "+channel+":"+value);
}    

function controlChange(status, cc, value){
    var ch = parseInt(status)&0x0f;
    cc = parseInt(cc);
    console.log("received CC "+ch+":"+cc+":"+value);
}

$(document).ready(function() {
    $('#clear').on('click', function() {
	$('#log').empty();
	return false;
    });
    connectToOwl();

});
