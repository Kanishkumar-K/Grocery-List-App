// components/ShoppingListDialog.js
import React from 'react';
import './styles.css';

const ShoppingListDialog = ({ items, deleteItem, clearList, onClose }) => {
  return (
    <div className="shopping-list-dialog">
      <table>
        {/* ... (same table content as in ShoppingList.js) */}
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

      <div className="table-footer">
        <button className="btn" onClick={clearList}>Clear List</button>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShoppingListDialog;
