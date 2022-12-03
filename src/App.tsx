import logo from './logo.svg';
import './App.css';
import useNewsService from './hooks/useNewsService';
import News from './pages/News';

function App() {
  const data = useNewsService();
  console.log(data.loading);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Pedora, the ultimate personnal app</p>
      </header>
      <News />
    </div>
  );
}

export default App;
