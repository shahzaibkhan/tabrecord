window.onload = function () { 

		chrome.runtime.sendMessage({loadURL: true});

}

/*
document.onclick= function(event) {
    if (event===undefined) event= window.event;
    var target= 'target' in event? event.target : event.srcElement;
	chrome.runtime.sendMessage({loadURL: true});
};

el.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
  	chrome.runtime.sendMessage({loadURL: true});
	  return false;
}, false);

*/
	