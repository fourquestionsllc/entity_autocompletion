import React, { useState } from 'react';
import axios from 'axios';

export default function AutoComplete() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);

  // Function to fetch suggestions from the RESTful API
  const fetchSuggestions = async (query) => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/match_keywords', {
        query: query
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Extract the last word for auto-completion
    const lastWord = value.split(/\s+/).pop();
    fetchSuggestions(lastWord);
  };

  // Handle entity selection
  const handleSuggestionClick = (suggestion) => {
    // Append the selected entity to the list
    setSelectedEntities([...selectedEntities, suggestion]);
    
    // Update the input value with the selected entity and a trailing space
    const words = inputValue.split(/\s+/);
    words[words.length - 1] = suggestion.entity_name + ' ';
    setInputValue(words.join(' '));

    // Clear suggestions after selection
    setSuggestions([]);
  };

  return (
    <div className="autocomplete">
      <div className="input-container">
        {selectedEntities.map((entity, index) => (
          <span 
            key={index} 
            style={{
              backgroundColor: entity.entity_type === 'Skill' ? 'yellow' : 'green',
              padding: '0 5px',
              borderRadius: '3px',
              marginRight: '5px'
            }}
          >
            {entity.entity_name}
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer', padding: '5px' }}
            >
              {suggestion.entity_name} ({suggestion.entity_type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
