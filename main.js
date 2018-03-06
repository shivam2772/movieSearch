import $ from 'jquery';
const API_KEY = "4b49b7bb59981b56801da00e344f82c1";
const base_url = "https://api.themoviedb.org/3/search/movie?api_key=4b49b7bb59981b56801da00e344f82c1&language=en-US&query=";
const last_url = "&page=1&include_adult=false";
let posterList = [];
let searchDrop = [];
let myCollection = [];

$(document).ready(function() {
    console.log("inside ready");
    $('#searchMovie').on('keyup', function() {
        var inputKey = document.getElementById('searchMovie').value;
        console.log(inputKey);
        if (inputKey == null || inputKey == "") {
            document.getElementById('searchCardList').innerHTML = " ";
            document.getElementById('myCollectionDisplay').innerHTML = " ";
            document.getElementById('searchCardList').style.display = 'none';
            document.getElementById('myCollectionDisplay').style.display = 'flex';

            for (let i = 0; i < myCollection.length; i++)
                createMyCollectionList(i);
        } else {
            document.getElementById('myCollectionDisplay').style.display = 'none';
            document.getElementById('searchCardList').style.display = 'flex';
            var datalist = document.getElementById('movieOptionsList');
            var out = [];
            //${API_KEY}

            let url = base_url + inputKey + last_url;

            //console.log(url);

            fetch(url)
                .then(function(result) {
                    return result.json();
                }).then(function(result) {
                    out = result.results;
                    //console.log(out.length);

                    while (datalist.hasChildNodes()) {
                        datalist.removeChild(datalist.firstChild);
                    }
                    document.getElementById('searchCardList').innerHTML = " ";
                    for (let i = 0; i < out.length; i++) {
                        //console.log(out[i].original_title);
                        var option = document.createElement('option');
                        option.value = out[i].original_title;
                        datalist.appendChild(option);
                        //console.log(out[i].poster_path);
                        if (out[i].poster_path != null) {
                            let path = "https://image.tmdb.org/t/p/w500" + out[i].poster_path;
                            posterList.push(path);
                            createSearchCardList(out[i].poster_path, i);
                            //posterPath.push(path);
                        }
                    }
                    //console.log("result: " + result);
                }).catch(function(err) {
                    console.log("fail: " + err);
                });
        }
    });
});



function searchResult() {

    var out;
    var searchText = document.getElementById('searchMovie').value;
    console.log(searchText);
    let url = base_url + searchText + last_url;
    console.log("on button click");
    console.log(url);

    fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(result) {
            out = result.results;
            //console.log(out.length);
            //console.log("result: " + result);

            for (let i = 0; i < out.length; i++) {
                console.log(out[i].original_title);
            }
        }).catch(function(err) {
            console.log("fail: " + err);
        });
}

// function openAddModal(i) {
//     console.log("inside modal");
//     $('#myModal').modal('toggle');
//     var btn = document.getElementById('createPlaylistBtn');
//     btn.onclick = function() {
//         createNewPlaylist(i);
//     }
//     var ul = document.getElementById('playlistGroup');
//     ul.onclick = function(event) {
//         var target = getEventTarget(event);
//         var name = target.innerHTML;
//         addToColletion(name, i);
//         //console.log(name);
//     }
//     document.getElementById('newPlaylistInput').value = " ";

// }

function addToColletion(name, i) {
    console.log("add to collection was called");
    console.log(posterList[i]);
    console.log(name);
    for (let k = 0; k < myCollection.length; k++) {
        if (myCollection[k].name == name) {
            myCollection[k].arrayName.push(posterList[i]);
            console.log("pushed");
        }
    }
    console.log(myCollection);
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function createNewPlaylist(id) {

    console.log("createnewPlayList was called");
    console.log(id);
    var playlistName = document.getElementById('newPlaylistInput').value;
    var ul = document.getElementById('playlistGroup');
    var li = document.createElement("li");
    li.setAttribute('class', 'list-group-item');
    li.appendChild(document.createTextNode(playlistName));
    li.setAttribute('id', playlistName);
    li.setAttribute('data-dismiss', 'modal');
    ul.appendChild(li);
    var obj = {};
    obj.name = playlistName;
    obj.arrayName = new Array();
    obj.arrayName.push(posterList[id]);
    console.log(posterList[id]);
    myCollection.push(obj);
}

function deleteList(i) {
    var li = document.getElementById(myCollection[i].name);
    li.parentNode.removeChild(li);
    console.log(li.innerHTML);
    for (let k = 0; k < myCollection.length; k++) {
        if (i == k) {
            console.log("i is eqal to k");
            myCollection.splice(i, 1);
        }
    }
    console.log(myCollection.length);
    document.getElementById('myCollectionDisplay').innerHTML = " ";
    for (let i = 0; i < myCollection.length; i++)
        createMyCollectionList(i);

}

function createSearchCardList(posterPath, i) {

    var div = document.getElementById('searchCardList');

    var poster = `<div class="col-sm-3 card" style="width: 18rem; height: 297px; background: black;">
                <img src="https://image.tmdb.org/t/p/w500/${posterPath}">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                 <button id="movie_${i}" type="button" style="float: right; background: indianred; border-radius: 5px;">Add</button>      
                 </div>    
            </div>`;
    div.insertAdjacentHTML('beforeend', poster);
    let btn = $(`#movie_${i}`).click = function() {
        console.log("on button click");
        $('#myModal').modal('toggle');
        var btn = document.getElementById('createPlaylistBtn');
        btn.onclick = function() {
            createNewPlaylist(i);
        }
        var ul = document.getElementById('playlistGroup');
        ul.onclick = function(event) {
            var target = getEventTarget(event);
            var name = target.innerHTML;
            addToColletion(name, i);
            //console.log(name);
        }
        document.getElementById('newPlaylistInput').value = " ";
    }
}

function createMyCollectionList(i) {

    var div = document.getElementById('myCollectionDisplay');
    console.log(myCollection[i].name);
    var collectionList = `<div class="col-sm-3 card" style="width: 18rem; height: 297px; background: black;">
                <img src="${myCollection[i].arrayName[0]}" onclick="openMyList(${i})">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                    <button type="button" style="float: right; background: indianred; border-radius: 5px;" onclick="deleteList(${i});">Delete List</button>      
                 </div>    
            </div>`;
    div.insertAdjacentHTML('beforeend', collectionList);
}

function deleteFromList(itemIndex, listIndex) {
    myCollection[listIndex].arrayName.splice(itemIndex, 1);
    openMyList(listIndex);
}


function openMyList(i) {
    console.log(i);
    var div = document.getElementById('myListCollection');
    div.innerHTML = "";
    var editBtn = document.getElementById('editBtn');
    editBtn.style.display = 'inline-block';

    document.getElementById('searchCardList').innerHTML = " ";
    document.getElementById('myCollectionDisplay').innerHTML = " ";
    for (let k = 0; k < myCollection[i].arrayName.length; k++) {
        var poster = `<div class="col-sm-3 card myList" style="width: 18rem; height: 297px; background: black;">
                <img src="${myCollection[i].arrayName[k]}">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                    <button type="button" style="float: right; background: indianred; border-radius: 5px;" onclick="deleteFromList(${k},${i})">Remove</button>      
                 </div>    
            </div>`;
        div.insertAdjacentHTML('beforeend', poster);
    }
    editBtn.setAttribute('onclick', 'performEditMode()');

}