export const saveToLocal = (key, data) => {
  let saveData = JSON.stringify(data);
  global.localStorage.setItem(key, saveData);
};

export const getFromLocal = (key) => {
  let data = global.localStorage.getItem(key);
  let parseData = JSON.parse(data)
  return parseData;
};

export const removeFromLocal = (key) => global.localStorage.removeItem(key);
