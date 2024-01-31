import { Tag } from "@chakra-ui/react";
import { styles } from "../styles/styles";

export const CategoryTag = ({ text }) => {
  return <Tag {...styles.category_tags}>{text}</Tag>;
};
