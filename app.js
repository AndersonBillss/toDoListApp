
let lists = {};

let itemNumber = 0
let selectedListIndex = 1;
let selectedList

//test button for debugging purposes
document.getElementById('test').addEventListener('click',function(){
    console.log(lists)
})
//clear local storage button
document.getElementById('storageClear').addEventListener('click',function(){
    localStorage.clear()
    console.log("cleared local storage")
})


//get local storage
if(localStorage.getItem("lists") !== null){
    let listStringGet = localStorage.getItem("lists")
    lists = JSON.parse(listStringGet)
    selectedListIndex = localStorage.getItem("selectedListIndex")
    console.log("grabbed stored array")
    //iterate through each list and each item to add whether they are checked
    for(i=1; i<=Object.keys(lists).length; i++){
        for(j=0; j<lists[i].todos.length; j++){
            lists[i].todos[j].completed = JSON.parse(localStorage.getItem(i + "listComplete" + j))
        }
    }
}

render()

//get the index of the selected list and switch to it
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



//clear completed items
document.getElementById("deleteCheckedItems").addEventListener("click", function(){
    //for each item
    for(i=0; i<selectedList.todos.length; i++){
        if(selectedList.todos[i].completed === true){
            selectedList.todos.splice(i, 1)
            i--
        }
    }
    render()
})


//function to add a list to the array
let listNumber = Object.keys(lists).length+1
function addList(){
    //stores the new list title as a variable
    let newListTitle = document.getElementById('newListTitle').value.trim()
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
    if (newListTitle !== null && newListTitle !== ""){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
        render()
    } else {
        document.getElementById("warningList").innerHTML = `Please enter a list name!`
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
    let listHtmlName = document.getElementsByClassName("listEditBox")
    listHtmlName[editIdNum-1].innerHTML = `<input type="text" placeholder="` + lists[editIdNum].name + `" id="editInput">`


    document.getElementById("editInput").addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const newListEditTitle = document.getElementById("editInput").value.trim()
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
function removeItem(){
    const removeId = this.id
    const removeIdNumLength = removeId.length-10
    const removeIdNum = Number(removeId.slice(-removeIdNumLength));

    selectedList.todos.splice((removeIdNum-1), 1)

    render()
}

function editItem(){
    render()
    //get the id value
    const editId = this.id
    const editIdNumLength = editId.length-8
    const editIdNum = Number(editId.slice(-editIdNumLength));

    document.getElementById("itemName" + editIdNum).remove()

    //create the input box
    let itemHtmlName = document.getElementsByClassName("itemEditBox")
    itemHtmlName[editIdNum-1].innerHTML = `<input type="text" placeholder="` + selectedList.todos[editIdNum-1] + `" id="editInput">`


    document.getElementById("editInput").addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            const isCompleted = selectedList.todos[editIdNum-1].completed
            const newItemEditTitle = document.getElementById("editInput").value.trim()
            for(i=0; (i<=selectedList.todos.length-1); i++){
                let listItem = selectedList.todos[i];
                if((newItemEditTitle == listItem) && (newItemEditTitle != selectedList.todos[editIdNum-1])){
                    document.getElementById("warningItem").innerHTML = newItemEditTitle + " already exists!"
                    return
                }
            }
            document.getElementById("warningList").innerHTML = ""
            if ((newItemEditTitle !== "") && (newItemEditTitle !== null)){
                lists[selectedListIndex].todos[editIdNum-1] = [newItemEditTitle]
                lists[selectedListIndex].todos[editIdNum-1].completed = isCompleted
                
                render()
            } else{
                render()
            }
        }
    })
}


//function to add an item to a list
function addItem(){
    selectedList = lists[selectedListIndex];
    //stores the new item's name as a variable
    let newItemName = document.getElementById('newItemName').value.trim()
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
    if (newItemName !== null && newItemName !== ""){
        itemNumber = lists[selectedListIndex].todos.length
        selectedList.todos[itemNumber] = [newItemName]
        selectedList.todos[itemNumber].completed = false;
        render()
    } else {
        document.getElementById("warningItem").innerHTML = `Please enter an item name!`
        return
    }
    document.getElementById('newItemName').value = "" 
}

function markComplete(){
    const checkboxId = this.id
    const checkboxIdNumLength = checkboxId.length-8
    const checkboxIdNum = Number(checkboxId.slice(-checkboxIdNumLength))

    lists[selectedListIndex].todos[checkboxIdNum-1].completed = this.checked
    render()
}




