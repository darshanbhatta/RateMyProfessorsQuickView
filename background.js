// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {

}

// Create one test item for each context type.



var title = "RMP QuickView Search";
var id = chrome.contextMenus.create({
  "title": title, "contexts": ["selection"],
});


var collegeaa;

chrome.contextMenus.onClicked.addListener(function (info, tab) {

  chrome.tabs.getSelected(null, function (tab) {
    function getStore (data, cb) {
      chrome.storage.local.get(data, cb);
    }

    var parsed =  info.selectionText.replace(/[^a-z0-9\s-]/ig,'');
   // alert(parsed)
    //alert(parsed);
    var arraya = parsed.split(" ");
   // alert(arraya);
    var nameFinal;
    if(arraya.length>1){

      if(arraya[1].length>1){
        nameFinal = arraya[0] + " " + arraya[1];
      }else{
        nameFinal = arraya[0];
      }

    }else{
      nameFinal = arraya[0];
    }
   // alert(nameFinal);



    getStore(null, function (data) {
      collegeaa = data.college.split(" ").join("+");
    
      console.log(collegeaa);
  
     

      var tix = "https://4only.xyz/rmp/?name=" + nameFinal.replace(" ", "+") + "&uni="+collegeaa;
    console.log(tix);
    //alert("working " + tix);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", tix.trim(), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);

        chrome.tabs.executeScript({
          code: 'document.body.style.backgroundColor="red"'
        });
        chrome.tabs.sendRequest(tab.id, { method: "gotName", data: resp,uni:  data.college});
      }
    }
    xhr.send();
    
    });

  

  });
});

chrome.runtime.onInstalled.addListener(function (d) {
  if(d.reason == 'install') { // init needed data
    chrome.storage.local.set({
      running: true,
      college: "All Colleges"
    });
  }
  chrome.tabs.create({url: "https://darshanbhatta.com/rmp"}, function (tab) {
    console.log("New tab launched with https://darshanbhatta.com/rmp");
});
});