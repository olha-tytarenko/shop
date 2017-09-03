let storage = window.localStorage;
let bag = JSON.parse(storage.getItem('bag'));
let totalCost = 0;
let count = 0;
if (bag){
  for (let i = 0; i < bag.length; i++){
    count+= bag[i].count;
    totalCost += bag[i].price * bag[i].count;
  }
}



window.addEventListener('load', () => {

  console.log(storage);
  document.getElementById('totalCost').innerHTML = Math.round(totalCost * 100) / 100;
  document.getElementById('count').innerHTML = count;
  let isSearchFieldInputOpened = false;
  let isOpenMenu = false;
  let menuBtn = document.getElementById('menuBtn');

  menuBtn.addEventListener('click', () => {
    let menu = document.getElementsByClassName('mobile-group')[0];
    if (isOpenMenu) {
      menu.className = 'mobile-group';
      menuBtn.className = menuBtn.className.split(' ')[0] + ' menu-btn-closed';
    } else {
      menu.className += ' active-menu';
      menuBtn.className = menuBtn.className.split(' ')[0] + ' menu-btn-opened'
    }
    isOpenMenu = !isOpenMenu;
  });


  let magnifier = document.querySelector('.magnifier');
  magnifier.addEventListener('click', () => {
    let searchFieldInput = document.querySelector('.search input');
    console.log(searchFieldInput.classList);
    if (isSearchFieldInputOpened) {
      searchFieldInput.className = '';
    } else {
      searchFieldInput.className = 'search-input-field';
    }

    isSearchFieldInputOpened = !isSearchFieldInputOpened;
  });
});