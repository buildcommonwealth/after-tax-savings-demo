import React from "react";
import { Box } from "theme-ui";

import { Link } from "@commonwealth-savings-wizard/theme";

const Status404 = () => (
  <React.Fragment>
    <Box color="primary" variant="layout.container">
      <h1>
        <span>404</span>
        <br />
        <small>This route does not exist</small>
      </h1>
      <Link to="/">Click here to go back to the front page.</Link>
    </Box>
  </React.Fragment>
);

export default Status404;
