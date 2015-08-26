var React = require('react/addons');
var Reflux = require('reflux');
var TodoActions = require('./actions');
var TodoStore = require('./storage');
var Calendar = require('./calendar');

var DatePicker = React.createClass({
    getInitialState: function () {
        return {
            active: false,
            date: ''
        }
    },
    showPopup: function () {
        this.setState({
            active: true
        })
    },
    setDate: function(date){
        console.log('day', date);
        this.setState({
            active: false,
            date: date.toDateString()
        })
    },
    handleClick: function (e) {
        if (this.getDOMNode().contains(e.target)) {
            return;
        }
        this.setState({active: false})
    },
    componentWillMount: function () {
        document.addEventListener('click', this.handleClick, false);
    },

    componentWillUnmount: function () {
        document.removeEventListener('click', this.handleClick, false);
    },
    render: function () {
        return (
            <div >
                <input
                    type="text"
                    onFocus={this.showPopup}
                    onBlur={this.hidePopup}
                    value={this.state.date}
                    />

                <div className={this.state.active ? 'picker': 'hide'}>
                    <Calendar setDate={this.setDate}/>
                </div>
            </div>
        )
    }
});


module.exports = DatePicker;


