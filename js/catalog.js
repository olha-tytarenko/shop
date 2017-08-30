window.addEventListener('load', () => {

  let isFilterOpened = false;
  let isFilterHeadersSet = false;
  let filters = document.querySelector('.filters');


  filters.addEventListener('click', (event) => {
    console.log(event.target.nodeName);

    if (event.target.nodeName === 'DIV'){
      let allSelects = document.getElementsByClassName('select');
      if(isFilterOpened){
        for (let i = 0; i < allSelects.length; i++){
          allSelects[i].className += ' hide-filters'; 
        }
        removeFilterHeaders();
      } else {
        for (let i = 0; i < allSelects.length; i++){
          allSelects[i].className = allSelects[i].className.replace('hide-filters', '');
        }
        setFilterHeaders();
      }
      isFilterOpened = !isFilterOpened;
    } else {

      let item = event.target;
      if (document.documentElement.clientWidth > 1024){

        if (item.innerHTML === 'Not selected'){
          // change brand-name,
        } else if (item.className !== 'name') {
          console.log('hello');
        }

      } else {
        clearAllClass(item);
        if (item.innerHTML === 'Not selected'){
          item.className = 'not-selected';
          let box = item.previousElementSibling;
          while(box.previousElementSibling){
            box = box.previousElementSibling;
          }
          changeFilterName(item.parentNode.previousElementSibling, box.innerHTML, 'name');
        } else if (item.previousElementSibling) {
          item.className = 'selected-filter';
          changeFilterName(item.parentNode.previousElementSibling, item.innerHTML, 'selected-filter');
        }
      }
    }
  });



  function removeFilterHeaders(){
    let allSelects = document.getElementsByClassName('select');
    for (let i = 0; i < allSelects.length; i++){
      allSelects[i].removeChild(allSelects[i].firstChild);
    }
  }


  function setFilterHeaders(){
    let allSelects = document.getElementsByClassName('select');
    for (let i = 0; i < allSelects.length; i++){
      let filterHeader = allSelects[i].previousElementSibling.innerHTML;
      let li = document.createElement('li');
      li.innerHTML = filterHeader;
      li.className = 'first-child';
      allSelects[i].insertBefore(li, allSelects[i].firstChild);
    }
  }


  function clearAllClass(elem){
    let boxElem = elem;
    elem.previousElementSibling;
    while (elem){
      if (elem.className !== 'first-child'){
        elem.className = '';
      }
      elem = elem.previousElementSibling;
    }
    elem = boxElem.nextElementSibling;
    while (elem){
      elem.className = '';
      elem = elem.nextElementSibling;
    }
  }

  function changeFilterName(element, content, className){
    element.innerHTML = content;
    element.className = className;
  }

});