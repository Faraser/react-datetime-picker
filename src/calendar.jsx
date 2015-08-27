var React = require('react');
var _ = require('underscore');

var cal_days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var cal_months_labels = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getFirstWeek(a) {
    var firstWeek = [];
    if (a === 1) {
        return firstWeek
    }
    if (a === 0) {
        return [0, 0, 0, 0, 0, 0]
    }
    for (var i = 1; i < a; i++) {
        firstWeek.push(0);
    }
    return firstWeek;
}


function generateMatrix(startDay, monthLength) {
    var res = [];
    res.push(getFirstWeek(startDay));

    var days = _.range(1, monthLength + 1);
    for (var week = 0; week < 6; week++) {
        if (week > 0) {
            res.push([])
        }
        while (res[week].length < 7 && days.length > 0) {
            res[week].push(days.shift())
        }
    }
    return res
}


var Calendar = React.createClass({
    getInitialState: function () {
        return {
            currentDate: new Date()
        }
    },
    handleNextMonth: function () {
        var date = new Date(this.state.currentDate);
        date.setMonth(date.getMonth() + 1);
        this.setState({
            currentDate: date
        })
    },
    handlePrevMonth: function () {
        var date = new Date(this.state.currentDate);
        date.setMonth(date.getMonth() - 1);
        this.setState({
            currentDate: date
        })
    },
    render: function () {
        var month = this.state.currentDate.getMonth();
        var year = this.state.currentDate.getYear();
        var startDay = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), 1);
        startDay = startDay.getDay();
        var monthLength = cal_days_in_month[month];
        if (month == 1) { // February only!
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                monthLength = 29;
            }
        }
        var monthName = cal_months_labels[month];

        var matrix = generateMatrix(startDay, monthLength);
        var setDate = this.props.setDate;
        var currentDate = this.state.currentDate;
        return (
            <div>
                <Header
                    year={year}
                    month={monthName}
                    nextMonth={this.handleNextMonth}
                    prevMonth={this.handlePrevMonth}
                    />
                <table className="datetime__table">

                    <tr>{cal_days_labels.map(function (item, i) {
                        return (<th key={i}>{item}</th>)
                    })}</tr>
                    <tr>
                        {matrix.map(function (item, index) {
                            return <tr key={index}>
                                {item.map(function (el, i) {

                                    if (el === 0) {
                                        return <td className="empty" key={i}></td>
                                    }
                                    return (
                                        <DateItem
                                            item={el}
                                            setDate={setDate}
                                            curDate={currentDate}
                                            key={i}
                                            />)
                                })}</tr>
                        })}
                    </tr>
                </table>
            </div>
        )
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <div className="datetime__header">
                <button className="datetime__btn datetime__btn--prev" onClick={this.props.prevMonth}></button>
                {this.props.month + " "}
                {this.props.year + 1900}
                <button className="datetime__btn" onClick={this.props.nextMonth}></button>
            </div>
        )
    }
});

var DateItem = React.createClass({
    setDate: function () {
        var date = this.props.curDate;
        date.setDate(this.props.item);
        console.log(date);
        this.props.setDate(date);
    },
    render: function () {
        return (
            <td onClick={this.setDate} className="full">{this.props.item}</td>
        )
    }
});

module.exports = Calendar;

