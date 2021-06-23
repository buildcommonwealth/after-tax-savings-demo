export const global = {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: '0px',
    borderColor: 'border',
  },
  'button, input, optgroup, select, textarea': {
    margin: 0,
    padding: 0,
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 'inherit',
    color: 'inherit',
  },
  'button, select': {
    textTransform: 'none',
  },
  "button, [type='button'], [type='reset'], [type='submit']": {
    WebkitAppearance: 'button',
  },
  "button:not(:disabled), [role='button']:not(:disabled)": {
    cursor: 'pointer',
  },
  button: {
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    textAlign: 'inherit',
  },
}