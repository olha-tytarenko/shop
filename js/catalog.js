window.addEventListener('load', () => {

  let storage = window.localStorage;
  storage.removeItem("itemFromCatalog");

  let isFilterOpened = false;
  let isFilterHeadersSet = false;
  let filters = document.querySelector('.filters');


  filters.addEventListener('click', (event) => {
    console.log(event.target.nodeName);
    let item = event.target;
    if (document.documentElement.clientWidth > 1024) {

      if (item.classList[0] !== 'name') {
        let filterHeaderElement = item.parentNode.parentNode.firstElementChild;

        if (item.innerHTML === 'Not selected') {
          if (filterHeaderElement.lastElementChild.className !== 'filter-name') {
            filterHeaderElement.removeChild(filterHeaderElement.lastElementChild);
            filterHeaderElement.className = 'name';
          }
        } else if (filterHeaderElement.lastElementChild.className !== 'filter-name') {
          filterHeaderElement.lastElementChild.innerHTML = item.innerHTML;
        } else {
          let filterName = filterHeaderElement.innerHTML;
          let selectedFilter = item.innerHTML;
          filterHeaderElement.className += ' selected-filter';
          let span = document.createElement('span');
          span.innerHTML = selectedFilter;
          filterHeaderElement.appendChild(span);
        }
      }
    } else if (document.documentElement.clientWidth > 768){
      if (event.target.nodeName === 'DIV' || event.target.className){}
    }
  });



  function removeFilterHeaders() {
    let allSelects = document.getElementsByClassName('select');
    for (let i = 0; i < allSelects.length; i++) {
      allSelects[i].removeChild(allSelects[i].firstChild);
    }
  }


  function setFilterHeaders() {
    let allSelects = document.getElementsByClassName('select');
    for (let i = 0; i < allSelects.length; i++) {
      let filterHeader = allSelects[i].previousElementSibling.innerHTML;
      let li = document.createElement('li');
      li.innerHTML = filterHeader;
      li.className = 'first-child';
      allSelects[i].insertBefore(li, allSelects[i].firstChild);
    }
  }


  function clearAllClass(elem) {
    let boxElem = elem;
    elem.previousElementSibling;
    while (elem) {
      if (elem.className !== 'first-child') {
        elem.className = '';
      }
      elem = elem.previousElementSibling;
    }
    elem = boxElem.nextElementSibling;
    while (elem) {
      elem.className = '';
      elem = elem.nextElementSibling;
    }
  }

  function changeFilterName(element, content, className) {
    element.innerHTML = content;
    element.className = className;
  }


  let linksToItems = document.querySelectorAll('.img-wrap a');
  let itemImages = document.querySelectorAll('.img-wrap a img');
  for (let i = 0; i < linksToItems.length; i++) {
    linksToItems[i].addEventListener('click', (event) => {
      event.preventDefault();
      storage.setItem("itemFromCatalog", JSON.stringify({ hrefToItem: linksToItems[i].href, imgUrl: itemImages[i].src }));
      location = linksToItems[i].href;
    });
  }

});