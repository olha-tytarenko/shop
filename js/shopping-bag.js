window.addEventListener('load', () => {
  let storage = window.localStorage;
  let totalCostInTop = document.getElementById('totalCost');
  let count = document.getElementById('count');
  let totalCostInBottom = document.querySelector('.total-cost span');
  let itemGroup = document.querySelector('.items-group');
  totalCostInBottom.innerHTML = '£' + totalCostInTop.innerHTML;
  let bag = JSON.parse(storage.getItem('bag'));
  if (bag.length > 0){

    let message = document.querySelector('message-to-user');
    if(message){
      itemGroup.removeChild(message);
    }

    for (let i = 0; i < bag.length; i++) {
      itemGroup.appendChild(getHtmlForItem(bag[i]));
    }
  } else {
    let message = document.querySelector('message-to-user');
    if(!message){
      messageToUser('Your shopping bag is empty. Use Catalog to add new items');
    }
  }


  let removeBtn = document.querySelectorAll('.remove-btn');
  for (let i = 0; i < removeBtn.length; i++){
    removeBtn[i].addEventListener('click', () => {
      let index = parseInt(removeBtn[i].parentElement.parentElement.dataset.index);
      let indexInBag = 0;
      for (let i = 0; i < bag.length; i++){
        if (bag[i].id === index){
          indexInBag = i;
        }
      }

      if (bag[indexInBag].count > 1){
        bag[indexInBag].count--;
        removeBtn[i].previousElementSibling.previousElementSibling.lastChild.innerHTML = parseInt(removeBtn[i].previousElementSibling.previousElementSibling.lastChild.innerHTML) - 1;
        console.log(quantity);
        totalCostInTop.innerHTML =  Math.round((parseFloat(totalCostInTop.innerHTML) - bag[indexInBag].price) * 100) / 100;
        totalCostInBottom.innerHTML = '£' + totalCostInTop.innerHTML;
      } else {
        let parent = removeBtn[i].parentElement.parentElement.parentElement;
        let index = parseInt(removeBtn[i].parentElement.parentElement.dataset.index);
        parent.removeChild(removeBtn[i].parentElement.parentElement);
        bag.splice(indexInBag, 1);
        if (bag.length === 0){
          totalCostInBottom.innerHTML = '£0';
          totalCostInTop.innerHTML = '0';
          messageToUser('Your shopping bag is empty. Use Catalog to add new items');
        }
      }

      count.innerHTML = parseInt(count.innerHTML) - 1;
      storage.setItem('bag', JSON.stringify(bag));
    });
  }

  let linksToItem = document.querySelectorAll('.img-wrap a');

  for (let i = 0; i< linksToItem.length; i++){
    linksToItem[i].addEventListener('click', (event) => {
      event.preventDefault;
      storage.setItem('itemFromCatalog', JSON.stringify({hrefToItem: event.target.parentElement.href, imgUrl: event.target.src}))
      location.href = event.target.href;
    });
  }

  let clearBtn = document.getElementById('clearBtn');
  clearBtn.addEventListener('click', () => {
    clearBag();
    messageToUser('Your shopping bag is empty. Use Catalog to add new items');
  });

  let buyBtn = document.getElementById('buyBtn');
  buyBtn.addEventListener('click', () => {
    if (document.querySelector('.message-to-user')){
      alert('Your shopping bag is empty.');
      return;
    }
    clearBag();
    messageToUser('Thank you for your purchase');
  });

  function clearBag(){
    while(itemGroup.firstChild){
      itemGroup.removeChild(itemGroup.firstChild);
    }
    totalCostInBottom.innerHTML = '£0';
    totalCostInTop.innerHTML = '0';
    count.innerHTML = 0;
    storage.setItem('bag','[]');
  }

  function messageToUser(message){
    let div = document.createElement('div');
    let p = document.createElement('p');
    div.className = 'message-to-user';
    p.innerHTML = message;
    div.appendChild(p);
    itemGroup.appendChild(div);
  }

});



function getHtmlForItem(item) {
  let template = document.createElement('template');
  template.innerHTML =
    `<div class="item" data-index=${item.id}>
      <div class="img-wrap">
        <a href="${item.hrefToItem}"><img class="item-photo" src="${item.imgUrl}"></a>
        <p class="view-item">View item</p>
      </div>    
      <div class="item-description">
        <h3 id="name">${item.name}</h3> 
        <p>
          <span class="total-cost">£${item.price}</span>
          <span>Color: ${item.color}</span>
          <span>Size: UK ${item.size.slice(2)}</span>
          <div>Quantity: <span id="quantity">${item.count}</span></div>
        </p>    
        <button type="button" class="remove-btn">Remove item</button>
      </div>
    </div>`;

  return template.content.firstChild;
}

