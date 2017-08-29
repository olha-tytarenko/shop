window.addEventListener('load', () => {

  setFilterHeaders();
  let isFilterOpened = false;
  let filters = document.getElementsByClassName('filters')[0];
  filters.addEventListener('click', (event) => {
    console.log(event.target.nodeName);
    if (event.target.nodeName === 'DIV'){
      let allSelects = document.getElementsByClassName('select');
      if(isFilterOpened){
        for (let i = 0; i < allSelects.length; i++){
          allSelects[i].style.display = 'none';  
        }
      } else {
        for (let i = 0; i < allSelects.length; i++){
          allSelects[i].style.display = 'block';
        }
      }
      isFilterOpened = !isFilterOpened;
    } else {

      let item = event.target;
      clearAllClass(item);
      console.log(item.parentNode);

      if (item.innerHTML === 'Not selected'){
        item.className = 'not-selected';
        let box = item.previousElementSibling;
        while(box.previousElementSibling){
          box = box.previousElementSibling;
        }
        changeFilterName(item.parentNode.previousElementSibling, box.innerHTML, 'name');

      } else if (item.previousElementSibling) {

        console.log(item.previousElementSibling);
        item.className = 'selected-filter';
        changeFilterName(item.parentNode.previousElementSibling, item.innerHTML, 'selected-filter');
      }


    }


  });




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