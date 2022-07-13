const saveCartItems = (paramOne, paramTwo) => localStorage.setItem(paramOne, paramTwo); 

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
