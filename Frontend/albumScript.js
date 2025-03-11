
// Konstruktorfunktion til at oprette Album-objekter
// Den holder 6 parametre
// artist: Kunstner navn
// album: Album navnet
// totalTracks: Antal tracks på albummet
// rating: Hvilken rating albummet har
// prodYear: Hvornår albummet er udgivet
// trackList: Her tager jeg trackList arrayet og henter trackTitle inde i den
function Album(artist, album, totalTracks, rating, prodYear, trackList) {
    this.artist = artist;
    this.album = album;
    this.totalTracks = totalTracks;
    this.rating = rating;
    this.prodYear = prodYear;
    this.trackList = trackList.map(function(track) {
        return track.trackTitle;
    });
}


// Her tilføjer jeg styling til min tabel
let style = document.createElement("style");
style.innerHTML = `
    table {
        border: 1px solid #dededf;
        height: 100%;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        border-spacing: 1px;
        text-align: left;
    }

    th {
        border: 1px solid #dededf;
        background-color: #eceff1;
        color: #000000;
        padding: 5px;
    }

    td {
        border: 1px solid #dededf;
        background-color: #ffffff;
        color: #000000;
        padding: 5px;
    }
    
`;
document.head.appendChild(style); 

// Funktion til at generere en tabel med album data 
function addTableWithAlbums(albums, parentId) {
    var parentElement = document.getElementById(parentId);
    if (!parentElement) return;
    
    var table = document.createElement("table");
    
    var headerRow = document.createElement("tr");
    var headers = ["Artist", "Album", "Total Tracks", "Rating", "Production Year", "Track List"];
    
    headers.forEach(function(headerText) {
        var th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    
    albums.forEach(function(album, index) {
        var row = document.createElement("tr");
        
        var artistCell = document.createElement("td");
        artistCell.textContent = album.artist;
        row.appendChild(artistCell);
        
        var albumCell = document.createElement("td");
        albumCell.textContent = album.album;
        row.appendChild(albumCell);
        
        var totalTracksCell = document.createElement("td");
        totalTracksCell.textContent = album.totalTracks;
        row.appendChild(totalTracksCell);
        
        var ratingCell = document.createElement("td");
        ratingCell.textContent = album.rating;
        row.appendChild(ratingCell);
        
        var prodYearCell = document.createElement("td");
        prodYearCell.textContent = album.prodYear;
        row.appendChild(prodYearCell);
        
        var trackListCell = document.createElement("td");
        var trackListDiv = document.createElement("div");
        trackListDiv.textContent = album.trackList.join(", ");
        trackListDiv.style.display = "none";
        trackListDiv.id = "trackList-" + index;
        
        var toggleButton = document.createElement("button");
        toggleButton.textContent = "Show tracks";
        toggleButton.onclick = function () {
            if (trackListDiv.style.display === "none") {
                trackListDiv.style.display = "block";
                toggleButton.textContent = "Hide tracks";
            } else {
                trackListDiv.style.display = "none";
                toggleButton.textContent = "Show tracks";
            }
        };
        
        trackListCell.appendChild(toggleButton);
        trackListCell.appendChild(trackListDiv);
        row.appendChild(trackListCell);
        
        table.appendChild(row);
    });
    
    parentElement.innerHTML = "";
    parentElement.appendChild(table);
}

// Henter albumdata fra "albums.json" og genererer en tabel
fetchContent("albums.json").then(function(albums) {
    var albumObjects = albums.map(function(album) {
        return new Album(album.artistName, album.albumName, album.trackList.length, album.rating, album.productionYear, album.trackList);
    });
    
    addTableWithAlbums(albumObjects, "content");
});

// A magic spell - memorise it and use it EXACTLY like this :)
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}
