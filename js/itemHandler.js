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


function compareItems(item1, item2) {
  for (let key in item1) {
    if (object.hasOwnProperty(key)) {
      if (item1[key] !== item2[key])
        return flase;
    }
  }

  return true;
}