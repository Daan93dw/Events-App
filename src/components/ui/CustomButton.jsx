import { Button, useColorModeValue } from "@chakra-ui/react";
import { styles } from "../styles/styles";

function CustomButton({ clickFn, children }) {
  const { btn_light, btn_dark } = styles;
  const btn_styles = useColorModeValue(btn_light, btn_dark);

  return (
    <Button onClick={clickFn} {...btn_styles}>
      {children}
    </Button>
  );
}

export default CustomButton;
