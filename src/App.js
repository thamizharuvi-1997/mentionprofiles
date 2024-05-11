import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SampleImage from "./logo.svg";

function App() {
  const [inputText, setInputText] = useState('');
  const [posts, setPosts] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const suggestionRef = useRef();

  const names = [
    'Aadhi', 'Aadhira', 'Aadi', 'Aarav', 'Aaradhya', 'Aarohi', 'Aarti', 'Aaryan', 'Aasha', 'Abhinav',
    'Barani', 'Bhagya', 'Bhavana', 'Bhuvan', 'Bhuvana', 'Brijesh', 'Bala', 'Balamani', 'Banu', 'Bindu',
    'Chaitanya', 'Chandan', 'Chandni', 'Chandra', 'Charan', 'Charulata', 'Chetan', 'Chhaya', 'Chinmay', 'Chitra',
    'Darshan', 'Deepak', 'Deepika', 'Dev', 'Dhruv', 'Diya', 'Divakar', 'Divya', 'Durga', 'Dinesh',
    'Ekta', 'Esha', 'Eshwar', 'Ekadanta', 'Elango', 'Elakkiya', 'Ezhil', 'Eshwaran', 'Ezhilarasi', 'Eshwaran',
    'Farhan', 'Faiyaz', 'Faiz', 'Faiza', 'Farhana', 'Fatima', 'Fathima', 'Firdous', 'Fiza', 'Firoz',
    'Ganesh', 'Gayatri', 'Geeta', 'Gopal', 'Gaurav', 'Ganga', 'Gokul', 'Gowri', 'Guru', 'Gitanjali',
    'Harish', 'Hema', 'Hari', 'Himani', 'Hemant', 'Harini', 'Harsh', 'Harsha', 'Harshad', 'Hema',
    'Ishan', 'Ishani', 'Indra', 'Isha', 'Ila', 'Indrajit', 'Indrani', 'Inder', 'Ishita', 'Irfan',
    'Jagdish', 'Jasbir', 'Jasleen', 'Jatin', 'Jeevan', 'Jayant', 'Jaya', 'Jyoti', 'Jaidev', 'Jyotsna',
    'Karthik', 'Kavita', 'Kunal', 'Komal', 'Kiran', 'Kamal', 'Kavya', 'Krishna', 'Kishore', 'Karthiga',
    'Lakshmi', 'Lalita', 'Laxman', 'Lavanya', 'Leela', 'Lokesh', 'Latha', 'Laxmi', 'Luv', 'Laxmikant',
    'Mohan', 'Meera', 'Manoj', 'Maya', 'Madhavi', 'Mahesh', 'Manisha', 'Manjunath', 'Mukesh', 'Madhu',
    'Naveen', 'Namita', 'Nikhil', 'Neelam', 'Neha', 'Nirav', 'Nandini', 'Narendra', 'Naveena', 'Nisha',
    'Om', 'Omkar', 'Omprakash', 'Ojas', 'Oviya', 'Oormila', 'Oorvazi', 'Oormila', 'Omkara', 'Oviyan'
  ];
  

  useEffect(() => {
    if (showSuggestions && inputText.includes('@')) {
      const searchTerm = inputText.substring(inputText.lastIndexOf('@') + 1);
      const filtered = names.filter(name => name.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredNames(filtered);
    }
  }, [inputText, showSuggestions]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setShowSuggestions(event.target.value.includes('@'));
  };

  const handleNameClick = (name) => {
    setInputText(inputText.replace(/@[\w]+/g, `${name}`));
    setShowSuggestions(false);
    setSelectedName(name);
  };

  const handlePostSubmitHandler = () => {
    if (inputText.trim() !== '') {
      let mentionedText = inputText;

      // Replace names in inputText with profile mentions
      names.forEach(name => {
        const mentionRegex = new RegExp(`\\b${name}\\b`, 'gi');
        mentionedText = mentionedText.replace(mentionRegex, `<a href="">${name}</a>`);
      });

      setPosts(prevPosts => [...prevPosts, mentionedText]);
      setInputText('');
    }
  };

  const handleKeyPressHandler = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const currentIndex = filteredNames.indexOf(selectedName);
      let nextIndex;
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex === filteredNames.length - 1 ? 0 : currentIndex + 1;
      } else {
        nextIndex = currentIndex === 0 ? filteredNames.length - 1 : currentIndex - 1;
      }
      setSelectedName(filteredNames[nextIndex]);
    }
  };

  useEffect(() => {
    if (showSuggestions && suggestionRef.current) {
      suggestionRef.current.scrollTop = suggestionRef.current.scrollHeight;
    }
  }, [selectedName, showSuggestions]);

  return (
    <div>
      <p><b>Notes : </b>  <i>In this task, I have worked with post and comment based with profile mentions without using any npm packages, also Initially a post button is be disabled, for just the kind of validation. Once,submit. It will listed below with link type of names ,where we mention the profile  </i></p>
      <h2>React</h2>
      <img style={{ width:"100px", height:"100px" }} src={SampleImage} alt='Sample Image' title="image" />
      <div className="input-wrapper">
        <textarea
          rows="4"
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPressHandler}
          placeholder="Type your command here..."
        ></textarea>

        {showSuggestions && ( 
          <div className="suggestions" ref={suggestionRef}>
            <h3>Comment:</h3>
            <ul>
              {filteredNames.map((name, index) => (
                <li 
                  key={index} 
                  onClick={() => handleNameClick(name)}
                  className={selectedName === name ? 'selected' : ''} 
                >
                     <div className="profile-image">{name.charAt(0)}</div>  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    {inputText &&  <button onClick={handlePostSubmitHandler} style={{ background:"violet", color:"#fff" }} >Post</button> }

      <div>

        {posts.length > 0 && (
          <div>
            <h3>Posts:</h3>
            <ul>
              {posts.map((post, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: post }}></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
