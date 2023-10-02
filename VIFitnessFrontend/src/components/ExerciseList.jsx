import React, { useState } from 'react';


export default function ExerciseList(props) {
  // const [isChecked, setIsChecked] = useState(false);
  // const [exercisesToAddToCalendar, setExercisesToAddToCalendar] = useState([]);

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);

  //   // Update the list of exercisesToAddToCalendar based on the checkbox status
  //   if (!isChecked) {
  //     // Add the exercise name to the list when checked
  //     setExercisesToAddToCalendar([...exercisesToAddToCalendar, props.name]);
  //   } else {
  //     // Remove the exercise name from the list when unchecked
  //     setExercisesToAddToCalendar(
  //       exercisesToAddToCalendar.filter((exercise) => exercise !== props.name)
  //     );
  //   }
  // };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          // checked={isChecked}
          // onChange={handleCheckboxChange}
        />
        <span>
          Exercise name: {props.name}, Difficulty: {props.difficulty}
        </span>
      </label>
    </div>
  );
}