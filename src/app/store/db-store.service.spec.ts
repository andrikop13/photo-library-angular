import { TestBed } from '@angular/core/testing';

import { DbStoreService } from './db-store.service';

describe('DbStoreService', () => {
  let service: DbStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
