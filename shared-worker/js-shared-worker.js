var connections = 0; // count active connections

var sender = null;
var receiver = null;

function bridge() {
    if (! sender || ! receiver) {
        return;
    }

    sender.addEventListener("message", function (e) {
        sender.postMessage("Received: " + e.data);
		receiver.postMessage(e.data);
	}, false);
}


self.addEventListener("connect", function (e) {

	var port = e.ports[0];
	// connections++;

	port.addEventListener("message", function (e) {
        if (e.data == 'iamsender') {
            sender = port;
            bridge();
        }
        if (e.data == 'iamreceiver') {
            receiver = port;
            bridge();
        }
		// port.postMessage("Hello " + e.data + " (port #" + connections + ")");
	}, false);

	port.start();

}, false);

