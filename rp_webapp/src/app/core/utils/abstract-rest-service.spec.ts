import { TestBed } from '@angular/core/testing';
import { AbstractRestService } from './abstract-rest-service';
import { HttpClientTestingModule , } from '@angular/common/http/testing';
export class ServiceMockClass extends AbstractRestService<any> {
  constructor(http: any) {
    super(http, 'http://localhost:8080/books');
  }
}

describe('AbstractRestService', () => {
  let service: ServiceMockClass;
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceMockClass],
    }).compileComponents();
    service = TestBed.inject(ServiceMockClass);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
