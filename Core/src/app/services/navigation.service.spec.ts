import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from '../models/category';
import { NavigationService } from './navigation.service';


describe('NavigationService', () => {
  let service: NavigationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavigationService],
    });

    service = TestBed.inject(NavigationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return a list of categories', () => {
    const mockCategories: any[] = [
      { id: 1, category: 'Category 1', artistCategory: 'Artist 1' },
      { id: 2, category: 'Category 2', artistCategory: 'Artist 2' },
    ];
    const expectedCategories: Category[] = [
      { id: 1, category: 'ceramics', artistCategory: 'Nina Malterud' },
      { id: 2, category: 'ceramics', artistCategory: 'Maria Kristofersson' },
    ];

    service.getCategoryList().subscribe((categories: Category[]) => {
      expect(categories).toEqual(expectedCategories);
    });

    const request = httpMock.expectOne(`${service.baseUrl}GetCategoryList`);
    expect(request.request.method).toBe('GET');
    request.flush(mockCategories);
  });
});

