import './App.css';
import { Header } from './components/Header/Header';

import { Spinner } from './components/Spinner/Spinner';
import { lazy, Suspense } from 'react';
const DataTable = lazy(() => import('./components/DataTable/DataTable'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <DataTable />
      </Suspense>
    </>
  );
}

export default App;
