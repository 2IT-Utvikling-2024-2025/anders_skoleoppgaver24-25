import React, { Component } from "react";
import './App.css';

class Converter extends Component {
  state = {
    currencies: ["USD", "NOK", "SGD", "PHP", "EUR", "INR"],
    base: "NOK",
    amount: "",
    convertTo: "USD",
    result: "",
    date: ""
  };

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null
      },
      this.calculate
    );
  };

  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${"32b998dfd8be59d0f67b5d17a0c6f27e"}`)
        .then(res => res.json())
        .then(data => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date
          });
        });
    }
  };

  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5>
                {amount} {base} is equivelent to
              </h5>
              <p>As of {date}</p>
              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10">
                  <form className="form-inline mb-4">
                    <input
                      className="form-control form-control-lg mx-3"
                      value={amount}
                      type="number"
                      onChange={this.handleInput}
                    />
                    <select
                      className="form-control form-control-lg"
                      name="base"
                      value={base}
                      onChange={this.handleSelect}
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      className="form-control form-control-lg mx-3"
                      disabled={true}
                      value={result === null ? "Calculating..." : result}
                    />
                    <select
                      className="form-control form-control-lg"
                      name="convertTo"
                      value={convertTo}
                      onChange={this.handleSelect}
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap">
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
