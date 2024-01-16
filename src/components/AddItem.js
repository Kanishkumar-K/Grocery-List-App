import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import './styles.css';
import { useMediaQuery } from 'react-responsive';


function AddItem({ addItem, defaultLanguage }) {
  
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const recognition = useRef(null);
  const [inputLanguage, setInputLanguage] = useState(defaultLanguage);
  const [isListening, setIsListening] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [lastRecognizedSpeech, setLastRecognizedSpeech] = useState('');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [clapCount, setClapCount] = useState(0); // Add this line

  const predefinedGroceryItems = [
    'Bathing soap', 'Toothpaste', 'Hair oil', 'Red chili', 'Cumin seeds', 'Mustard seeds',
'Turmeric powder', 'Urad dal', 'Chana dal', 'Roasted peanuts', 'Peanut butter',
'Turmeric powder', 'Red chili powder'

  ];

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=YourTamilFont';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const handleClapDetection = (event) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphoneStream = event.stream;

      const microphoneSource = audioContext.createMediaStreamSource(microphoneStream);
      microphoneSource.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyser.getByteTimeDomainData(dataArray);

      let clapDetected = false;

      const threshold = 120;

      const detectClap = () => {
        const maxAmplitude = Math.max(...dataArray);
        if (maxAmplitude > threshold) {
          clapDetected = true;
        }
      };

      analyser.addEventListener('audioprocess', detectClap);

      const clapTimer = setInterval(() => {
        if (clapDetected) {
          setClapCount((prevCount) => prevCount + 1);
          clapDetected = false;
        }
      }, 500);

      return () => {
        clearInterval(clapTimer);
        analyser.removeEventListener('audioprocess', detectClap);
        audioContext.close();
      };
    };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleClapDetection)
      .catch((error) => console.error('Error accessing microphone:', error));

  }, []);

  useEffect(() => {
    if (clapCount >= 2) {
      toggleVoiceRecognition();
      setClapCount(0);
    }
  }, [clapCount]);

  const handleInputChange = (e) => {
    setItemName(e.target.value);
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      addItem(itemName, quantity);
      setItemName('');
      setQuantity('1');
    }
  };

  const toggleVoiceRecognition = () => {
    if (!isListening) {
      startVoiceRecognition();
      setIsMicrophoneOn(true);
    } else {
      stopVoiceRecognition();
      setIsMicrophoneOn(false);
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();

    recognition.current.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      console.log('Transcript:', transcript);

      const isTamil = containsTamil(transcript);
      setInputLanguage(isTamil ? 'ta' : 'en');

      setItemName(transcript);
    };

    recognition.current.onend = () => {
      setIsListening(false);
    };

    setIsListening(true);
    recognition.current.start();
  };

  const stopVoiceRecognition = () => {
    recognition.current.stop();
  };

  const containsTamil = (text) => {
    const tamilRegex = new RegExp('[அ-ஹ]');
    return tamilRegex.test(text);
  };

  const handleAddSuggestedItem = (item) => {
    setItemName(item);
    setSuggestedItems([]);
  };

  const addItemFromSidebar = (item) => {
    setItemName(item);
    setQuantity('1');
  };

  const clearList = () => {
    setItemName('');
    setQuantity('1');
  };

  const createNewList = () => {
    clearList();
    // Additional logic for creating a new list can be added here
  };

  const openNewListDialog = () => {
    setIsNewListDialogOpen(true);
  };

  const closeNewListDialog = () => {
    setIsNewListDialogOpen(false);
  };

  return (
    <div className="add-item">
      <div className="hamburger-icon" onClick={toggleSidePanel}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {isSidePanelOpen && (
        <div className="side-panel">
          <button onClick={closeSidePanel}>Close</button>
          <button onClick={openNewListDialog}>Create New List</button>
          <button>View All Saved Files</button>
        </div>
      )}

      <div className="main-content">
        <div className="add-item">
          <div className="input-container">
            <label htmlFor="itemName">
              {inputLanguage === 'ta' ? 'பொருட்கள்' : 'Item Name'}:
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                id="itemName"
                placeholder={
                  inputLanguage === 'ta'
                    ? 'பொருட்கள் உள்ளிடவும்'
                    : 'Enter item name'
                }
                value={itemName}
                onChange={handleInputChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={toggleVoiceRecognition}>
                {isMicrophoneOn ? (
                  <img
                    src="https://i.ibb.co/K9Tpk4T/mic.png"
                    alt="Stop"
                    className="icon"
                    style={{ width: '30px', height: '30px' }}
                  />
                ) : (
                  <img
                    src="https://i.ibb.co/Ldh7pq8/microphone.png"
                    alt="Start"
                    className="icon"
                    style={{ width: '30px', height: '30px' }}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="quantity">
              {inputLanguage === 'ta' ? 'அளவு' : 'Quantity'}:
            </label>
            <input
              type="text"
              id="quantity"
              placeholder={
                inputLanguage === 'ta'
                  ? 'அளவு உள்ளிடவும்'
                  : 'Enter quantity'
              }
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <button onClick={handleAddItem} className='btn5'>
            {inputLanguage === 'ta' ? 'சேர்க்க' : 'Add'}
          </button>

          <Sidebar
            suggestedItems={predefinedGroceryItems}
            onItemAdded={addItemFromSidebar}
          />
        </div>
      </div>

      {isNewListDialogOpen && (
        <div className="overlay">
          <div className="dialog-box">
            <h3>Create New List</h3>
            <p>Do you want to create a new list?</p>
            <div className="dialog-buttons">
              <button onClick={createNewList}>Create New List</button>
              <button onClick={closeNewListDialog}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddItem;
