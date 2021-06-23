function isEmptyObject(obj) {
  if (typeof obj !== "object" || obj.constructor !== Object) {
    return false;
  }

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return true;
}

// Taken from https://github.com/sindresorhus/is-plain-obj
function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

// Truthy/falsy test that returns true for 0 and false for '  '
// Useful to test the existence of form control values as 0 can be a valid
// value and whitespace cannot (right?)
function isSet(value) {
  if (typeof value === "string" && value.trim() === "") {
    return false;
  }

  if (!isNaN(Number(value))) {
    return true;
  }

  return !!value;
}

function trailingSlash(str, add = true) {
  if (typeof str !== "string") {
    return str;
  }

  if (add) {
    return str.endsWith("/") ? str : str + "/";
  }

  return str.endsWith("/") ? str.slice(0, -1) : str;
}

function leadingSlash(str, add = true) {
  if (typeof str !== "string") {
    return str;
  }

  if (add) {
    return str.startsWith("/") ? str : "/" + str;
  }

  return str.startsWith("/") ? str.slice(1) : "/" + str;
}

function bracketSlashes(str) {
  return trailingSlash(leadingSlash(str));
}

function removeSlashes(str) {
  return trailingSlash(leadingSlash(str, false), false);
}

function isClientSide() {
  return typeof window !== "undefined";
}

function upperFirst(str) {
  if (typeof str !== "string") {
    console.warn(`upperFirst() expects a string; recieved "${typeof str}".`);
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  isClientSide,
  isEmptyObject,
  isPlainObject,
  isSet,
  bracketSlashes,
  removeSlashes,
  leadingSlash,
  trailingSlash,
  upperFirst,
};
