import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Image from './components/images/images';

function App() {
  const [getImage, setGetImage] = useState(0);
  /*
  useEffect(() => {
    fetch('/get-images', {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',}
    }).then(res => res.text()).then(text => console.log(text))
  }, []);*/
  useEffect(() => {
    fetch('/get-images', {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',}}).then(res => res.json()).then(data => {
      setGetImage(data);
    });
  }, []);

  console.log(getImage);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Image imageData = {getImage}/>

      </header>
    </div>
  );
}

export default App;
