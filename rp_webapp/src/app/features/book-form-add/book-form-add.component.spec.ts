import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormAddComponent } from './book-form-add.component';

describe('BookFormAddComponent', () => {
  let component: BookFormAddComponent;
  let fixture: ComponentFixture<BookFormAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
