import { color, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [stats, setStats] = useState({
    uniqueWords: 0,
    charCount: 0,
    wordCount: 0,
    sentenceCount: 0,
  });

  const analyzeText = useCallback(() => {
    const words = text.trim().split(/\s+/);
    const uniqueWords = new Set(words).size;
    const charCount = text.length;
    const wordCount = words.length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

    setStats({
      uniqueWords,
      charCount,
      wordCount,
      sentenceCount,
    });
  }, [text]);

  useEffect(() => {
    analyzeText();
  }, [text, analyzeText]);

  const highlightedText = text.replace(
    new RegExp(searchString, 'gi'),
    match => `<mark style="background-color: #ffff00; color: #000000;">${match}</mark>`
  );

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'black',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    color:'balck',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'black',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '20px',
    color:'balck',
  };

  const statItemStyle = {
    backgroundColor: 'black',
    padding: '10px',
    color:'red',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const gradientTextStyle = {
    backgroundImage: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    backgroundSize: '300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={containerStyle}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ 
          ...gradientTextStyle,
          textAlign: 'center', 
          marginBottom: '20px', 
          fontSize: '2.5em',
          fontWeight: 'bold',
        }}
      >
        Text Analyzer
      </motion.h1>
      <motion.textarea
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.3 }}
        style={inputStyle}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        rows="5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}
      >
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search..."
          style={inputStyle}
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace..."
          style={inputStyle}
        />
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#0056b3' }}
        whileTap={{ scale: 0.95 }}
        style={buttonStyle}
      >
        Analyze
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={statsStyle}
      >
        {Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            style={statItemStyle}
          >
            <motion.strong
              style={{
                ...gradientTextStyle,
                backgroundSize: '200%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              {key}:
            </motion.strong>{' '}
            {value}
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: '20px' }}
      >
        <h3 style={{
          ...gradientTextStyle,
          backgroundSize: '200%',
          animation: 'gradient 5s ease infinite',
        }}>Highlighted Text:</h3>
        <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
      </motion.div>
    </motion.div>
  );
};

export default TextAnalyzer;