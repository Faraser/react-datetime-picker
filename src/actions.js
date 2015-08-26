var Reflux = require('reflux');

var TodoActions = Reflux.createActions([
    "addTodo",
    "removeTodo",
    "updateTodo",
    "toggleTodo",
    "toggleAllTodo",
    "clearCompleted"
]);

module.exports = TodoActions;