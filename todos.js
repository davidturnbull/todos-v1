Todos = new Meteor.Collection('todos');

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/register');
Router.route('/login');

if(Meteor.isClient){

    Template.todos.helpers({
        'todo': function(){
            return Todos.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.todoItem.helpers({
        'checked': function(){
            var isCompleted = this.completed;
            if(isCompleted){
                return "checked";
            } else {
                return "";
            }
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
        },
        'keyup .todo-item-input': function(event){
            if(event.which == 13 || event.which == 27){
                $(event.target).blur();
            } else {
                var documentId = this._id;
                var todoItem = $(event.target).val();
                Todos.update({ _id: documentId }, {$set: { name: todoItem }});
            }
        },
        'change .todo-checkbox': function(){
            var documentId = this._id;
            var isCompleted = this.completed;
            if(isCompleted){
                Todos.update({ _id: documentId }, {$set: { completed: false }});
                console.log("Task marked as incomplete.");
            } else {
                Todos.update({ _id: documentId }, {$set: { completed: true }});
                console.log("Task marked as complete.");
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

    Template.todosCount.helpers({
        'totalTodos': function(){
            return Todos.find().count();
        },
        'completedTodos': function(){
            return Todos.find({ completed: true }).count();
        }
    });

}

if(Meteor.isServer){
    // server code goes here
}