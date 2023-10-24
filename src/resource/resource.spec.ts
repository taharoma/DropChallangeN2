import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { ResourceService } from './resource.service';
import chai, { expect } from 'chai';
import sinon, { SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

describe('ResourceService Integration Test', () => {
  let app: INestApplication;
  let resourceService: ResourceService;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    resourceService = app.get<ResourceService>(ResourceService);
  });

  beforeEach(async () => {});

  let createdResource;
  describe('ResourceService', () => {
    it('should create a resource', async () => {
      const createResourceDto = {
        name: 'Sample Name',
        year: 2023,
        color: 'Blue',
        pantone_value: '1234',
      };

      createdResource = await resourceService.create(createResourceDto);
      expect(createdResource).to.exist;
    });
    it('should find the created resource by ID', async () => {
      const foundResource = await resourceService.findOne(createdResource.id);
      expect(foundResource).to.exist;
    });

    it('should find all resources with pagination', async () => {
      const page = 1;
      const perPage = 1;
      const allResources = await resourceService.findWithPagination(
        page,
        perPage,
      );

      expect(allResources).to.be.an('array').that.is.not.empty;
    });
  });
});
