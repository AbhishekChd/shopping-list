var state = {
    items : []
};
var collectItems = function(state){
    var items = $('.shopping-item');
    for(var i = 0, length = items.length; i < length ; i++)
        state.items[i] = items[i].innerText;
};
var addItem = function (state, item) {
    state.items.push(item);
};
var removeItem = function (state, item) {
    var index = state.items.indexOf(item);
    if(index > -1)
        state.items.splice(index,1);
};
var renderList = function (state, element) {
    var itemsHTML = state.items.map(function (item) {
        return `<li>
                    <span class="shopping-item">${item}</span>
                    <div class="shopping-item-controls">
                      <button class="shopping-item-toggle">
                        <span class="button-label">check</span>
                      </button>
                      <button class="shopping-item-delete">
                        <span class="button-label">delete</span>
                      </button>
                    </div>
                </li>`;
    });
    element.append(itemsHTML[itemsHTML.length-1]);
};

$(function(){
    $(collectItems(state));
    $('form').submit(function (event) {
        event.preventDefault();
        addItem(state, $('#shopping-list-entry').val());
        renderList(state, $('.shopping-list'));
    });
    $('ul').on('click', '.shopping-item-toggle',function(event){
        var item = this.closest('li').children[0];
        $(item).toggleClass('shopping-item__checked');
    });
    $('ul').on('click', '.shopping-item-delete',function(event){
        var item = this.closest('li');
        removeItem(state, $(item)[0].children[0].innerText);
        $(item).remove();
    });
});
