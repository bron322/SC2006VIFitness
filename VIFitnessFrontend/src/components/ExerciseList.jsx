import React, { useState } from 'react';


export default function ExerciseList(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span>
          Exercise name: {props.name}, Difficulty: {props.difficulty}
        </span>
      </label>
    </div>
  );
}