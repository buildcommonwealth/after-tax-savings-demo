function isClientSide() {
  return typeof window !== "undefined";
}

function clearStorage(key) {
  if (isClientSide()) {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  }
}

function getStorage(key) {
  const str = isClientSide() && window.sessionStorage.getItem(key);
  if (str) {
    try {
      const data = JSON.parse(str);
      return data;
    } catch (error) {
      console.warn("Couldn't retrieve form values from window.localStorage");
    }
  }
}

function setStorage(key, data) {
  if (!isClientSide()) {
    return;
  }

  try {
    let str = data;
    if (typeof data === "object") {
      str = JSON.stringify(data);
    }

    window.sessionStorage.setItem(key, str);
  } catch (error) {
    console.warn("Couldn't save form values to window.localStorage");
  }
}

function getLocalStorage(key) {
  const str = isClientSide() && window.localStorage.getItem(key);
  if (str) {
    try {
      const data = JSON.parse(str);
      return data;
    } catch (error) {
      console.warn("Couldn't retrieve form values from window.localStorage");
    }
    return str;
  }
}

function setLocalStorage(key, data) {
  if (!isClientSide()) {
    return;
  }

  try {
    let str = data;
    if (typeof data === "object") {
      str = JSON.stringify(data);
    }

    window.localStorage.setItem(key, str);
  } catch (error) {
    console.warn("Couldn't save form values to window.localStorage");
  }
}

export {
  clearStorage,
  getStorage,
  setStorage,
  getLocalStorage,
  setLocalStorage,
};
