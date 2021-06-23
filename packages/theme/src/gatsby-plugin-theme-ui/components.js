import React from "react";
import { Box, Flex, Grid, Heading, Text } from "theme-ui";

import {
  Button,
  CTA,
  Feature,
  Field,
  FieldValue,
  Icon,
  Image,
  Link,
  Message,
  Partial,
  Section,
} from "../components";

const components = {
  Box,
  Button,
  CTA,
  Feature,
  Field,
  FieldValue,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Message,
  Partial,
  Section,
  Text,
  span: props => <Text as="span" {...props} />,
};

export default components;
