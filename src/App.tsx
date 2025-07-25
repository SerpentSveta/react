import './App.css';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { About } from './components/About/About';
import { Routes, Route } from 'react-router';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
