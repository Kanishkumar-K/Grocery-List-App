import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './styles.css';
import ShoppingListDialog from './ShoppingListDialog';

const CartoonCharacter = ({ onClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="cartoon-character-container">
      <div
        className={`cartoon-character ${showPopup ? 'active' : ''}`}
        onClick={() => {
          onClick();
          setShowPopup(false); // Close the popup on character click
        }}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        🤖
      </div>
      {showPopup && (
        <div className="popup">
          Click me to read the grocery list
        </div>
      )}
    </div>
  );
};

const ShoppingList = React.forwardRef(({ items, deleteItem, clearList }, ref) => {
  const synth = window.speechSynthesis;

  const removeDeleteIcons = (element) => {
    const deleteIcons = element.getElementsByClassName('delete-icon');
    while (deleteIcons.length > 0) {
      deleteIcons[0].parentNode.removeChild(deleteIcons[0]);
    }
  };

  const captureImage = () => {
    removeDeleteIcons(ref.current);

    html2canvas(ref.current).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'shopping_list.png';
      link.click();
    });
  };

  const handleCharacterClick = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `Here is your shopping list. ${items.map(item => `${item.name}, quantity: ${item.quantity}`).join(', ')}`;
    synth.speak(utterance);
  };

  return (
    <div className="right-panel">
      <br /><br />
      <table ref={ref}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <span className="delete-icon" onClick={() => deleteItem(item.id)}>
                  ❌
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div><br /><br />
        <button className="btn" onClick={clearList}>Clear List</button> &nbsp;&nbsp;</div>
      <div className="btn-group">
        <button className="btn" onClick={captureImage}>Export as Image</button>
      </div>

      <CartoonCharacter onClick={handleCharacterClick} />
    </div>
  );
});

export default ShoppingList;
