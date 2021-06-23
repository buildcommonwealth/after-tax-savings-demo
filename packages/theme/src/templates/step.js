import React from "react";
import { Text } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { useSaveFormValues } from "context/wizard";

const StepTemplate = ({ data: { wizardStep } }) => {
  const saveFormData = useSaveFormValues();
  React.useEffect(() => {
    return () => saveFormData();
  }, [saveFormData]);

  return (
    <React.Fragment>
      <Helmet title={wizardStep.cta} />
      <Text variant="eyebrow">
        {wizardStep.index > 0 ? `Step ${wizardStep.index}` : wizardStep.cta}
      </Text>
      <MDXRenderer
        productName="CW Financial’s Emergency Fund"
        children={wizardStep.body}
      />
    </React.Fragment>
  );
};

export default StepTemplate;

export const query = graphql`
  query stepQuery($id: String) {
    wizardStep(id: { eq: $id }) {
      body
      cta
      index
    }
  }
`;
