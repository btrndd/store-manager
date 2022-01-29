const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const connection = require('../../models/connection');
const res = require('express/lib/response');

describe('Testes da camada Model de Produtos', () => {
  describe('Buscando produtos no banco', () => {
    describe('Quando não há nenhum produto cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array buscando por todos', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.an('array');
      });

      it('retorna um array vazio buscando por todos', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.empty;
      });
      it('retorna undefined buscando por apenas 1', async () => {
        const result = await productsModel.getById(1);
        expect(result).to.be.undefined;
      });      
    })
    describe('Quando busca por um produto que existe por id', () => {
      before(() => {
        const product = [{
          id: 1,
          name: 'Camiseta',
          quantity: 5,
        }];
        sinon.stub(connection, 'execute').resolves([[product]]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um array', async () => {
        const result = await productsModel.getById(1);
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await productsModel.getById(1);
        expect(result).to.be.not.empty;     
      });

      it('retorna um array com apenas 1 objeto', async () => {
        const result = await productsModel.getById(1);
        expect(result).to.be.have.lengthOf(1);   
      });

      it('possui itens do tipo objeto', async () => {
        const result = await productsModel.getById(1);
        expect(result[0]).to.be.an('object');  
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const result = await productsModel.getById(1);
        expect(result[0]).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );
      });
    })
    describe('Quando busca por um produto que existe por nome', () => {
      before(() => {
        const product = { name: 'Camiseta' };
        sinon.stub(connection, 'execute').resolves([[product]]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um array', async () => {
        const result = await productsModel.getByName('Camiseta');
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await productsModel.getByName('Camiseta');
        expect(result).to.be.not.empty;     
      });

      it('possui itens do tipo string', async () => {
        const result = await productsModel.getByName('Camiseta');
        result.forEach((item) => {
          expect(item).to.be.an('string');
        })          
      });

      it('se é retornado o nome da camiseta', async () => {
        const result = await productsModel.getByName('Camiseta');
        const productName = result.some((product) => product === 'Camiseta')
        expect(productName).to.be.true;
      });
    })
    describe('Quando busca por todos os produtos cadastrados', () => {
      before(() => {
        const products = [{
          id: 1,
          name: 'Camiseta',
          quantity: 5,
        },
        {
          id: 2,
          name: 'Bola',
          quantity: 2,
        }];
        sinon.stub(connection, 'execute').resolves([products]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um array', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await productsModel.getAll();
        expect(result).to.be.not.empty;     
      });

      it('possui itens do tipo objeto', async () => {
        const result = await productsModel.getAll();
        result.forEach((item) => {
          expect(item).to.be.an('object');  
        })
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const result = await productsModel.getAll();
        result.forEach((item) => {
          expect(item).to.include.all.keys(
            'id',
            'name',
            'quantity',
          );
        })
      });
    })
  })
  describe('Criando um novo produto', () => {
    describe('Quando o produto é criado com sucesso', () => {
      before(() => {
        const product = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        sinon.stub(connection, 'execute').resolves([product]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um objeto', async () => {
        const body = {
          name: 'Calça',
          quantity: 5,
        };
        const result = await productsModel.create(body.name, body.quantity);
        expect(result).to.be.an('object');       
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const body = {
          name: 'Calça',
          quantity: 5,
        };
        const result = await productsModel.create(body.name, body.quantity);
        expect(result).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );        
      });
    })
  })
  describe('Atualizando um produto', () => {
    describe('Quando o produto é criado com sucesso', () => {
      before(() => {
        const product = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        sinon.stub(connection, 'execute').resolves([product]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um objeto', async () => {
        const body = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        const newBody = {
          name: 'Calça',
          quantity: 3,
        };
        await productsModel.create(body.name, body.quantity);
        const result = await productsModel.create(body.id, body.name, newBody.quantity);
        expect(result).to.be.an('object');       
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const body = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        const newBody = {
          name: 'Calça',
          quantity: 3,
        };
        await productsModel.create(body.name, body.quantity);
        const result = await productsModel.update(body.id, body.name, newBody.quantity);
        expect(result).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );        
      });
      it('o objeto tem suas propridades alteradas com sucesso', async () => {
        const body = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        const newBody = {
          id: 1,
          name: 'Sapato',
          quantity: 3,
        };
        await productsModel.create(body.name, body.quantity);
        const result = await productsModel.update(newBody.id, newBody.name, newBody.quantity);
        expect(result).to.deep.equal(newBody);
      });
    })
  })
  describe('Removendo um produto', () => {
    describe('Quando o produto é removido com sucesso', () => {
      before(() => {
        const product = [{
          id: 1,
          name: 'Calça',
          quantity: 5,
        }];
        sinon.stub(connection, 'execute').resolves([product]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um objeto', async () => {
        const body = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        await productsModel.create(body.name, body.quantity);
        const result = await productsModel.remove(body.id);
        expect(result).to.be.an('object');       
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const body = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        await productsModel.create(body.name, body.quantity);
        const result = await productsModel.remove(body.id);
        expect(result).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );        
      });
    })
  })
});

