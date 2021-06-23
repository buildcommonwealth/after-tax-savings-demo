import React from "react";
import { Grid } from "theme-ui";

import { styled } from 'style';
import { useSetFormValue, useLiveFormValues } from "context/wizard";

import Field from "components/Field";

const StyledGrid = styled(Grid)({
  gridTemplateColumns: [
    "minmax(0, 1fr)",
    "repeat(2, minmax(0, 1fr)"
  ],
})

function NameInput({ name, required, ...props }) {
  const formValue = useLiveFormValues(["given-name", "family-name"]);
  const setValue = useSetFormValue();

  React.useEffect(() => {
    if (formValue) {
      let givenName, familyName;
      if (Array.isArray(formValue)) {
        [givenName, familyName] = formValue;
      } else {
        givenName = formValue["given-name"];
        familyName = formValue["family-name"];
      }

      const value =
        familyName && givenName
          ? `${familyName}, ${givenName}`
          : familyName || givenName;

      setValue(name, value);
    }
  }, [formValue, setValue, name]);

  return (
    <StyledGrid {...props} >
      <Field
        label="First name"
        name="given-name"
        required={required}
        sx={{ my: 0 }}
      />
      <Field
        label="Last name"
        name="family-name"
        required={required}
        sx={{ my: 0 }}
      />
      <Field name={name} required={required} type="hidden" />
    </StyledGrid>
  );
}

export default NameInput;
