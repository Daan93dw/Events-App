import { Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { styles } from "../styles/styles";

export default function CategoryButton({ text, filter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let { filter_btn } = styles;

  if (searchParams.get("filter") === filter) {
    filter_btn = { ...filter_btn, color: "orange" };
  }

  return (
    <Button
      {...filter_btn}
      onClick={() => {
        setSearchParams({ filter: filter });
      }}
    >
      {text}
    </Button>
  );
}
