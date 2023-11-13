import { Affix, Stack } from "@mantine/core";
import { useCharacterAnimations } from "./contexts/CharacterAnimations";
import Button from "@mui/material/Button";

const Interface = () => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();
  return (
    <div
      style={{
        overflow: "hidden",
        transform: "translate(0%, -10%)",
      }}
    >
      <div>
        <Stack>
          {animations.map((animation, index) => (
            <Button
              key={animation}
              variant={index === animationIndex ? "filled" : "light"}
              onClick={() => setAnimationIndex(index)}
              style={{border: ""}}
            >
              {animation}
            </Button>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Interface;
