
const lists = {};
let editMode = false;

let itemNumber = 0
let selectedList

//get the index of the selected list and switch to it
let selectedListIndex = 1;
function selectList(){
    const selectedListId = this.parentElement.id
    //length of the id so I can grab the number
    idNumberLength = selectedListId.length-4
    const selectedListIdNum = Number(selectedListId.slice(-idNumberLength));
    //switches selected list to the one with the clicked list's id number
    selectedListIndex = selectedListIdNum;
    selectedList = lists[selectedListIndex];
    //index of the next item that will be added to the selected list
    itemNumber = selectedList.todos.length;
    render()
}


document.getElementById('editListButton').addEventListener('click', function(){
//toggle edit mode
    editMode = !editMode
    document.getElementById('editListButton').classList.toggle('selected')
    render()
})


//add list button and enter press
document.getElementById('newListButton').addEventListener('click', addList)
document.getElementById('newListTitle').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        addList();
    }
})
//add edit list button


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
        if((newListTitle == listItem.name)){
            document.getElementById("warningList").innerHTML = newListTitle + " already exists!"
            return
        }
    }
    document.getElementById("warningList").innerHTML = ""
    //adds new list to the array
    if (newListTitle != null && newListTitle != "" ){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
        render()
    }
    //clears the new list input box
    document.getElementById('newListTitle').value = ""
}

//function to remove a list
function removeList(){
    const removeId = this.id
    const removeIdNumLength = removeId.length-10
    const removeIdNum = Number(removeId.slice(-removeIdNumLength));
    //stop from switching lists
    delete lists[removeIdNum]
    if((removeIdNum <= selectedListIndex) && (selectedListIndex > 1)){
        selectedListIndex--
    }

    //the following for loop condenses the lists array so that there are no undefined indexes
    let n = 0
    for(i=1; i<=(Object.keys(lists).length); i++){
        if (lists[i] === undefined){
            n++
        }
        lists[i] = lists[i+n]
    }
    if(lists[Object.keys(lists).length] === undefined){
        delete lists[Object.keys(lists).length]
    }
    listNumber--
    render()
}
//function to edit a list
function editList(){
    render()
    //get the id value
    const editId = this.id
    const editIdNumLength = editId.length-8
    const editIdNum = Number(editId.slice(-editIdNumLength));

    document.getElementById("listName" + editIdNum).remove()

    //create the input box
    let listHtmlName = document.getElementsByClassName("editBox")
    listHtmlName[editIdNum-1].innerHTML = `<input type="text" placeholder="` + lists[editIdNum].name + `" id="editInput">`


    document.getElementById("editInput").addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const newListEditTitle = document.getElementById("editInput").value
            for(i=1; i<=Object.keys(lists).length; i++){
                let listItem = lists[i];
                if((newListEditTitle == listItem.name) && (newListEditTitle != lists[editIdNum].name)){
                    document.getElementById("warningList").innerHTML = newListEditTitle + " already exists!"
                    return
                }
            }
            document.getElementById("warningList").innerHTML = ""
            if ((newListEditTitle !== "") && (newListEditTitle !== null)){
                lists[editIdNum].name = newListEditTitle
                render()
            } else{
                render()
            }
        }
    })
}


//function to add an item to a list
function addItem(){
    let selectedList = lists[selectedListIndex];
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
    if (newItemName != 0 && newItemName != null && newItemName != undefined ){
        selectedList.todos[itemNumber] = [newItemName]
        itemNumber++
        render()
    }
    document.getElementById('newItemName').value = "" 
}




function render(){

    document.getElementById("warningItem").innerHTML = ""
    document.getElementById('newItemName').value = "" 

    //render list of lists
    const selectedList = lists[selectedListIndex];

    let listsHtml = `<ul class="listGroup" id="listOfLists">`;
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        if(listItem !== undefined){
            listsHtml += `
            <li class="listGroupItem button">

                    <div class="switchLists" id="listName` + i + `">` + listItem.name + `</div>
                    <div class="editBox"></div>
                    <div class="listButtons">
                        <i class="fa-solid fa-pencil listPencil" id="listEdit` + i + `"></i>
                        <i class="fa-solid fa-trash listTrash" id="listRemove` + i + `"></i>
                    </div>
                
                    
            </li>
            `;
        }
    }
    listsHtml += `</ul>`
    document.getElementById("lists").innerHTML = listsHtml;

    if(editMode === true){
        document.getElementById('listOfLists').className = "listGroup editMode"
    }else{
        document.getElementById('listOfLists').className = "listGroup"
    }

    //add delete and edit list buttons
    if(document.getElementsByClassName('listGroup').innerHTML !== 0){
        let listDeleteButtonArray = document.getElementsByClassName('listTrash')
        let listEditButtonArray = document.getElementsByClassName('listPencil')
        for(i=0; i<Object.keys(lists).length; i++){
            //delete
            listDeleteButtonArray[i].addEventListener('click', removeList)
            //edit
            listEditButtonArray[i].addEventListener("click", editList)
        }
    }
    

    //makes each list a button that lets you switch between lists
    const htmlListArray = document.getElementsByClassName('switchLists')
    for(i=0; i<=(Object.keys(lists).length-1); i++){

        htmlListArray[i].addEventListener('click', selectList)
        htmlListArray[i].parentElement.id = "list" + (i+1)

        //adds selected class to selected list
        const selectedListId = htmlListArray[(selectedListIndex-1)].parentElement.id
        idNumberLength = selectedListId.length-4
        const selectedListIdNum = Number(selectedListId.slice(-Number(idNumberLength)))

        const listId = htmlListArray[i].parentElement.id
        idNumberLength = listId.length-4
        let listIdNum = Number(listId.slice(-Number(idNumberLength)))

        if(listIdNum == selectedListIdNum){
            document.getElementById('list' + (i+1)).className = "selected listGroupItem button"
        } else{
            document.getElementById('list' + (i+1)).className = "listGroupItem button"
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
/*     console.log(selectList) */
    console.log(lists)
})

