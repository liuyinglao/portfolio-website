import { FC, useState, ChangeEvent, MouseEvent } from 'react';

const options: string[] = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Lemon',
  'Orange',
  'Peach',
  'Pineapple',
  'Strawberry',
];

const Autocomplete: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Handle changes in the input field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    // Filter options based on the input value
    if (value) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  // Handle selection from the dropdown list
  const handleOptionClick = (option: string): void => {
    setInputValue(option);
    setShowOptions(false);
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
        onFocus={() => inputValue && setShowOptions(true)}
        placeholder="Type to search..."
        style={{ width: '100%', padding: '8px' }}
      />
      {showOptions && filteredOptions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: 'white',
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            maxHeight: '150px',
            overflowY: 'auto',
            zIndex: 1,
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
              onMouseDown={(e: MouseEvent) => e.preventDefault()}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete; 