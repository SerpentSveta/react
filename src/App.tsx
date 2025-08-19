import './App.css';
import { Button } from './components/Button/Button';

function App() {
  return (
    <>
      <header className="header">
        <Button>Uncontrolled Form</Button>
        <Button>Controlled Form</Button>
      </header>
    </>
  );
}

export default App;
