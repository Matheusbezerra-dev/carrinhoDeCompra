require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifique se "fetchItem" é uma função', () => 
  expect(typeof fetchItem).toEqual('function'));

  it('ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
  await fetchItem('MLB1615760527');
  expect(fetch).toHaveBeenCalledTimes(1)});

  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint', () => {
    fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto "item" que já está importado no arquivo.', async () => 
   expect(await fetchItem('MLB1615760527')).toEqual(item));

  it('ao chamar a função "fetchItem" sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => 
   expect(await fetchItem()).toEqual(new Error("You must provide an url")));
});
