$("#button").on("click", buttonHandler);

function buttonHandler(){
  console.log("Yay");
  $.get("http://api.npr.org/query? id=1032&output=JSON&apiKey=MDIyNjgyMTI3MDE0NTUzMjAyNDIwNDFmNg000",
  {},
  function(data){
    console.log(data);
    $("p").html("<pre>"+data+"</pre>");
  },
  "json"
  );
}
