import logo from './logo.svg';
import './App.css';
import useNewsService from './hooks/useNewsService';

function App() {

  const { data } = useNewsService();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{data.status}</p>
    </div>
  );
}

export default App;
