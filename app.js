
const lists = {};

let listNumber = 1;
document.getElementById('newListButton').addEventListener('click',function(){
  
    let newListTitle = document.getElementById('newListTitle').value

    if (newListTitle != 0 && newListTitle != null && newListTitle !=undefined ){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
    }
    console.log(lists)
}
)


function render(){
    
}