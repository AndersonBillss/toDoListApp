
const lists = {};


/* const lists = {1: {name: 'aaaa', todos: []}, 2: {name: 'aa', todos: []}, 3: {name: 'aaa', todos: []}}; */


let selectedListIndex = 1;



//add list button
document.getElementById('newListButton').addEventListener('click', addList)
document.getElementById('newListTitle').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addList();
    }
})
//add item button
document.getElementById('newItemButton').addEventListener('click', addItem)
document.getElementById('newItemName').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addItem();
    }
})


//add list
let listNumber = 1
function addList(){
    let newListTitle = document.getElementById('newListTitle').value
    //error message
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        if(newListTitle == listItem.name){
            document.getElementById("warningList").innerHTML = newListTitle + " already exists!"
            return
        }
    }
    document.getElementById("warningList").innerHTML = ""

    //add new list
    if (newListTitle != 0 && newListTitle != null && newListTitle !=undefined ){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
        render()
    }
    console.log(lists)
    document.getElementById('newListTitle').value = ""
}



//add item
let itemNumber = 0
function addItem(){
    const selectedList = lists[selectedListIndex];

    let newItemName = document.getElementById('newItemName').value

    //error message
    for(i=0; i<=Object.keys(selectedList.todos).length; i++){
        let item = selectedList.todos[i]
        if(newItemName == item){
            document.getElementById("warningItem").innerHTML = newItemName + " already exists!"
            return
        }
    }
    document.getElementById("warningItem").innerHTML = ""

    //add new Item
    if (newItemName != 0 && newItemName != null && newItemName !=undefined ){
        selectedList.todos[itemNumber] = [newItemName]
        itemNumber++
        render()
    }
    console.log(lists)
    document.getElementById('newItemName').value = "" 
}



function render(){
    //list of lists
    const selectedList = lists[selectedListIndex];

    let listsHtml = `<ul class="listGroup">`;
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        listsHtml += `<li class="listGroupItem button">` + listItem.name + `</li>`;
    }
    listsHtml += `</ul>`
    document.getElementById("lists").innerHTML = listsHtml;

    //add buttons to each list
   /*  for(i=1; i<=Object.keys(lists).length; i++) */

    //display selected list title
    if(selectedList != null && selectedList != undefined){
        document.getElementById('selectedName').innerHTML = selectedList.name

        //todos
        let itemsHtml = `<ul class="itemGroup">`
        for(i=0; i<Object.keys(selectedList.todos).length; i++){
            let item = selectedList.todos[i]
            itemsHtml += `<li class="itemGroupItem">` + item + `</li>`
        }
        document.getElementById('listItems').innerHTML = itemsHtml;
        //hide contentRight html
        document.getElementById('contentRight').className = "none"
    } else
    document.getElementById('contentRight').className = "hidden"
}





document.getElementById('test').addEventListener('click',function(){
})

