import './App.css';
import { Header } from './components/Header/Header';
import { Search } from './components/Search/Search';
import { About } from './components/About/About';
import { Navigate, Routes, Route } from 'react-router';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/1" />} />
          <Route path="/:page" element={<Search />}>
            <Route path=":detailsId" element={<CharacterDetails />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
