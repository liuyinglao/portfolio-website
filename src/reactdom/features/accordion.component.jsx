import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the visibility of the accordion content
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
      <div 
        onClick={toggleAccordion}
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
      >
        {title}
      </div>
      {isOpen && <div style={{ marginTop: '10px' }}>{content}</div>}
    </div>
  );
};

const Accordion = () => {
  const items = [
    { title: 'Section 1', content: 'This is the content of Section 1.' },
    { title: 'Section 2', content: 'This is the content of Section 2.' },
    { title: 'Section 3', content: 'This is the content of Section 3.' },
  ];

  return (
    <div style={{ width: '300px', border: '1px solid #ddd', borderRadius: '4px' }}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
