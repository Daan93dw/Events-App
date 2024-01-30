export const styles = {
  event_page: {
    body: {
      bg: "blackAlpha.100",
      borderX: "#dddddd05 2px solid",
    },
    image: {
      w: "100%",
      h: "30vh",
      objectFit: "cover",
    },
    date_time_section: {
      flexDir: { base: "column", md: "row" },
      justifyContent: "space-between",
      bg: "blackAlpha.300",
      px: "8",
      py: "2",
      fontSize: { base: "16", sm: "18", md: "20" },
      fontWeight: "semibold",
      borderTop: "#ED8936 solid 2px",
    },
    content_section: {
      px: { base: "8", md: "16" },
      minH: "35vh",
      flexDir: "column",
      justifyContent: "space-evenly",
    },
    footer_section: {
      // flexDir: { base: "column", md: "row" },
      // justifyContent: "space-around",
      gap: "4",
      bg: "blackAlpha.300",
      p: "4",
      borderRadius: "2px",
      borderBottom: "#ED8936 solid 2px",
    },
    user_image: {
      h: { base: "50px", md: "70px" },
      w: { base: "50px", md: "70px" },
      borderRadius: "full",
      m: "6",
    },
  },
  new_event_page: {},
  event_card: {
    bg: {
      mb: "50px",
      boxShadow: "2px 2px 5px #00000050",
    },
    main: {
      w: "100%",
      bg: "blackAlpha.600",
      color: "white",
      backdropFilter: "auto",
      backdropBlur: "md",
      _hover: {
        bg: "blackAlpha.300",
        backdropBlur: "sm",
      },
      transition: "1000ms",
    },
    img: {
      w: "100%",
      h: { base: "380px", md: "320px", lg: "270px" },
      objectFit: "cover",
    },
    side: {
      flexDir: "column",
      w: { base: "100%", lg: "50%" },
    },
  },
  category_tags: {
    m: "2",
    ml: "0",
    borderRadius: "2px",
    bg: "#ED8936",
    color: "white",
    fontWeight: "semibold",
  },
  text_input: {
    p: "2",
    px: "6",
    borderRadius: "2px",
    variant: "unstyled",
    transition: "500ms",
    _focus: {
      outlineColor: "#ED8936",
    },
  },
  current_state: {
    minH: "20vh",
    bg: "blackAlpha.200",
    border: "1px #dddddd10 solid",
    borderRadius: "2px",
  },
  h1: {
    as: "h1",
    size: { base: "xl", md: "2xl", lg: "3xl" },
    textTransform: "uppercase",
    my: "4",
  },
  btn_light: {
    color: "#eee",
    fontSize: { base: "14px", md: "16px", lg: "18px" },
    borderRadius: "2px",
    px: "6",
    transition: "300ms",
    border: "0px solid white",
    bg: "#ED8936",
    _hover: {
      bg: "#F6AD55",
    },
  },
  btn_dark: {
    color: "#eee",
    fontSize: { base: "14px", md: "16px", lg: "18px" },
    borderRadius: "2px",
    px: "6",
    transition: "300ms",
    border: "2px solid #aaa",
    bg: "whiteAlpha.300",
    _hover: {
      bg: "whiteAlpha.100",
      outline: "1px solid #F6AD55",
    },
  },
  filter_btn: {
    bg: "none;",
    _hover: {
      bg: "none",
      color: "gray",
    },
  },
};
