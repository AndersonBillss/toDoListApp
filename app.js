
const lists = {};

let listNumber = 1;
document.getElementById('newListButton').addEventListener('click',function(){
  
    let newListTitle = document.getElementById('newListTitle').value

    if (newListTitle != 0 && newListTitle != null && newListTitle !=undefined ){
        lists[listNumber]=({name:newListTitle, todos: []})
        listNumber++
        render()
    }
    console.log(lists)
}
)



function render(){
    let listsHtml = `<ul class="listGroup">`;
    for(i=1; i<=Object.keys(lists).length; i++){
        let listItem = lists[i];
        console.log(listItem.name)
        listsHtml += `<li class="listGroupItem">` + listItem.name + `</li>`;
    }
      listsHtml += `</ul>`
      document.getElementById("lists").innerHTML = listsHtml;
}