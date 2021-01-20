var clientID = "RWpQDqJa_3VQh8Wb5YytLe6TaVFIgwag6ZyFx7VoPqEBuWjAq0u9mstSZkeJmq3K";
var clientSECRET = "4B22ckPytP5w5ttJqdUBYIYRdxXp24RLYGOx1oEH3K5uSrXl5mQVz_zcSIKo_NW1ZXwrVULb64XlhMkafic2mQ";
var accessTOKEN = "access_token=OrTWjemvvPo4KiOVeBiLIcspKVjNEfkztrS2YyS-H_9HId2gk5CX_N_E7RBN5BAF";
var searchlink = "https://api.genius.com/search?q=";
var artistsongLink = "https://api.genius.com/artists/"
var songTitle = "";
var artist1 = "";
document.getElementById("Search").addEventListener("click", searchGenius);
function searchGenius()
{
  //console.log("inside searchGenius method");
  if(document.getElementById("SearchInput").value != null && document.getElementById("SearchInput").value != "")
  {
    //console.log("inside if statement");
    document.getElementById("GeniusSearchResults").innerHTML = "";
    var q = document.getElementById("SearchInput").value;
    var newstr = "";
    for(var i = 0; i < q.length; i++)
    {
      if(i === q.length - 1)
      {
        if(q.substring(i) === " ")
        {
          newstr+="%20"
        }
        else {
          newstr += q.substring(i);
        }
      }
      else
      {
        if(q.substring(i, i + 1) === " ")
        {
          newstr+="%20";
        }
        else
        {
          newstr+=q.substring(i, i + 1);
        }
      }
    }
    var xhttp = new XMLHttpRequest();
    //console.log(newstr);
    var str12 = searchlink + newstr;
    xhttp.open("GET", str12+"&"+accessTOKEN, true);
    xhttp.send();
    xhttp.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status == 200)
      {
        var json = JSON.parse(this.response);
        var arr = json['response']['hits'];
        var song = arr[0];
        var string = song['result']['primary_artist']['name'];
        var id = json['response']['hits'][0]['result']['primary_artist']['id'];
        var artist = document.createElement("p");
        songTitle = json['response']['hits'][0]['result']['title_with_featured'];
        var songT = document.createElement("p");
        var s = "Artist name: " + string;
        artist1 = string;
        var image = document.createElement("div");
        var link = document.createElement("a");
        var text = "Link to song lyrics on genius";
        link.href = json['response']['hits'][0]['result']['url'];
        link.innerText = text;
        link.className = "artistName";
        image.innerHTML = "<img src = \"" + json['response']['hits'][0]['result']['song_art_image_url'] + "\"alt = \"SongImage\" style = \"width: 225px; height:225px;\">";
        image.className = "artistName";
        songT.innerText = songTitle;
        songT.className = "artistName";
        artist.innerText=s;
        artist.className = "artistName";
        document.getElementById("GeniusSearchResults").append(songT);
        document.getElementById("GeniusSearchResults").append(link)
        document.getElementById("GeniusSearchResults").append(artist);
        document.getElementById("GeniusSearchResults").append(image);
        //console.log(s);
        searchGenius2(id);
      }
      else {
        console.log(this.readyState);
      }
    }
  }
}
function searchGenius2(id)
{
  //console.log("insidesearchGenius2 method");
  //console.log(artist1);
  var str = id.toString(10);
  //console.log(str);
  var artistsongLink1 = artistsongLink + str + "/songs?sort=popularity";
  var xhttp1 = new XMLHttpRequest();
  //console.log(artistsongLink1 + accessTOKEN);
  xhttp1.open("GET", artistsongLink1+"&"+accessTOKEN, true);
  xhttp1.send();
  xhttp1.onreadystatechange = function()
  {
    if(this.readyState == 4 && this.status == 200)
    {
      var json1 = JSON.parse(this.response);
      var hits = json1['response']['songs'];
      var listofPopSongs = "";
      var i = 0;
      while(i < 15)
      {
        if(i >= hits.length)
        {
          break;
        }
        if(hits[i]['title_with_featured'] !== songTitle && hits[i]['primary_artist']['name'] === artist1)
        {
          listofPopSongs += hits[i]['title'];
          if(i != 14)
          {
            listofPopSongs += ", ";
          }
        }
        i++;
      }
      var popsongs = document.createElement("p");
      popsongs.innerText = "Other popular songs by this artist include: " + listofPopSongs;
      popsongs.className = "artistName";
      document.getElementById("GeniusSearchResults").append(popsongs);
    }
  }
}
