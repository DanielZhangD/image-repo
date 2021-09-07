import React from "react";

class UploadImageForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        colour: '',
        price: 0,
        stock: 0,
        imageURL: ''
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      if (event.target.name == 'price' || event.target.name == 'stock') {
        if (event.target.value < 0) {
          event.target.value = 0;
        }
      }
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      })
    }
  
    handleSubmit(event) {
      event.preventDefault();

      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('name', this.state.name);
      data.append('description', this.state.description);
      data.append('colour', this.state.colour);
      data.append('stock', this.state.stock);
      data.append('price', this.state.price);

      fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((body) => {
          this.setState({ imageURL: `http://localhost:8000/${body.file}`});
        });
      });
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name = 'name' value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name = 'description' value={this.state.descrption} onChange={this.handleChange} />
          </label>
          <label>
            Colour:
            <input type="number" name = 'colour' value={this.state.colour} onChange={this.handleChange} />
          </label>
          <label>
            Price:
            <input type="number" name = 'price' value={this.state.price} onChange={this.handleChange} />
          </label>
          <label>
            Stock:
            <input type="text" name = 'stock' value={this.state.stock} onChange={this.handleChange} />
          </label>
          <label>
            Upload image
            <input type="file" ref={(ref) => {this.uploadInput = ref;}}  />
          </label>
          <img src = {this.state.imageURL} alt="img"/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}
