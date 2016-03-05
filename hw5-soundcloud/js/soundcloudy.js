// Event hander for calling the SoundCloud API using the user's search query

var searchResultsArray = [];

function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{
			'q': query,
			'limit': '24'
		},
		function(data) {
			searchResultsArray = data;
			displaySearchResults();
		},
		'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

$("#searchForm").submit(function(e) {
    e.preventDefault();
		console.log(e);
		console.log("search form submitted");
		var query = document.getElementById("search").value;
		if (query === "") {
	    return;
	  }
	  console.log("Searching SC with query: " + query);

		callAPI(query);
		$("#search").blur();
});

function displaySearchResults() {
	// clear searchResults section firstChild
	$("#searchResults").html("");

	data = searchResultsArray;
	console.log(data);
	for(i=0; i< data.length; i++) {
		console.log("Song title: "+data[i].title);
		console.log("Artwork: "+data[i].artwork_url);
		console.log("URL: "+data[i].permalink_url);

		insertSongCard(i, getRowElementToInsertCardInto(i));
	}


	$(".hide").removeClass("hide"); // display playlist Div after songs have loaded
	$(".showinitial").remove(); // removing the initial arrow pointing to search box
}

function getRowElementToInsertCardInto(index) {
	// row logic, because the cards are of different sizes, and masonry is too much of a pain
	if ((index) % 3 === 0){
		console.log("adding new row: " + index);
		newRow = document.createElement("DIV");
		newRow.className = "row";

		$("#searchResults").append(newRow);
		return newRow;
	}
	console.log("not adding new row. Returning: ");
	console.log($("#searchResults:last-child"));
	lastRow = document.getElementById("searchResults").lastElementChild;
	// return $("#searchResults:last-child");
	return lastRow;
}

function insertSongCard(index, rowElement) {
	// inserts one single song card, for the song object in "index" numbered element in "searchResultsArray"
	/*jshint multistr: true */
	var songCard = document.createElement("DIV");
  songCard.className = "col s6 m4";

	songCard.innerHTML =
	'<div class="card hoverable">\
		<div class="card-image">\
			<img class="responsive-img" src="' + getAlbumCoverURL(index) +'" alt="" />\
		</div>\
		<div class="card-content">\
			<em>Artist: '+ getArtist(index) +'</em> \
			<p>Song: '+ getSongTitle(index) +'</p> \
		</div>\
		<div class="card-action">\
			<a class="btn-floating blue" onclick="changeTrack(&quot;'+ getSongURL(index) +'&quot;)"><i class="material-icons">play_arrow</i></a>\
			<a class="btn-floating orange right"><i class="material-icons" onclick="addToPlaylist('+index+')")>add</i></a>\
		</div>\
	</div>';

	rowElement.appendChild(songCard);
}

function getArtist(index) {
	return searchResultsArray[index].user.username;
}

function getSongTitle(index) {
	return searchResultsArray[index].title;
}

function getSongURL(index) {
	return searchResultsArray[index].permalink_url;
}

function getAlbumCoverURL(index) {
	// in case there is no album cover
	if (searchResultsArray[index].artwork_url === null){
		return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
	}
	return searchResultsArray[index].artwork_url;
}

function addToPlaylist(index) {
	console.log("Song added to playlist: " + index);
	var song = document.createElement("DIV");
	song.className = "section";

	/*jshint multistr: true */
	song.innerHTML =	'<div class="row nobottommargin">\
		<div class="col s3">\
			<img class="responsive-img" src="'+ getAlbumCoverURL(index) +'" alt="" />\
		</div>\
		<div class="col s8">\
			<p class="truncate">'+ getArtist(index) +'</p>\
			<em>'+ getSongTitle(index) +'</em>\
		</div>\
		<div class="col s1">\
			<a onclick="moveUp(this)" class="clickable"><i class="small material-icons">keyboard_arrow_up</i></a>\
			<a onclick="moveDown(this)" class="clickable"><i class="small material-icons">keyboard_arrow_down</i></a>\
		</div>\
	</div>\
	<div class="row nobottommargin">\
		<a class="btn btn-floating blue left" onclick="changeTrack(&quot;'+ getSongURL(index) +'&quot;)"><i class="tiny material-icons">play_arrow</i></a>\
		<a class="btn btn-floating red right" onclick="removeSong(this)"><i class="tiny material-icons">remove</i></a>\
	</div>';

	var playlistEntry = document.createElement("DIV"); // creating a playlistEntry div, which will contain the divider and the song div
	var divider = document.createElement("DIV");
	divider.className = "divider";

	playlistEntry.appendChild(divider);
	playlistEntry.appendChild(song);

	$(".playlist-entries").prepend(playlistEntry);
	// $(".playlist-entries").prepend(divider);

}

function removeSong(target){
	playlistEntryDiv = target.parentElement.parentElement.parentElement;

	console.log("removing song from playlist");
	playlistEntryDiv.remove();
}

function moveUp(target){
	console.log("moving up");
	thisDiv = target.parentElement.parentElement.parentElement.parentElement;
	prevDiv = thisDiv.previousElementSibling;

	$(prevDiv).insertAfter($(thisDiv));
}

function moveDown(target) {
	console.log("moving down");
	thisDiv = target.parentElement.parentElement.parentElement.parentElement;
	nextDiv = thisDiv.nextElementSibling;

	$(thisDiv).insertAfter($(nextDiv));
}
