import { TestBed } from '@angular/core/testing';

import { HttpMemoService } from './http-memo.service';

describe('HttpMemoService', () => {
  let service: HttpMemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
