Todos = new Meteor.Collection('todos');

if(Meteor.isClient){

    Template.todos.helpers({
        'todo': function(){
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.todoItem.events({
        'click .delete-todo': function(event){
            event.preventDefault();
            var documentId = this._id;
            var confirm = window.confirm("Delete this task?");
            if(confirm){
                Todos.remove({ _id: documentId });
            }
        }
    });

    Template.addTodo.events({
        'submit form': function(event){
            event.preventDefault();
            var todoName = $('[name="todoName"]').val();
            Todos.insert({
                name: todoName,
                completed: false,
                createdAt: new Date()
            });
            $('[name="todoName"]').val('');
        }
    });

}

if(Meteor.isServer){
    // server code goes here
}