function render(){

    //store info in local storage
    const listString = JSON.stringify(lists)
    localStorage.setItem("lists", listString)
    localStorage.setItem("selectedListIndex", selectedListIndex)

    //clear inputs and warnings
    document.getElementById("warningList").innerHTML = ""
    document.getElementById("warningItem").innerHTML = ""
    document.getElementById('newItemName').value = "" 

    if(lists[1] !== undefined){

        const selectedList = lists[selectedListIndex];

        //render list of lists
        let listsHtml = `<ul class="listGroup" id="listOfLists">`;
        for(i=1; i<=Object.keys(lists).length; i++){
            let listItem = lists[i];

            let numberCompleted = 0
            for(j=0; j<listItem.todos.length; j++){
                if(listItem.todos[j].completed === true){
                    numberCompleted++
                }
                //save which todos are complete
                localStorage.setItem(i + "listComplete" + j, listItem.todos[j].completed)
            }
            
            let numberSelectedCompleted = 0
            for(j=0; j<selectedList.todos.length; j++){
                if(selectedList.todos[j].completed === true)
                numberSelectedCompleted++
            }
            if(numberSelectedCompleted == 0){
                document.getElementById('deleteCheckedItems').classList = "hidden"
            } else {
                document.getElementById('deleteCheckedItems').classList = "button"
            }

            if(listItem !== undefined){
                listsHtml += `
                <li class="listGroupItem button">
                    <div class="switchLists" id="listName` + i + `">
                        <div class="listToDoNumber listValue">` + lists[i].todos.length + `</div>
                        <div class="numberCompleted listValue">` + numberCompleted + `</div>
                        ` + listItem.name + `
                    </div>
                    <div class="listEditBox">
                    </div>
                    <div class="listButtons">
                        <i class="fa-solid fa-pencil listPencil" id="listEdit` + i + `"></i>
                        <i class="fa-solid fa-trash listTrash" id   ="listRemove` + i + `"></i>
                    </div>
                </li>
                `;
            }
        }
        listsHtml += `</ul>`
        document.getElementById("lists").innerHTML = listsHtml;


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
        if(selectedList != null/*  && selectedList != undefined */){
            document.getElementById('selectedName').innerHTML = selectedList.name

            //render todos
            let itemsHtml = `<ul class="itemGroup" id="listOfItems">`
            for(i=0; i<Object.keys(selectedList.todos).length; i++){

                let item = selectedList.todos[i]
                let checkedHtml
                if(lists[selectedListIndex].todos[i].completed === true){
                    checkedHtml = "checked"
                } else {
                    checkedHtml = ""
                }

                itemsHtml += `
                <li class="itemGroupItem">
                    <div>
                        <div class="itemEditBox"></div>
                        <div id="itemName` + (i+1) + `">
                            <input type="checkbox" class="taskComplete" id="checkbox` + (i+1) + `" ` + checkedHtml + `>
                            ` + item + `
                        </div>
                    </div>
                    <div class="itemButtons">
                        <i class="fa-solid fa-pencil itemPencil" id="itemEdit` + (i+1) + `"></i>
                        <i class="fa-solid fa-trash itemTrash" id="itemRemove` + (i+1) + `"></i>
                    </div>
                </li>`

            }
            document.getElementById('listItems').innerHTML = itemsHtml;
            //hides contentRight html when there are no lists to display 
            document.getElementById('contentRight').className = ""

            let listTasks = document.getElementsByClassName("taskComplete")
            for(i=0; i<Object.keys(selectedList.todos).length; i++){
                listTasks[i].addEventListener('click', markComplete)
            }
        } else
        document.getElementById('contentRight').className = "hidden"

        if(document.getElementsByClassName('listOfItems').innerHTML !== "undefined"){
            let itemDeleteButtonArray = document.getElementsByClassName('itemTrash')
            let itemEditButtonArray = document.getElementsByClassName('itemPencil')
            for(i=0; i<lists[selectedListIndex].todos.length; i++){
                //delete
                itemDeleteButtonArray[i].addEventListener('click', removeItem)
                //edit
                itemEditButtonArray[i].addEventListener("click", editItem)
            }
        }
    } else{
        document.getElementById("lists").innerHTML = ""
        document.getElementById('listItems').innerHTML = ""
        document.getElementById('contentRight').className = "hidden"
    }
    
}

