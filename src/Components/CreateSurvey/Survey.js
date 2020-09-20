import React, { useState, Fragment } from "react";

const Survey = (props) => {
  const [surveyType, setSurveyType] = useState("defaultValue");
  const [options, setOptions] = useState([{ value: "Vivekanand", id: Date.now() }]);
  const [question, setQuestion] = useState("");
  const handleInputChange = (text, id) => {
    const optionsCopy = [...options];
    const updatedOption = optionsCopy.map((option) => {
      if (option.id === id) {
        return { ...option, value: text };
      } else {
        return option;
      }
    });
    setOptions(updatedOption);
  };

  const handleAdd = () => {
    // const optionset = options
    // setOptions([...options,optionset]);
    if (surveyType === "single" && options.length === 2) return;
    setOptions([...options, { value: "", id: Date.now() }]);
  };
  const handleremove = (id) => {
    const updatedOption = options.filter((option) => option.id !== id);
    setOptions(updatedOption);
  };
  const handleAddQuestion = () => {};
  return (
    <Fragment>
      <div className="question-type-container">
        <select
          name="survey"
          value={surveyType}
          onChange={(evt) => {
            setSurveyType(evt.target.value);
            setOptions([{ value: "", id: Date.now() }]);
          }}
        >
          <option value="defaultValue">Select question type</option>
          <option value="multi">Multi-select</option>
          <option value="single">Single select</option>
        </select>
      </div>
      {surveyType !== "defaultValue" ? (
        <div className="survey-container">
          <input
            type="text"
            placeholder="Enter your question here"
            className="question-container"
            value={question}
            onChange={(evt) => {
              setQuestion(evt.target.value);
            }}
          />
          <p>Options</p>
          {options.map((option, index) => (
            <div key={index} className="answer-container">
              <input
                type="text"
                placeholder="Type answer here"
                value={option.value}
                onChange={(evt) => {
                  handleInputChange(evt.target.value, option.id);
                }}
              />
              <p onClick={handleAdd}>➕</p>
              <p
                onClick={() => {
                  handleremove(option.id);
                }}
              >
                ➖
              </p>
            </div>
          ))}

          {(surveyType === "multi" && options.length >= 4) ||
          (surveyType === "single" && options.length === 2) ? (
            <div className="button-container">
              <button className="button-add" onClick={handleAddQuestion}>
                Add a New Question
              </button>
              <button className="button-publish">Publish</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </Fragment>
  );
};

export default Survey;
