import { myCollection, deleteList, deleteFromList, createNewPlaylist, getEventTarget, addToColletion } from './main';

export function createSearchCardList(posterPath, i) {
    const div = document.getElementById('searchCardList');

    const poster = `<div class="col-sm-3 card" style="width: 18rem; height: 297px; background: black;">
                <img src="https://image.tmdb.org/t/p/w500/${posterPath}">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                 <button id="movie_${i}" type="button" style="float: right; background: indianred; border-radius: 5px;">Add</button>      
                 </div>    
            </div>`;
    div.insertAdjacentHTML('beforeend', poster);
}


export function openAddModal(i) {
    $('#myModal').modal('toggle');
    let btn = document.getElementById('createPlaylistBtn');
    btn.onclick = function() {
        createNewPlaylist(i);
    };
    let ul = document.getElementById('playlistGroup');
    ul.onclick = function(event) {
        let target = getEventTarget(event);
        let name = target.innerHTML;
        addToColletion(name, i);
    };
    document.getElementById('newPlaylistInput').value = ' ';
}

export function openMyList(i) {
    const div = document.getElementById('myListCollection');
    div.innerHTML = '';
    const editBtn = document.getElementById('editBtn');
    editBtn.style.display = 'inline-block';

    document.getElementById('searchCardList').innerHTML = ' ';
    document.getElementById('myCollectionDisplay').innerHTML = ' ';
    for (let k = 0; k < myCollection[i].arrayName.length; k += 1) {
        const poster = `<div class="col-sm-3 card myList" style="width: 18rem; height: 297px; background: black;">
                <img src="${myCollection[i].arrayName[k]}">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                    <button type="button" style="float: right; background: indianred; border-radius: 5px;" id="openMyList_${i}_${k}">Remove</button>      
                 </div>    
            </div>`;
        div.insertAdjacentHTML('beforeend', poster);
        const deleteBtn = document.getElementById(`openMyList_${i}_${k}`);
        deleteBtn.onclick = () => {
            deleteFromList(deleteBtn.id.slice(-1), i);
        };
    }

    editBtn.setAttribute('onclick', 'performEditMode()');
}

export function createMyCollectionList(i) {
    const div = document.getElementById('myCollectionDisplay');
    const collectionList = `<div class="col-sm-3 card" style="width: 18rem; height: 297px; background: black;">
                <img src="${myCollection[i].arrayName[0]}" id="myCollectionListImage_${i}">
                 <div class="card-body" style="padding-top: 10px; padding-bottom: 0px;">
                    <button type="button" style="float: right; background: indianred; border-radius: 5px;" id="myCollectionList_${i}">Delete List</button>      
                 </div>    
            </div>`;
    div.insertAdjacentHTML('beforeend', collectionList);
    const img = document.getElementById(`myCollectionListImage_${i}`);
    img.onclick = () => {
        openMyList(i);
    };
    const deleteBtn = document.getElementById(`myCollectionList_${i}`);
    deleteBtn.onclick = () => {
        deleteList(i);
    };
}