describe('Testes da camada Model de Sales', () => {
  describe('Buscando vendas no banco', () => {
    describe('Quando não há nenhuma venda cadastrado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array buscando por todas', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.an('array');
      });

      it('retorna um array vazio buscando por todas', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.empty;
      });
      it('retorna undefined buscando por apenas 1', async () => {
        const result = await salesModel.getById(1);
        expect(result[0]).to.be.undefined;
      });      
    })
    describe('Quando busca por uma venda que existe por id', () => {
      before(() => {
        const sale = {
          date: new Date(),
          product_id: 2,
          quantity: 5,
        };
        sinon.stub(connection, 'execute').resolves([[sale]]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um array', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.not.empty;     
      });

      it('retorna um array com apenas 1 objeto', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.have.lengthOf(1);   
      });

      it('possui itens do tipo objeto', async () => {
        const result = await salesModel.getById(1);
        expect(result[0]).to.be.an('object');  
      });

      it('o objeto possui as propriedades "date", "product_id", "quantity"', async () => {
        const result = await salesModel.getById(1);
        expect(result[0]).to.include.all.keys(
          'date',
          'product_id',
          'quantity',
        );
      });
    })  
    describe('Quando busca por todas as vendas cadastradas', () => {
      before(() => {
        const vendas = [{
          saleId: 1,
          date: new Date(),
          product_id: 3,
          quantity: 5,
        },
        {
          saleId: 2,
          date: new Date(),
          product_id: 2,
          quantity: 2,
        }];
        sinon.stub(connection, 'execute').resolves([vendas]);
      });

      after(() => {
        connection.execute.restore([]);
      });
      
      it('retorna um array', async () => {
        const result = await salesModel.getAll();
        console.log(result);
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.not.empty;     
      });

      it('possui itens do tipo objeto', async () => {
        const result = await salesModel.getAll();
        result.forEach((item) => {
          expect(item).to.be.an('object');  
        })
      });

      it('o objeto possui as propriedades "saleId", "date", "product_id", "quantity"', async () => {
        const result = await salesModel.getAll();
        result.forEach((item) => {
          expect(item).to.include.all.keys(
            'saleId',
            'date',
            'product_id',
            'quantity',
          );
        })
      });
    })
  
  // describe('Criando um novo produto', () => {
  //   describe('Quando o produto é criado com sucesso', () => {
  //     before(() => {
  //       const product = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       sinon.stub(connection, 'execute').resolves([product]);
  //     });

  //     after(() => {
  //       connection.execute.restore([]);
  //     });
      
  //     it('retorna um objeto', async () => {
  //       const body = {
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       const result = await productsModel.create(body.name, body.quantity);
  //       expect(result).to.be.an('object');       
  //     });

  //     it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
  //       const body = {
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       const result = await productsModel.create(body.name, body.quantity);
  //       expect(result).to.include.all.keys(
  //         'id',
  //         'name',
  //         'quantity',
  //       );        
  //     });
  //   })
  // })
  // describe('Atualizando um produto', () => {
  //   describe('Quando o produto é criado com sucesso', () => {
  //     before(() => {
  //       const product = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       sinon.stub(connection, 'execute').resolves([product]);
  //     });

  //     after(() => {
  //       connection.execute.restore([]);
  //     });
      
  //     it('retorna um objeto', async () => {
  //       const body = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       const newBody = {
  //         name: 'Calça',
  //         quantity: 3,
  //       };
  //       await productsModel.create(body.name, body.quantity);
  //       const result = await productsModel.create(body.id, body.name, newBody.quantity);
  //       expect(result).to.be.an('object');       
  //     });

  //     it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
  //       const body = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       const newBody = {
  //         name: 'Calça',
  //         quantity: 3,
  //       };
  //       await productsModel.create(body.name, body.quantity);
  //       const result = await productsModel.update(body.id, body.name, newBody.quantity);
  //       expect(result).to.include.all.keys(
  //         'id',
  //         'name',
  //         'quantity',
  //       );        
  //     });
  //     it('o objeto tem suas propridades alteradas com sucesso', async () => {
  //       const body = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       const newBody = {
  //         id: 1,
  //         name: 'Sapato',
  //         quantity: 3,
  //       };
  //       await productsModel.create(body.name, body.quantity);
  //       const result = await productsModel.update(newBody.id, newBody.name, newBody.quantity);
  //       expect(result).to.deep.equal(newBody);
  //     });
  //   })
  // })
  // describe('Removendo um produto', () => {
  //   describe('Quando o produto é removido com sucesso', () => {
  //     before(() => {
  //       const product = [{
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       }];
  //       sinon.stub(connection, 'execute').resolves([product]);
  //     });

  //     after(() => {
  //       connection.execute.restore([]);
  //     });
      
  //     it('retorna um objeto', async () => {
  //       const body = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       await productsModel.create(body.name, body.quantity);
  //       const result = await productsModel.remove(body.id);
  //       expect(result).to.be.an('object');       
  //     });

  //     it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
  //       const body = {
  //         id: 1,
  //         name: 'Calça',
  //         quantity: 5,
  //       };
  //       await productsModel.create(body.name, body.quantity);
  //       const result = await productsModel.remove(body.id);
  //       expect(result).to.include.all.keys(
  //         'id',
  //         'name',
  //         'quantity',
  //       );        
  //     });
  //   })
  })
})
