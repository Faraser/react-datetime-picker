var Reflux = require('reflux');
var TodoActions = require('./actions');
var React = require('react/addons');

var update = React.addons.update;

var TodoStore = Reflux.createStore({
    listenables: TodoActions,
    addTodo: function (text) {
        this.state.todos = this.state.todos.concat([{name: text, complete: false}]);
        this.trigger(this.state);
    },
    removeTodo: function (i) {
        this.state.todos = this.state.todos.filter(function (item, index) {
            return index !== i
        });
        this.trigger(this.state);
    },
    updateTodo: function (text, i) {
        this.state.todos = this.state.todos.map(function (item, index) {
            if (index === i) {
                return update(item, {name: {$set: text}})
            }
            return item
        });
        this.trigger(this.state);
    },
    toggleTodo: function (i) {
        this.state.todos = this.state.todos.map(function (item, index) {
            if (index === i) {
                return update(item, {complete: {$set: !item.complete}})
            }
            return item;
        });
        this.trigger(this.state);
    },
    toggleAllTodo: function (checked) {
        this.state.todos = this.state.todos.map(function (item) {
            return update(item, {complete: {$set: checked}})
        });
        this.state.completeAll = checked;
        this.trigger(this.state);
    },
    clearCompleted: function(){
        this.state.todos = this.state.todos.filter(function(item){return item.complete === false});
        this.trigger(this.state);
    },
    getInitialState: function () {

        this.state = {
            todos: [{name: 'ddf', complete: false}, {name: 'dddff', complete: false}],
        };
        return this.state
    }

});

module.exports = TodoStore;