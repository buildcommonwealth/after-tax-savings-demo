import React from "react";

import { styled } from 'style';

const StyledMessage = styled('div')({
  mb: 4,
  fontFamily: "heading",
  fontSize: 3,
  color: "success",
  overflow: "hidden",
  borderRadius: "md",
})

const Message = ({ children, ...props }) => {
  return (
    <StyledMessage {...props}>
      <div>{children}</div>
    </StyledMessage>
  );
};

export default Message;
