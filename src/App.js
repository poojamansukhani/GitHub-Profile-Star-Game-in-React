import './App.css';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Button from './components/Button';
import Theme from './components/Theme';
import GitHubPorfile from './components/GitHubProfile';
import StarMatch from './components/StarMatch';
import React from 'react';

function App() {
  return (
    <div className="App">
      <ShoppingList name="Mark" />
      <Button/>
      <Theme/>
      <GitHubPorfile/>
      <StarMatch/>
    </div>
  );
}

export default App;
