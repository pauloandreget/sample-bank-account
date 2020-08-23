import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import httpStatus from 'http-status';
import { mockRequest, mockResponse } from 'mock-req-res';
import AccountService from '../../src/app/services/account';
import AccountController from '../../src/app/controllers/account';

chai.use(sinonChai);

const controller = new AccountController();

const res = mockResponse({
  send: sinon.spy(),
  status: sinon.spy(),
});

const nextSpy = sinon.spy();

describe('account controller', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.balance()', () => {
    it('should return not found for non existent account id', async () => {
      sandbox.stub(AccountService, 'balance').returns(Promise.resolve(null));
      const req = mockRequest({
        query: {
          account_id: 1234
        }
      });
      await controller.balance(req, res, nextSpy);
      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.send).to.have.been.calledWith('0');
    });

    it('should return account balance value', async () => {
      sandbox.stub(AccountService, 'balance').returns(Promise.resolve(100));
      const req = mockRequest({
        query: {
          account_id: 1234
        }
      });
      await controller.balance(req, res, nextSpy);
      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.send).to.have.been.calledWith(100);
    });
  });
});
