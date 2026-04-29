const { httpGet } = require("./mock-http-interface");

const extractMessage = (body) => {
  const object = JSON.parse(body);
  return object?.message || "";
};

const fetchQuotes = async (url) => {
  const response = await httpGet(url);
  if (response.status === 200) {
    return { "Arnie Quote": extractMessage(response.body) };
  } else {
    return { FAILURE: extractMessage(response.body) };
  }
};

const getArnieQuotes = async (urls) => Promise.all(urls.map(fetchQuotes));

module.exports = {
  getArnieQuotes,
};
