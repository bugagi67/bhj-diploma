/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  const formData = new FormData();

  if (options.method !== "GET") {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  } else if (options.method === "GET" && options.data) {
    options.url +=
      "?" +
      Object.entries(options.data)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
  }

  try {
    xhr.open(options.method, options.url);
    if (options.method === "GET") {
      xhr.send();
    } else {
      xhr.send(formData);
    }
  } catch (error) {
    options.callback(error);
  }

  xhr.addEventListener("load", () => {
    let response;
    let error;
    if (xhr.status !== 200) {
      error = xhr.statusText;
    } else {
      response = xhr.response;
    }
    options.callback(error, response);
  });
};
