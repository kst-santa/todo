import './App.css';
import { DarkModeProvider } from './context/DarkModeContext';
import Main from './components/Main';

export default function App() {
  return (
    <DarkModeProvider>
      <Main />
    </DarkModeProvider>
  );
}
