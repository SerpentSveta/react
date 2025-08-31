import './App.css';
import { Header } from './components/Header/Header';

import { Spinner } from './components/Spinner/Spinner';
import { lazy, Suspense } from 'react';
const DataTable = lazy(() => import('./components/DataTable/DataTable'));

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Suspense
          fallback={
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          }
        >
          <DataTable />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
