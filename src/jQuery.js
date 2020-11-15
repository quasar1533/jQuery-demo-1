window.$ = window.jQuery = function (selectorOrHTMLOrArray) {
  let elements;
  if (typeof selectorOrHTMLOrArray === "string") {
    if (selectorOrHTMLOrArray.trim()[0] === "<") {
      let temp = document.createElement("template");
      temp.innerHTML = selectorOrHTMLOrArray.trim(); //套路和细节
      elements = [temp.content.firstChild];
    } else {
      elements = document.querySelectorAll(selectorOrHTMLOrArray);
    }
  } else if (selectorOrHTMLOrArray instanceof Array) {
    elements = selectorOrHTMLOrArray;
  }
  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    elements: elements,
    preApi: selectorOrHTMLOrArray.preApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  find(selector) {
    let arr = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      arr = arr.concat(elements2);
    }
    arr.preApi = this;
    return jQuery(arr);
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this;
  },
  end() {
    return this.preApi;
  },
  each(callback) {
    for (let i = 0; i < this.elements.length; i++) {
      callback(this.elements[i]);
    }
    return this;
  },
  parent() {
    let arr = [];
    for (let i = 0; i < this.elements.length; i++) {
      if (arr.indexOf(this.elements[i].parentNode) === -1) {
        //trick，检测重复
        arr.push(this.elements[i].parentNode);
      }
    }
    return jQuery(arr);
  },
  children() {
    let arr = [];
    this.each((node) => {
      arr.push(...node.children);
    }); //运用已有的API，使代码更紧凑
    return jQuery(arr);
  },
  siblings() {
    let arr = [];
    this.each((node) => {
      arr.push(Array.from(node.parentNode.children).filter((n) => n !== node));
    });
    return jQuery(arr);
  },
  print() {
    console.log(this.elements);
    return this;
  },
  get(index) {
    return this.elements[index];
  }, //得到一个单独的节点，这十分重要
};
