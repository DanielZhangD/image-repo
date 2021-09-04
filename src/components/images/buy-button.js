import React from 'react';

class BuyButton extends React.Component {

  inputElement = null;
    
  state = {
    amount: 0,
  };

  buyImage = e => {
    console.log(this.props.imageId);
    console.log(this.state.amount)
    e.preventDefault();
    
    fetch('http://localhost:5000/buy-image', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageId: this.props.imageId,
        amount: this.state.amount
      })
    }).then(window.location.reload());
  };

  handleAmountChange = e => {
    this.setState({
      amount: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        Amount
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handleAmountChange}
        />
        <br />
        <button onClick={this.buyImage}>Buy!</button>
      </form>
    );
  }
}

export default BuyButton;