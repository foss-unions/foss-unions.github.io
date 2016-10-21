$(document).ready(function(){

  var data = {};
  var repo_url = "DATA/REPO.json";
  var result = {};

  $.get(repo_url,function(data){
    console.log(typeof data);
    if(typeof data === "object") {
      store.set("GTUR_REPO_DATA",data);
    }
  });

  $("#gtur_search").keyup(function(){
    console.log($("#gtur_search").val().length);
    if($("#gtur_search").val().length >=3) {
      var options = {
        shouldSort: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        keys: [
          "name","othernames"
        ]
      };
      var term = $("#gtur_search").val();
      var data = store.get("GTUR_REPO_DATA") || { union_entities : [] };
      data = data.union_entities;
      var fuse = new Fuse(data,options);
      result = fuse.search(term);
      console.log(result);
      var rlen = result.length;
      var rows = 1;
      var addrow = "" +
      "<li class='collection-item avatar'>"+
      "<img src='%IMAGE%' alt='Logo' class='circle'>"+
      "<span class='title'>%NAME%</span>"+
      "<p>%GTUUID%</p>"+
      "</li>";

      $("#result_contents").empty();
        if(rlen >0) {
        var append_content = "<ul class='collection'>";
        while(rlen--) {
          var newrow = addrow;
          append_content = append_content + newrow.replace("%IMAGE%",'IMG/'+result[rlen].image).replace("%NAME%",result[rlen].name).replace("%GTUUID%",result[rlen].GTUUID);
        }
        append_content = append_content + "</ul>";
      } else {
        append_content = "<h1>No results</h1>";
      }
      $("#result_contents").append(append_content);
    } else {
      $("#result_contents").empty();
    }
  });
});
