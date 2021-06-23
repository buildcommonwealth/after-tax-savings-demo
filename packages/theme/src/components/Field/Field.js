import React from "react";
import { Label, Text } from "theme-ui";
import { useField } from "@zendeskgarden/container-field";

import { styled } from "style";
import { useFormField, useFormValidationRules } from "context/wizard";
import autocomplete from "utils/autocomplete";

import Checkbox from "components/Checkbox";
import NameInput from "components/NameInput";
import NumberInput from "components/NumberInput";
import RadioInput from "components/RadioInput";
import RangeInput from "components/RangeInput";
import Select from "components/Select";
import Textarea from "components/Textarea";
import Tiles from "components/Tiles";
import Input from "components/Input";

const StyledField = styled('div')({
  display: "flex",
  flexFlow: "column nowrap",
  mt: 0,
  mb: 4,
  '&[data-width="half"]': {
    width: "calc(50% - 8px)",
  },
  "fieldset &": {
    my: 0,
  },
})

function getControlComponent(type) {
  switch (type) {
    case "checkbox": {
      return Checkbox;
    }
    case "name": {
      return NameInput;
    }
    case "number": {
      return NumberInput;
    }
    case "radio": {
      return RadioInput;
    }
    case "range":
    case "slider": {
      return RangeInput;
    }
    case "select": {
      return Select;
    }
    case "textarea": {
      return Textarea;
    }
    case "tiles": {
      return Tiles;
    }
    default: {
      return Input;
    }
  }
}

const defaultProps = {
  defaultValue: null,
  disabled: false,
  hint: null,
  ignore: false,
  placeholder: null,
  required: false,
  type: "text",
};

const Field = ({
  className,
  hint,
  label,
  name,
  required,
  rules,
  type,
  defaultValue,
  placeholder,
  ignore,
  width,
  sx,
  ...props
}) => {
  const { getLabelProps, getInputProps, getHintProps } = useField(name);
  const getValidationRules = useFormValidationRules();
  const { error, fieldProps, ref, unregister } = useFormField({
    defaultValue: defaultValue || "",
    rules: getValidationRules({ required, rules }),
    name,
  });

  React.useEffect(() => {
    if (ignore) {
      unregister(name);
    }
  }, [ignore, name, unregister]);

  const ControlComponent = getControlComponent(type);

  if (type === "hidden") {
    return <input type={type} ref={ref} name={name} {...fieldProps} />;
  }

  return (
    <StyledField
      className={className}
      data-required-field={required}
      data-width={width || undefined}
      sx={sx}
    >
      {label && (
        <Label
          children={label}
          data-invalid={error ? true : undefined}
          {...getLabelProps()}
        />
      )}
      {hint && (
        <Text
          as="span"
          children={hint}
          variant="forms.hint"
          {...getHintProps()}
        />
      )}
      <ControlComponent
        autoComplete={autocomplete(name)}
        data-invalid={error ? true : undefined}
        name={name}
        placeholder={placeholder}
        type={type}
        {...fieldProps}
        {...getInputProps({}, { isDescribed: !!hint })}
        {...props}
      />
      {error && (
        <Text
          as="span"
          children={error.message || "Please fill out the field above"}
          variant="forms.error"
        />
      )}
    </StyledField>
  );
};

Field.defaultProps = defaultProps;

export default Field;
