var React = require('react/addons');
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
            <div className="datetime">
                <input
                    type="text"
                    onFocus={this.showPopup}
                    onBlur={this.hidePopup}
                    value={this.state.date}
                    className="datetime__input"
                    />

                <div className={this.state.active ? 'datetime__cal datetime__cal--active': 'datetime__cal'}>
                    <Calendar setDate={this.setDate}/>
                </div>
            </div>
        )
    }
});


module.exports = DatePicker;


