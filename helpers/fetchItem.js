const fetchItem = async (item) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${item}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
