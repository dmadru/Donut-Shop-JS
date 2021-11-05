var donutTypes = [
    "Boston Creme",
    "Jelly filled", 
    "Pumpkin",
    "Glazed"
];

var donutPrices = [
    1.25,
    1.50,
    1.75,
    1.00
];

var coffeeTypes = [
    "Cappucino",
    "Latte", 
    "Mocha",
    "Pumpkin spice",
    "Black"
];

var coffeePrices = [
    5,
    4.5,
    6,
    7.5,
    2.5
];

function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
 }
 
function buildMenu(itemNames, itemPrices) {
    var menuSelection = document.donutOrder.menuSelection;
    for(var i = 0; i < itemNames.length; i++) {
        var name = itemNames[i];
        var price = itemPrices[i];
        var opt = document.createElement("option");
        var text = document.createTextNode(name + 
            " (" + formatUSCurrency(price) + ")");
        opt.appendChild(text);
        opt.menuItemName = name;
        opt.menuItemPrice = price;
        menuSelection.appendChild(opt);
    }
}

function handleMenuSelection() {
    var menuSelection = document.donutOrder.menuSelection;
    var selected = menuSelection.selectedOptions;
    if (selected.length >= 1) {
        var opt = selected[0];
        console.log("Menu item selected: " + opt.menuItemName);
        console.log("Price of item selected: " + formatUSCurrency(opt.menuItemPrice));
    } else {
        console.log("Nothing is selected");
    }
}

function changeMenu() {
    var menuSelection = document.donutOrder.menuSelection;
    while(menuSelection.firstElementChild) {
        menuSelection.removeChild(menuSelection.firstElementChild);
    }
    if (document.donutOrder.donutMenu.checked) {
        buildMenu(donutTypes, donutPrices);
    } else {
        buildMenu(coffeeTypes, coffeePrices);
    }
}

function calcTotal() {
    var list = document.getElementById("itemList");
    var total = 0;
    for(item of list.children) {
        total += item.itemPrice;
    }
    document.getElementById("orderTotal").textContent = formatUSCurrency(total);
}
function addOrderDetail() {
    var menuSelection = document.donutOrder.menuSelection;
    var selected = menuSelection.selectedOptions;
    if (selected.length >= 1) {
        var opt = selected[0];
        console.log("Menu item selected: " + opt.menuItemName);
        console.log("Price of item selected: " + opt.menuItemPrice);
        var qty = parseInt(document.donutOrder.itemQty.value);
        var newItem = document.createElement("li");
        var price = qty * opt.menuItemPrice;
        newItem.textContent = opt.menuItemName + "(" + qty + ")  = " + price;
        newItem.itemPrice = price;
        newItem.addEventListener("click", function(){newItem.remove(); calcTotal();});
        var list = document.getElementById("itemList");
        list.append(newItem);
        calcTotal();
    } else {
        console.log("Nothing is selected");
    }
}

window.addEventListener("load", function() {
    var menuSelection = document.donutOrder.menuSelection;
    menuSelection.addEventListener("change", handleMenuSelection);
    document.donutOrder.donutMenu.addEventListener("change", changeMenu);
    document.donutOrder.coffeeMenu.addEventListener("change", changeMenu);
    buildMenu(donutTypes, donutPrices);

    document.donutOrder.custName.addEventListener("change", function(e) {
        document.getElementById("summaryCustName").textContent = 
        document.donutOrder.custName.value;
    });
    this.document.donutOrder.addItem.addEventListener("click", addOrderDetail);
});