import './App.css';

import { Spinner } from './components/Spinner/Spinner';
import { lazy, Suspense } from 'react';
const DataTable = lazy(() => import('./components/DataTable/DataTable'));

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <DataTable />
      </Suspense>
    </>
  );
}

export default App;
