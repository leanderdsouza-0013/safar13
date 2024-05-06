import React, { useState } from "react";
import "./FAQs.css";


const FAQs = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "How do I book a bus ticket?",
      answer:
        "You can book a bus ticket by visiting our website and following the booking process.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept payments via credit/debit cards, PayPal, and bank transfers.",
    },
    {
      id: 3,
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking before the scheduled departure time. Please check our cancellation policy for more details.",
    },
    {
      id: 4,
      question: "Is there a discount for group bookings?",
      answer:
        "Yes, we offer discounts for group bookings. Please contact our customer support for more information.",
    },
  ]);

  const toggleAnswer = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, isOpen: !q.isOpen } : q))
    );
  };

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        question: "New question goes here",
        answer: "New answer goes here",
        isOpen: false,
      },
    ]);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {questions.map((q) => (
          <div className="faq-item" key={q.id}>
            <div className="faq-question" onClick={() => toggleAnswer(q.id)}>
              {q.question}
            </div>
            {q.isOpen && <div className="faq-answer">{q.answer}</div>}
          </div>
        ))}
      </div>
      <button className="add-question-btn" onClick={addQuestion}>
        Ask Question
      </button>
    </div>
  );
};

export default FAQs;
