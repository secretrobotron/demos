(function(){

  var __listDir = "lists/";

  var __listsNames = [
    "games",
    "music-videos"
  ];

  function List(name){

    var _element = document.createElement("div");

    _element.className = "list";

    function Item(jsonItem){
      var item = document.createElement("div");
      var link = document.createElement("a");
      var reference = document.createElement("span");
      item.className = "item";
      link.className = "item-link";
      reference.className = "item-reference";
      link.innerHTML = jsonItem.name;
      link.href = jsonItem.link;
      reference.innerHTML = jsonItem.reference;
      item.appendChild(link);
      item.appendChild(reference);
      _element.appendChild(item);
    }

    var title = document.createElement("h1");
    _element.appendChild(title);

    var url = __listDir + name + ".json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.requestType = "text/json";
    xhr.onload = function(e){
      if(xhr.response){
        var json = JSON.parse(xhr.response);
        title.innerHTML = json.name;
        for (var i = json.items.length - 1; i >= 0; i--) {
          Item(json.items[i]);
        };
        document.body.appendChild(_element);
      }
    }
    xhr.send();    
  }

  function onLoad(){
    for (var i = __listsNames.length - 1; i >= 0; i--) {
      List(__listsNames[i]);
    }
  }

  if(document.body){
    onLoad();
  }
  else{
    document.addEventListener("DOMContentLoaded", onLoad, false);
  }
  

}());