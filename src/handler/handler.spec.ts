import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { HttpStatus } from '@nestjs/common';

import {
  ErrorHandler,
  LoginResponseHandler,
  paginateResponseHandler,
  singleResponseHandler,
} from '.';

describe('Handler Integration Tests', () => {
  it('should handle login response', () => {
    const data = { username: 'testuser' };
    const statusCode = HttpStatus.OK;
    const response = LoginResponseHandler.handle(data, statusCode);

    expect(response).to.deep.equal({ ...data, statusCode });
  });

  it('should handle paginated response', () => {
    const data = [1, 2, 3];
    const totalCount = 10;
    const page = 1;
    const perPage = 3;
    const response = paginateResponseHandler(data, totalCount, page, perPage);

    expect(response).to.deep.equal({
      page,
      per_page: perPage,
      total: totalCount,
      total_pages: 4,
      data,
      support: {
        url: 'https://droppgroup.com/',
        text: 'We shape the future with our software solutions',
      },
    });
  });

  it('should handle a single response', () => {
    const data = { key: 'value' };
    const response = singleResponseHandler(data);

    expect(response).to.deep.equal({
      data,
      support: {
        url: 'https://droppgroup.com/',
        text: 'We shape the future with our software solutions',
      },
    });
  });
});
