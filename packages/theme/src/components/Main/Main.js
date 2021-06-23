import { styled } from 'style';

const Main = styled('main')({
  position: "relative",
  flex: "1 0 100%",
  width: "full",
  pt: [0, null, 5],
  pb: 5,
  mx: "auto",
  maxWidth: "100%",
  "& > *": {
    px: 3,
  },
});

export default Main;
