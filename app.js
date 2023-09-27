
const lists = {};

let itemNumber = selectList.length

//get the index of the selected list and switch to it
let selectedListIndex = 1;
function selectList(){

    const selectedListId = this.id
    const selectedListIdNum = Number(selectedListId.charAt(selectedListId.length -1));
    const htmlListArray = document.getElementsByClassName('listGroupItem')

    selectedListIndex = selectedListIdNum;
    render()
    itemNumber = selectList.length


    //gives selected list a class of selected
    for(i=0; i<Object.keys(lists).length; i++){
        const listId = htmlListArray[i].id
        const listIdNum = Number(listId.charAt(listId.length -1));

        if (listIdNum == selectedListIdNum){
            document.getElementById('list' + (i + 1)).className = "selected listGroupItem button"
        } else{
            document.getElementById('list' + (i + 1)).className = "listGroupItem button"
        }
    }
}


//add list button and enter press
document.getElementById('newListButton').addEventListener('click', addList)
document.getElementById('newListTitle').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addList();
    }
})
//add item button and enter press
document.getElementById('newItemButton').addEventListener('click', addItem)
document.getElementById('newItemName').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addItem();
    }
})


//function to add a list to the array
let listNumber = 1
function addList(){
    //stores the new list title as a variable
    let newListTitle = document.getElementById('newListTitle').value
    //error message (when you make a duplicate list)
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        if(newListTitle == listItem.name){
            document.getElementById("warningList").innerHTML = newListTitle + " already exists!"
            return
        }
    }
    document.getElementById("warningList").innerHTML = ""

    //adds new list to the array
    if (newListTitle != 0 && newListTitle != null && newListTitle !=undefined ){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
        render()
    }
    console.log(lists)
    document.getElementById('newListTitle').value = ""
}



//function to add an item to a list
function addItem(){
    const selectedList = lists[selectedListIndex];

    //stores the new item's name as a variable
    let newItemName = document.getElementById('newItemName').value

    //error message (when you make a duplicate item)
    for(i=0; i<=Object.keys(selectedList.todos).length; i++){
        let item = selectedList.todos[i]
        if(newItemName == item){
            document.getElementById("warningItem").innerHTML = newItemName + " already exists!"
            return
        }
    }
    document.getElementById("warningItem").innerHTML = ""

    //add new Item to list
    if (newItemName != 0 && newItemName != null && newItemName !=undefined ){
        selectedList.todos[itemNumber] = [newItemName]
        itemNumber++
        render()
    }
    console.log(lists)
    document.getElementById('newItemName').value = "" 
}



function render(){
    //render list of lists
    const selectedList = lists[selectedListIndex];

    let listsHtml = `<ul class="listGroup">`;
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        listsHtml += `<li class="listGroupItem button">` + listItem.name + `</li>`;
    }
    listsHtml += `</ul>`
    document.getElementById("lists").innerHTML = listsHtml;

    //makes each list a button that lets you switch between lists
    const htmlListArray = document.getElementsByClassName('listGroupItem')
    for(i=0; i<=(Object.keys(lists).length-1); i++){
        htmlListArray[i].addEventListener('click', selectList)
        htmlListArray[i].id = "list" + (i+1)

        //adds selected class to selected list
        const selectedListId = htmlListArray[(selectedListIndex-1)].id
        const selectedListIdNum = Number(selectedListId.charAt(selectedListId.length -1));
        const listId = htmlListArray[i].id
        const listIdNum = Number(listId.charAt(listId.length -1));
        if (listIdNum == selectedListIdNum){
            document.getElementById('list' + (i + 1)).className = "selected listGroupItem button"
        } else{
            document.getElementById('list' + (i + 1)).className = "listGroupItem button"
        }
    }

    //render selected list title
    if(selectedList != null && selectedList != undefined){
        document.getElementById('selectedName').innerHTML = selectedList.name

        //render todos
        let itemsHtml = `<ul class="itemGroup">`
        for(i=0; i<Object.keys(selectedList.todos).length; i++){
            let item = selectedList.todos[i]
            itemsHtml += `<li class="itemGroupItem">` + item + `</li>`
        }
        document.getElementById('listItems').innerHTML = itemsHtml;
        //hides contentRight html when there are no lists to display 
        document.getElementById('contentRight').className = ""
    } else
    document.getElementById('contentRight').className = "hidden"
}




//test button for debugging purposes
document.getElementById('test').addEventListener('click',function(){
})

