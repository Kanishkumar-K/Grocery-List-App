// components/Sidebar.js
import React, { useState } from 'react';
import './styles.css';

function DragDropBox({ onDragOver, onDrop, language }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData('text/plain');
    onDrop(draggedItem);
  };

  return (
    <div className="drag-drop-box" onDragOver={onDragOver} onDrop={handleDrop}>
      <p>{language === 'tamil' ? 'கொடுக்கவும் வணக்கம்' : 'Drag and drop groceries here'}</p>
    </div>
  );
}

function Sidebar({ suggestedItems, onDrop, onItemAdded, language }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData('text/plain', item);
    setSelectedItem(item); // Set the selected item for styling purposes
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (draggedItem) => {
    // Check if the dragged item is in the suggestedItems list
    if (suggestedItems.includes(draggedItem)) {
      // Notify the parent component (AddItem) about the added item
      onItemAdded(draggedItem);
    }
  };

  return (
    <div className="sidebar">
      <h3>{language === 'tamil' ? 'பரிந்துரைக்கப்படுகின்ற பொருட்கள்' : 'Suggested Items'}</h3><br /><br />
      <div className="suggested-items-container">
        {suggestedItems.map((item, index) => (
          <div
            key={index}
            className={`suggested-item ${selectedItem === item ? 'selected' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item}
            <span className="drag-indicator">{language === 'tamil' ? 'என்னை இழுக்கவும்' : 'Drag me'}</span>
          </div>
        ))}
      </div>
      <DragDropBox onDragOver={handleDragOver} onDrop={handleDrop} language={language} />
    </div>
  );
}

export default Sidebar;
