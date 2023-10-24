const request = require('supertest');
const { Test, TestingModule } = require('@nestjs/testing');
const { ResourceController } = require('../src/resource/resource.controller');
const { ResourceService } = require('../src/resource/resource.service');
const { NotFoundException } = require('@nestjs/common');
const sinon = require('sinon');

describe('ResourceController', () => {
  let app;
  const resourceService = {
    findWithPagination: sinon.stub(),
    countAll: sinon.stub(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ResourceController],
      providers: [
        {
          provide: ResourceService,
          useValue: resourceService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return a paginated response when calling findAll', async () => {
    const page = 1;
    const perPage = 6;
    const users = []; // Your sample user data
    const totalCount = 10; // Total count of resources

    resourceService.findWithPagination.withArgs(page, perPage).resolves(users);
    resourceService.countAll.resolves(totalCount);

    const response = await request(app.getHttpServer())
      .get('/resource')
      .query({ page, per_page: perPage })
      .expect(200);

    expect(response.body).toEqual({
      data: users,
      total: totalCount,
      page,
      per_page: perPage,
    });
  });

  it('should throw NotFoundException when calling findOne with an invalid ID', async () => {
    const invalidId = 'invalid-id';
    resourceService.findOne.withArgs(invalidId).resolves(null);

    await request(app.getHttpServer())
      .get('/resource/' + invalidId)
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toEqual([new NotFoundException([])]);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
