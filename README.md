Feature Rich and Intuitive To Do List App

This is a feature rich to do list app that allows you to create lists and add Items to the lists. You can also search for lists, delete/edit lists/items, and reorder things using the drag and drop feature. On the left-hand side of the list, you can quickly see how much stuff you have left to do in a list This app, and with the press of a button, check off items, and delete all completed items from your list, making it easy to manage your todos as well as track your progress.

To use this app, enter a list name in the left-hand box. Press enter or the "add list" button to add your list. Your new list will appear below the list input section. you can switch between lists by simply clicking the list you want to select.

Adding an item to your list is just as easy. Simply type in your item on the right hand box and press enter of the "add item" button.

Delete any list or todo by pressing their corresponding trash icons. Edit any list/todo by clicking the pencil icon. A text box will appear where you can enter any title you want. Press enter to confirm your new name, and the list/todo will update. If the text box is empty when you press enter, it will keep the previous title.

You can reorder your items by simply dragging them in between 2 other items. To search for a list, enter your search in the search bar on the top portion of the screen. Any list with the letters you type will be highlighted to make them easier to find.

Each todo has a togglable checkbox to keep track of what you have completed. a button to the right of the screen will remove all completed todos. On the left of each list, there is a number indicating how many todos you have, and how many are complete.



Docker container

to serve a docker container with this app, enter the following commands into the command line (replace todolistapp with the name of the directory the to do list app files are in)

 1: docker build -t todolistapp:latest .
 2: docker run -d --rm --name buster -p 80:80 todolistapp:latest


Docker stack

Run the following command to deploy a docker stack
  docker stack deploy -c docker-compose.yaml (stack name)
  replace (stack name) with service1 or service2.

to 