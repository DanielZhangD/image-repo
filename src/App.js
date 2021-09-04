import './App.css';
import Images from './components/images/images';
import Transactions from './components/transactions/transactions'

function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        <Images/>
        <Transactions/>
      </header>
    </div>
  );
}

export default App;
