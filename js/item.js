//import { item, compareItems } from itemHandler;
class item {
  constructor(name, price, imgUrl, size) {
    this._name = name;
    this._price = price;
    this._imgUrl = imgUrl;
    this._size = size;
    this._count = 1;
  }

  get price() {
    return this._price;
  }

  get name() {
    return this._name;
  }

  set count(val) {
    this._count += val;
  }

  get count() {
    return this._count;
  }

  get imgUrl() {
    return this._imgUrl;
  }

  get size() {
    return this._size;
  }
}


function itemsEqual(item1, item2) {
  for (let key in item1) {
      if (key !== 'count' && key !== 'id' && item1[key] !== item2[key])
        return false;
  }

  return true;
}


window.addEventListener('load', () => {
  let storage = window.localStorage;
  let addToBagBtn = document.getElementById('addToBagBtn');
  addToBagBtn.addEventListener('click', () => {

    // change total cost and count in the top of the page
    let price = parseFloat(document.getElementById('price').innerHTML);
    let count = document.getElementById('count');
    let totalCost = document.getElementById('totalCost');
    count.innerHTML = parseInt(count.innerHTML) + 1;
    totalCost.innerHTML = Math.round((parseFloat(totalCost.innerHTML) + price) * 100) / 100;

    // read item details from the localStorage which were written at the catalog page
    let thisItem = JSON.parse(storage.getItem('itemFromCatalog'));

    // add new properties to selected item
    thisItem.name = document.querySelector('.item-description h2').innerHTML;
    thisItem.price = price;
    thisItem.size = document.querySelector('input[name=size]:checked').id;
    thisItem.color = document.querySelector('input[name=color]:checked').id;

    // read content of the bag from the localStorage
    let bag = JSON.parse(storage.getItem('bag')) || [];

    // check if the same item in the bad is exist (the same name, size and color)
    let isItemEquel = false;
    let id;
    if (bag.length){
      for (let i = 0; i < bag.length; i++){
        if (itemsEqual(bag[i], thisItem)){
          bag[i].count++;
          isItemEquel = true;
          storage.setItem('bag', JSON.stringify(bag));
          return;
        }
      }
      thisItem.id = bag[bag.length - 1].id + 1;
    } else {
      storage.setItem('bag', '[]');
      thisItem.id = 1;
    }

    // if curren item doesn't exist in the bag
    thisItem.count = 1;
    bag.push(thisItem);
    storage.setItem('bag', JSON.stringify(bag));
    console.log(thisItem);
  });

  let thumbs = document.querySelectorAll('.thumbs div img');
  let fullImg = document.querySelector('.full-img img');

  for(let i = 0; i < thumbs.length; i++){
    thumbs[i].addEventListener('click', () => {
      fullImg.src = thumbs[i].src;
      clearThumbsDivClassName();
      thumbs[i].parentElement.className = 'chosen';
    });
  }

  function clearThumbsDivClassName(){
    for (let i = 0; i < thumbs.length; i++){
      thumbs[i].parentElement.className = '';
    }
  }
});