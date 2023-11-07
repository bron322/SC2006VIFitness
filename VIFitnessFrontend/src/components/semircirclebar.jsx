import React from "react";
import { useState, useEffect } from "react";
import "./styles/circlebar.css";
import { tokens } from "@/routes/theme";
import { useTheme } from "@mui/material";
import chroma from "chroma-js";
import { useAuth } from "@/hooks/AuthProvider";
import { useRef } from "react";

function Semircirclebar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formattedData, setFormattedData] = useState({
    t_calorie: 0,
    t_protein: 0,
    t_carb: 0,
    t_fat: 0,
  });
  const { user } = useAuth();
  const initialised = useRef(false);

  // round to 2 dp
  const RoundTo2dp = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  // Bar value animation
  const animateBar = (selector, t_nutrition, dataTotal) => {
    const progressBar = document.querySelector(selector);
    const bar = progressBar.querySelector(".bar");

    const perc =
      Math.floor((parseFloat(t_nutrition) / dataTotal) * 100) < 1
        ? 1
        : Math.floor((parseFloat(t_nutrition) / dataTotal) * 100);
    let f = chroma.scale(["E95793", "610C9F"]);

    let currentPercent = 0;

    const interval = setInterval(() => {
      if (currentPercent >= perc || currentPercent >= 100) {
        clearInterval(interval);
      } else {
        currentPercent++;
        bar.style.transform = `rotate(${45 + currentPercent * 1.8}deg)`;
        bar.style.borderBottomColor = f(currentPercent / 100).toString();
        bar.style.borderRightColor = f(currentPercent / 100).toString();
      }
    }, 30);
  };

  // set data
  const setData = async () => {
    setFormattedData({
      t_calorie: RoundTo2dp(
        props.data.reduce((a, cur) => a + cur.nf_calories, 0)
      ),
      t_protein: RoundTo2dp(
        props.data.reduce((a, cur) => a + cur.nf_protein, 0)
      ),
      t_carb: RoundTo2dp(
        props.data.reduce((a, cur) => a + cur.nf_total_carbohydrate, 0)
      ),
      t_fat: RoundTo2dp(props.data.reduce((a, cur) => a + cur.nf_total_fat, 0)),
    });
  };

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;
      console.log(props);

      setData();
      animateBar(".cal-progress", props.t_calorie, user.macros_setting.calorie);
      animateBar(
        ".protein-progress",
        props.t_protein,
        user.macros_setting.protein
      );
      animateBar(
        ".carb-progress",
        props.t_carb,
        user.macros_setting.carbohydrate
      );
      animateBar(".fat-progress", props.t_fat, user.macros_setting.fat);
    }
  }, []);

  return (
    <>
      <div className="progress cal-progress flex flex-col justify-center items-center p-5">
        <div className="barOverflow">
          <div className="bar"></div>
        </div>
        <span style={{ color: colors.primary.text }}>
          {formattedData.t_calorie}
        </span>
        <span style={{ color: colors.primary.text }}>Cal</span>
        <p className="p-2 text-sm" style={{ color: colors.accent.foreground }}>
          Total Calories
        </p>
      </div>

      <div className="progress protein-progress flex flex-col justify-center items-center p-5">
        <div className="barOverflow">
          <div className="bar"></div>
        </div>
        <span style={{ color: colors.primary.text }}>
          {formattedData.t_protein}
        </span>
        <span style={{ color: colors.primary.text }}>g</span>
        <p className="p-2 text-sm" style={{ color: colors.accent.foreground }}>
          Total Proteins
        </p>
      </div>

      <div className="progress carb-progress flex flex-col justify-center items-center p-5">
        <div className="barOverflow">
          <div className="bar"></div>
        </div>
        <span style={{ color: colors.primary.text }}>
          {formattedData.t_carb}
        </span>
        <span style={{ color: colors.primary.text }}>g</span>
        <p className="p-2 text-sm" style={{ color: colors.accent.foreground }}>
          Total Carbs
        </p>
      </div>

      <div className="progress fat-progress flex flex-col justify-center items-center p-5">
        <div className="barOverflow">
          <div className="bar"></div>
        </div>
        <span style={{ color: colors.primary.text }}>
          {formattedData.t_fat}
        </span>
        <span style={{ color: colors.primary.text }}>g</span>
        <p className="p-2 text-sm" style={{ color: colors.accent.foreground }}>
          Total Fats
        </p>
      </div>
    </>
  );
}

export default Semircirclebar;
