class Stopwatch extends React.Component {

    constructor(display) {
        super(display);
        this.state = {
            timeTable: [],
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        };
    }

    reset() {
        this.setState({
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        });
    }

    format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        if (!this.state.running) return;
        let miliseconds = this.state.times.miliseconds;
        let seconds = this.state.times.seconds;
        let minutes = this.state.times.minutes;

        miliseconds++;

        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }

        this.setState({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        })
    }

    stop() {
        this.state.running = false;
        clearInterval(this.watch);
    }

    deleteList() {
        this.state.timeTable = [];
        document.getElementById('results').innerHTML = '';
    }

    results() {
        const time = this.format(this.times);
        this.state.timeTable = [...this.state.timeTable, time];
        const pos = this.state.timeTable.length - 1;
        const res = document.getElementById('results');
        const list = document.createElement('li');
        list.innerText = time;
        res.appendChild(list);
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

	render() {
		return React.createElement('div', {},
			React.createElement('div', {className: 'nav'},
      			React.createElement('button', {onClick: () => this.start()}, 'Start'),
      			React.createElement('button', {onClick: () => this.stop()}, 'Stop'),
      			React.createElement('button', {onClick: () => this.reset()}, 'Reset'),
      			React.createElement('button', {onClick: () => this.results()}, 'Save'),
      			React.createElement('button', {onClick: () => this.deleteList()}, 'Delete')
    		),
    		React.createElement('div', {id: 'container', className: 'container'},
    			React.createElement('div', {id: 'stopwatch', className: 'stopwatch'}, this.format())
    		),
    		React.createElement('ul', {id: 'results', className: 'results'})
    	)
  	}
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));