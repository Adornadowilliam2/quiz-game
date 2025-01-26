import React, { useState, useEffect } from "react";

const App = () => {
  const [quizData, setQuizData] = useState({});
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [inputUID, setInputUID] = useState("");

  // Load quiz data from localStorage
  useEffect(() => {
    const savedQuizData = JSON.parse(localStorage.getItem("quizData")) || {
      "0001565834": {
        category: "Math",
        questions: [
          { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
          {
            question: "What is 10 ÷ 2?",
            options: ["2", "5", "10"],
            answer: "5",
          },
        ],
      },
      "0001566013": {
        category: "Science",
        questions: [
          {
            question: "What is H2O?",
            options: ["Water", "Oxygen", "Hydrogen"],
            answer: "Water",
          },
          {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe"],
            answer: "Au",
          },
        ],
      },
      "0001566794": {
        category: "History",
        questions: [
          {
            question: "Who was the first president of the USA?",
            options: [
              "George Washington",
              "Thomas Jefferson",
              "Abraham Lincoln",
            ],
            answer: "George Washington",
          },
          {
            question: "When did World War II end?",
            options: ["1945", "1939", "1950"],
            answer: "1945",
          },
        ],
      },
      "00001548475": {
        category: "Geography",
        questions: [
          {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin"],
            answer: "Paris",
          },
          {
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "Japan", "South Korea"],
            answer: "Japan",
          },
        ],
      },
      "0001546717": {
        category: "Literature",
        questions: [
          {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Charles Dickens", "Mark Twain"],
            answer: "William Shakespeare",
          },
          {
            question: "What is the sequel to 'The Hunger Games'?",
            options: [
              "Catching Fire",
              "Mockingjay",
              "The Ballad of Songbirds and Snakes",
            ],
            answer: "Catching Fire",
          },
        ],
      },
      "0001548069": {
        category: "Technology",
        questions: [
          {
            question: "What does 'HTML' stand for?",
            options: [
              "HyperText Markup Language",
              "High-Level Machine Language",
              "Hyperlink and Text Management Language",
            ],
            answer: "HyperText Markup Language",
          },
          {
            question:
              "Which company developed the Python programming language?",
            options: ["Google", "Microsoft", "Python Software Foundation"],
            answer: "Python Software Foundation",
          },
        ],
      },
      "0001602846": {
        category: "Sports",
        questions: [
          {
            question: "Which country won the FIFA World Cup in 2022?",
            options: ["Argentina", "France", "Brazil"],
            answer: "Argentina",
          },
          {
            question: "Who is known as the 'King of Clay' in tennis?",
            options: ["Rafael Nadal", "Roger Federer", "Novak Djokovic"],
            answer: "Rafael Nadal",
          },
        ],
      },
      "0001602987": {
        category: "Music",
        questions: [
          {
            question: "Who is known as the 'King of Pop'?",
            options: ["Michael Jackson", "Elvis Presley", "Prince"],
            answer: "Michael Jackson",
          },
          {
            question: "Which band wrote the song 'Bohemian Rhapsody'?",
            options: ["The Beatles", "Queen", "Led Zeppelin"],
            answer: "Queen",
          },
        ],
      },
      "0001603381": {
        category: "Movies",
        questions: [
          {
            question: "Who directed the movie 'Inception'?",
            options: [
              "Christopher Nolan",
              "Steven Spielberg",
              "Quentin Tarantino",
            ],
            answer: "Christopher Nolan",
          },
          {
            question: "Which movie features the character 'Tony Stark'?",
            options: ["Iron Man", "Captain America", "Thor"],
            answer: "Iron Man",
          },
        ],
      },
      "0001548272": {
        category: "General Knowledge",
        questions: [
          {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Jupiter", "Saturn"],
            answer: "Jupiter",
          },
          {
            question: "What is the smallest prime number?",
            options: ["1", "2", "3"],
            answer: "2",
          },
        ],
      },
    };
    setQuizData(savedQuizData);
    localStorage.setItem("quizData", JSON.stringify(savedQuizData));
  }, []);

  // Handle RFID card scan input
  const handleCardScan = (uid) => {
    const categoryData = quizData[uid];
    if (categoryData) {
      setCurrentCategory(categoryData);
      setCurrentQuestionIndex(0);
      setScore(0);
      setSelectedAnswer("");
      setInputUID(""); // Clear input after scanning
    } else {
      alert("Invalid card! Please scan a valid quiz card.");
    }
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentCategory.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(
        `Quiz over! Your score: ${score}/${currentCategory.questions.length}`
      );
      setCurrentCategory(null);
    }
  };

  return (
    <div>
      <h1>Quiz Game</h1>
      {!currentCategory ? (
        <div>
          <p>Enter the RFID UID to start the quiz!</p>
          <input
            type="text"
            placeholder="Scan RFID card (e.g., 0001565834)"
            value={inputUID}
            onChange={(e) => setInputUID(e.target.value)}
          />
          <button onClick={() => handleCardScan(inputUID)}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{currentCategory.category}</h2>
          <p>{currentCategory.questions[currentQuestionIndex].question}</p>
          {currentCategory.questions[currentQuestionIndex].options.map(
            (option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
