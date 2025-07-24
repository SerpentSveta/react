import './App.css';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { About } from './components/About/About';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
