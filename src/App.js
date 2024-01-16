// App.js

import React, { useState, useRef } from 'react';
import ShoppingList from './components/ShoppingList';
import AddItem from './components/AddItem';
import './components/styles.css'; // Import the CSS file
import Header from './components/Header';

const App = () => {
  const [items, setItems] = useState([]);
  const [language, setLanguage] = useState('english');
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const shoppingListRef = useRef();

  // Function to clear the shopping list
  const clearList = () => {
    setItems([]);
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const addItem = (itemName, quantity) => {
    const newItem = {
      id: new Date().getTime(),
      name: itemName,
      quantity: quantity,
    };

    setItems([...items, newItem]);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const openDetailsDialog = () => {
    setIsDetailsDialogOpen(true);
  };

  const closeDetailsDialog = () => {
    setIsDetailsDialogOpen(false);
  };

  

  return (
    
    <div className="app">
      <h1 className="title">
        {language === 'tamil' ? 'பட்டியல் செயலி ' : 'List App'}
      </h1>

      <button className="view-details-button" onClick={openDetailsDialog}>
        {language === 'tamil' ? 'விவரங்கள்' : 'View Details'}
      </button>
      

   

      <div className="controls">
        <AddItem addItem={addItem} defaultLanguage={language} />
        <ShoppingList
          items={items}
          deleteItem={deleteItem}
          clearList={clearList}
          ref={shoppingListRef}
          defaultLanguage={language}
        />
        
      </div>
{/* Details Dialog */}
{isDetailsDialogOpen && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
    }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <button
        style={{
          background: '#ddd',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '12px',
        }}
        onClick={closeDetailsDialog}
      >
        {language === 'tamil' ? 'மூடு' : 'Close'}
      </button>
      <div>
        <h2>{language === 'tamil' ? 'விவரங்கள்' : 'Details'}</h2>
        <p>
          {language === 'tamil'
            ? 'இந்த செயலி உங்கள் ஷாப்பிங் அனுபவத்தை எளிதாகப் பராமரிக்குகின்றது. இது உங்கள் பொருட்களை அடையாளப்படுத்த, சேர்க்க, நீக்க, மற்றும் அந்தப் பொருள்களின் எண்ணிக்கையை உருவாக்கலாம்.'
            : 'This is a wishlist app that makes it easy and fair to see your grocery items.'}
        </p>
        <div
          style={{
            background: '#f9f9f9',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
          }}
        >
          <h3>{language === 'tamil' ? 'அம்சங்கள்' : 'Features'}</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>✨ {language === 'tamil' ? 'டிராக் மற்றும் ட்ராப்' : 'Drag and Drop'}</li>
            <li>✨ {language === 'tamil' ? 'குரல் உள்ளிடல்' : 'Voice Input'}</li>
            <li>✨ {language === 'tamil' ? 'படம் ஏற்றுமதி' : 'Image Export'}</li>
          </ul>
        </div>
        <img
          src="https://www.freshfarms.com/wp-content/uploads/2023/05/The-Ultimate-Guide-to-Meal-Planning-and-Grocery-Shopping-for-Busy-People-1.png"
          alt="Sample Image"
          style={{
            maxWidth: '100%',
            height: 'auto',
            marginTop: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default App;
