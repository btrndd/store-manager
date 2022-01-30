const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

describe('Testes da camada Service de Produtos', () => {
  describe('Buscando todos os produtos no banco', () => {
    describe('Quando não há nenhum produto cadastrado', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves([]);
        sinon.stub(productsModel, 'getById').resolves(new Error('Product not found'));
      });

      after(() => {
        productsModel.getAll.restore();
        productsModel.getById.restore();
      });

      it('retorna um array buscando por todos', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.an('array');
      });

      it('retorna um array vazio buscando por todos', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.empty;
      });
      it('retorna undefined buscando por apenas 1', async () => {
        const result = await productsService.getById(1);
        expect(result).to.be.an('error');
      });      
    })
    describe('Quando busca por um produto que existe por id', () => {
      before(() => {
        const product = [{
          id: 1,
          name: 'Camiseta',
          quantity: 5,
        }];
        sinon.stub(productsModel, 'getById').resolves(product);
      });

      after(() => {
        productsModel.getById.restore();
      });
      
      it('retorna um array', async () => {
        const result = await productsService.getById(1);
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await productsService.getById(1);
        expect(result).to.be.not.empty;     
      });

      it('retorna um array com apenas 1 objeto', async () => {
        const result = await productsService.getById(1);
        expect(result).to.be.have.lengthOf(1);   
      });

      it('possui itens do tipo objeto', async () => {
        const result = await productsService.getById(1);
        expect(result[0]).to.be.an('object');  
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const result = await productsService.getById(1);
        expect(result[0]).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );
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
        sinon.stub(productsModel, 'getAll').resolves(products);
      });

      after(() => {
        productsModel.getAll.restore();
      });
      
      it('retorna um array', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.an('array');       
      });

      it('retorna um array não vazio', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.not.empty;     
      });

      it('possui itens do tipo objeto', async () => {
        const result = await productsService.getAll();
        result.forEach((item) => {
          expect(item).to.be.an('object');  
        })
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const result = await productsService.getAll();
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
        sinon.stub(productsModel, 'getByName').resolves([]);
        sinon.stub(productsModel, 'create').resolves(product);
      });

      after(() => {
        productsModel.getByName.restore();
        productsModel.create.restore();
      });
      
      it('retorna um objeto', async () => {
        const body = {
          name: 'Calça',
          quantity: 5,
        };
        const result = await productsService.create(body.name, body.quantity);
        expect(result).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name", "quantity"', async () => {
        const body = {
          name: 'Calça',
          quantity: 5,
        };
        const result = await productsService.create(body.name, body.quantity);
        expect(result).to.include.all.keys(
          'id',
          'name',
          'quantity',
        );
      });
    })
    describe('Quando algum dado é inválido', () => {
      before(() => {
        sinon.stub(productsModel, 'getByName').resolves([]);
        sinon.stub(productsModel, 'create').resolves(new Error());
      });

      after(() => {
        productsModel.getByName.restore();
        productsModel.create.restore();
      });
      
      it('retorna um erro', async () => {
        const body = {
          name: 'Calça',
          quantity: 5,
        };
        const result = await productsService.create(body.name, body.quantity);
        expect(result).to.be.an('error');
      });
    })
  })
  describe('Atualizando um produto', () => {
    describe('Quando o produto é atualizado com sucesso', () => {
      before(() => {
        const product = {
          id: 1,
          name: 'Calça',
          quantity: 5,
        };
        const updatedProduct = {
          id: 1,
          name: 'Sapato',
          quantity: 3,
        };
        sinon.stub(productsModel, 'getByName').resolves([]);
        sinon.stub(productsModel, 'getById').resolves(product);
        sinon.stub(productsModel, 'create').resolves(product);
        sinon.stub(productsModel, 'update').resolves(updatedProduct);
      });

      after(() => {
        productsModel.getById.restore();
        productsModel.getByName.restore();
        productsModel.create.restore();
        productsModel.update.restore();
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
        await productsService.create(body.name, body.quantity);
        const result = await productsService.update(body.id, body.name, newBody.quantity);
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
        await productsService.create(body.name, body.quantity);
        const result = await productsService.update(body.id, body.name, newBody.quantity);
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
        await productsService.create(body.name, body.quantity);
        const result = await productsService.update(newBody.id, newBody.name, newBody.quantity);
        expect(result).to.deep.equal(newBody);
      });
    })
  })
});
