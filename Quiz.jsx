import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const question = data[index];

  const checkAnswer = (e, selectedOption) => {
    if (selected) return;

    setSelected(true); // Lock after one click

    if (selectedOption === question.answer) {
      e.target.classList.add('correct');
      setScore(score + 1);
    } else {
      e.target.classList.add('wrong');

      // Highlight correct answer
      const options = document.querySelectorAll('li');
      options.forEach((li) => {
        if (li.innerText === question.answer) {
          li.classList.add('correct');
        }
      });
    }
  };

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelected(false);
      // Remove old styles
      document.querySelectorAll('li').forEach((li) =>
        li.classList.remove('correct', 'wrong')
      );
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(false);
    setShowResult(false);
    document.querySelectorAll('li').forEach((li) =>
      li.classList.remove('correct', 'wrong')
    );
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {showResult ? (
        <div className="result">
          <h2>Quiz Completed</h2>
          <p>Your Score: {score} / {data.length}</p>
          <button onClick={restartQuiz}>Restart</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            {question.options.map((opt, i) => (
              <li key={i} onClick={(e) => checkAnswer(e, opt)}>{opt}</li>
            ))}
          </ul>
          <button onClick={handleNext} disabled={!selected}>
            {index === data.length - 1 ? 'Finish' : 'Next'}
          </button>
          <div>{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;