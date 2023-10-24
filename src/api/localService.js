export let userLocalStorage = {
  set: (userData) => {
    let dataJson = JSON.stringify(userData);
    localStorage.setItem("USER", dataJson);
  },
  get: () => {
    let dataJson = localStorage.getItem("USER");
    return JSON.parse(dataJson);
  },
  remove: () => {
    localStorage.removeItem("USER");
  },
};
