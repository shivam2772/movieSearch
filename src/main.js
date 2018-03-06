import { createSearchCardList, openAddModal, createMyCollectionList, openMyList } from './view';

const baseUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4b49b7bb59981b56801da00e344f82c1&language=en-US&query=';
const lastUrl = '&page=1&include_adult=false';
let posterList = [];
export let myCollection = [];

export function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

export function createNewPlaylist(id) {
    const playlistName = document.getElementById('newPlaylistInput').value;
    const ul = document.getElementById('playlistGroup');
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.appendChild(document.createTextNode(playlistName));
    li.setAttribute('id', playlistName);
    li.setAttribute('data-dismiss', 'modal');
    ul.appendChild(li);
    const obj = {};
    obj.name = playlistName;
    obj.arrayName = new Array();
    obj.arrayName.push(posterList[id]);
    console.log(posterList[id]);
    myCollection.push(obj);
}

export function addToColletion(name, i) {
    console.log('add to collection was called');
    console.log(posterList[i]);
    console.log(name);
    for (let k = 0; k < myCollection.length; k += 1) {
        if (myCollection[k].name == name) {
            myCollection[k].arrayName.push(posterList[i]);
            console.log('pushed');
        }
    }
    console.log(myCollection);
}

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
            let datalist = document.getElementById('movieOptionsList');
            let out = [];
            //${API_KEY}

            let url = baseUrl + inputKey + lastUrl;

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
                            let addBtn = document.getElementById(`movie_${i}`);
                            addBtn.onclick = function() {
                                openAddModal(i);
                            };
                        }
                    }
                    // for (let i = 0; i < out.length; i++) {
                    //     console.log(posterList[i]);
                    //     if (out[i].poster_path != null) {
                            
                    //     }
                    // }
                    //console.log("result: " + result);
                }).catch(function(err) {
                    console.log("fail: " + err);
                });
        }
    });
});

export function deleteList(i) {
    const li = document.getElementById(myCollection[i].name);
    li.parentNode.removeChild(li);
    console.log(li.innerHTML);
    for (let k = 0; k < myCollection.length; k += 1) {
        if (i === k) {
            myCollection.splice(i, 1);
        }
    }
    console.log(myCollection.length);
    document.getElementById('myCollectionDisplay').innerHTML = ' ';
    for (let ii = 0; ii < myCollection.length; ii += 1) { createMyCollectionList(ii); }
}
export function deleteFromList(itemIndex, listIndex) {
    myCollection[listIndex].arrayName.splice(itemIndex, 1);
    console.log(myCollection[listIndex].arrayName.length);
    if (myCollection[listIndex].arrayName.length > 0) { openMyList(listIndex); } else {
        const div = document.getElementById('myListCollection');
        div.innerHTML = '';
        deleteList(listIndex);
    }
}