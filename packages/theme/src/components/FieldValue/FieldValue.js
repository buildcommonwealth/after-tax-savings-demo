import React from "react";
import PropTypes from "prop-types";
import { Box } from "theme-ui";

import { useLiveFormValues } from "context/wizard";

const propTypes = {
  children: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  field: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        field: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ])
  ),
};

const FieldValue = ({ children, defaultValue, label, field, fields = [] }) => {
  const { names, defaults } = React.useMemo(() => {
    if (field) {
      return { names: [field], defaults: [defaultValue] };
    }

    return fields.reduce((obj, item) => {
      obj.names = [...(obj.names || []), item.field || item];
      obj.defaults = [...(obj.defaults || []), item.defaultValue];
      return obj;
    }, {});
  }, [field, defaultValue, fields]);

  const values = useLiveFormValues(names, defaults);
  let value;

  if (Array.isArray(values)) {
    value = values.length < 2 ? values[0] : values;
  } else {
    value = [];
    for (let key of fields) {
      value.push(values[key.field || key]);
    }
  }

  if (children) {
    return <Box>{children(value)}</Box>;
  }

  return (
    <Box>
      <div>{label}</div>
      <div>{value}</div>
    </Box>
  );
};

FieldValue.propTypes = propTypes;

export default FieldValue;
