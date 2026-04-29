const { httpGet } = require("./mock-http-interface");

const extractMessage = (body) => {
  const object = JSON.parse(body);
  return object?.message || "";
};

const fetchQuotes = async (url) => {
  try {
    const response = await httpGet(url);
    if (response.status === 200) {
      return { "Arnie Quote": extractMessage(response.body) };
    } else {
      return { FAILURE: extractMessage(response.body) };
    }
  } catch (error) {
    return error;
  }
};

const getArnieQuotes = async (urls) =>
  Promise.all(urls.map(fetchQuotes)).catch((error) => {
    console.error("Error fetching Arnie quotes:", error);
  });

module.exports = {
  getArnieQuotes,
};
