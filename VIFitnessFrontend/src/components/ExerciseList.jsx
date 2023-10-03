import React, { useState } from 'react';

export default function ExerciseList(props) {
  return (
    <div>
      <label>
        <input
          type="checkbox"   
          onChange={props.onChange}
        />
        <span>
          Exercise name: {props.name}, Difficulty: {props.difficulty}
        </span>
      </label>
    </div>
  );
}