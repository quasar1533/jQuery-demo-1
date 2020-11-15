let $div1 = $("#test");
let $div2 = $div1.find(".child");
$div1.addClass("parent");
console.log($div2);
console.log($div1);

$div2.addClass("happy");
$div2.end().addClass("back");

$div1.each((item) => {
  console.log(item);
});

let $div3 = $("<div>template</div>");
console.log($div3);

console.log($div2.parent());
$div2.siblings().print();