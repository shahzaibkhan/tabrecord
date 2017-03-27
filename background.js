// Reference docs: https://developer.chrome.com/extensions/tabs

var recordURL = {};
var recordIDs = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	   
	  if (changeInfo.status == "loading" && changeInfo.url != "undefined"){
			if(tabId!='') {
				if(changeInfo.url !== "chrome://newtab/" && !isBlank(changeInfo.url)) {
					
					if(typeof recordURL[tabId] === 'undefined') { // does not exist  
						recordURL[tabId] = changeInfo.url;
						console.log("URL: "+changeInfo.url+" - Tab ID:"+tabId);
					}
					else {
						var pid = tabId //since tab remain same so parent id remains same;
						if(typeof recordIDs[tabId] === 'undefined') {
							recordIDs[tabId] = pid;
							 if(pid) {
								console.log("An Edge is Created with the Tab ID:" + tabId + " and Parent Id:"+ pid);
							  }
							//console.log("URL: "+changeInfo.url+" - Tab ID:"+tabId);
							  
						} else {
							if(pid) {
								if(typeof recordIDs[tabId] !== 'undefined') {
									/* this is the place where the reload of url take place */
									console.log("An Edge is Created with the Tab ID:" + tabId + " and Parent Id:"+ recordIDs[tabId]+" / URL Updated on the same Tab");
								} else {
									console.log("An Edge is Created with the Tab ID:" + tabId + " and Parent Id:"+ pid);
								}									
							}
							//console.log("URL: "+changeInfo.url+" - Tab ID:"+tabId);
						}							
 
					}
					
					//console.log("URL: "+changeInfo.url+" - Tab ID:"+tabId);
					//console.log(JSON.stringify(tab));
					//console.log(JSON.stringify(changeInfo));
				}
			}
        }
		
});


/* this gets fired at the time of new tab creation, useful for node and edge detection */
chrome.tabs.onCreated.addListener( function( tab) {
  
  if (tab.openerTabId && (tab.url.indexOf("chrome://newtab/") == -1)){
	var pid = tab.openerTabId;	
  }  
  
  if(pid) {
	console.log("An Edge is Created with the Tab ID:" + tab.id + " and Parent Id:"+ pid);
	recordIDs[tab.id] = pid;
  } else {
	console.log("A Node is Created with the Parent ID:" + tab.id);
	recordIDs[tab.id] = tab.id;
  }
   
});


/* receives messages from dom via content script */
chrome.runtime.onMessage.addListener(function(message, sender, response) {
     if (message.loadURL) {
		 console.log("URL: "+sender.tab.url+" - Tab ID:"+sender.tab.id);
     }
});

/* ----------------------- ADDITIONAL SUPPORTING FUNCTIONS ----------------------------------------- */


/* this function is used for the detection of the blank state of the url coming from tab */
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

/* this function is use to get the query string from the url, used for the parentid detection inside the url */
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addParameterToURL(param,url){
    _url = url;
    _url += (_url.split('?')[1] ? '&':'?') + param;
    return _url;
}


/* ------------------------------- NOT USING -------------------------------------------- */

/* receives messages from dom via content script */
/*
chrome.runtime.onMessage.addListener(function(message, sender, response) {
	
     if (message.loadURL) {
		 console.log(JSON.stringify(sender));
		if (sender.tab.openerTabId){
			var newURL = addParameterToURL("parentid="+sender.tab.openerTabId,sender.tab.url);
		} else {
			var newURL = addParameterToURL("parentid="+sender.tab.id,sender.tab.url);
		}
		 console.log(newURL);
		 //console.log(sender.tab.url);
         //var newurl = sender.tab.url.replace("/", "http://ezp.lib.unimelb.edu.au/");
         //if(newURL.indexOf("chrome://newtab/") == -1) {
			//chrome.tabs.update(sender.tab.id, {url: newURL});     
		 //}
     }
});
*/

					//console.log(JSON.stringify(tab));
