import React from 'react';
import {Line} from 'react-chartjs-2';

class PeriodicalInvestment extends React.Component{
  constructor(){
    super();

    this.state = {
      chart:{
      labels: this.setLabels(10),
      datasets: [
        {
          label: 'Periodical investment calculator',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.periodicalInvesment(
            10,
            10,
            1.1,
            10
          )
        }
      ]
     }
    }
  }

  setLabels(years){
    let labels = []
    for (var i=0; i<years; i++) {
        labels.push(i)
    }
    return labels
  }

  periodicalInvesment(startSum,inputValue,intrestRate,years){
    let iRate = 1 + (intrestRate/100)

    let y = this.setLabels(years)
    let moneyTrack = [startSum]
    y.reduce((prevValue,curentValue)=>{
      prevValue = parseFloat(prevValue) + parseFloat(inputValue);
      prevValue = prevValue * parseFloat(iRate);
      moneyTrack.push(Math.round(prevValue))
      return prevValue;
    },startSum)

    return moneyTrack;
  }

  update(e) {
    let years = this.years.refs.input.value;
    if (!years){
      years = 5;
    }

    let intrestRate = this.intrestRate.refs.input.value;
    let inputValue = this.inputValue.refs.input.value;
    let startSum = this.startSum.refs.input.value;

    let dataset = this.periodicalInvesment(
      startSum ? startSum : 0,
      inputValue ? inputValue : 10,
      intrestRate ? intrestRate : 0,
      years ? years : 10
    )

    this.setState({
      final : dataset[dataset.length-1],
      chart:{
      labels: this.setLabels(years),
      datasets: [
        {
          label: 'Value',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: dataset
        }
      ]
     }
    })
  }

  render(){
    return <div className="line-chart">
        <Line data={this.state.chart} />
        <h1>{this.state.final}</h1>
        <div className="data-table">
            <ul>
              <li>Years : <Input
                ref={component => this.years = component}
                update={this.update.bind(this)}/></li>
                <li>Intrest rate: <Input
                ref={component => this.intrestRate = component}
                update={this.update.bind(this)}/></li>
                <li>Periodical input: <Input 
                ref={component => this.inputValue = component}
                update={this.update.bind(this)}/></li>
                <li>Initial sum: <Input
                ref={component => this.startSum = component}
                update={this.update.bind(this)}/></li>
            </ul>
        </div>
    </div>
  }
}

class App extends React.Component{
  render(){
    return <div><PeriodicalInvestment/></div>
  }
}

class Input extends React.Component {
  render(){
    return <div><input ref="input" onChange={this.props.update} type="number"/></div>
  }
}

export default App;
