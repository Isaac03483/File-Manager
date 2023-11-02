import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDocumentsPageComponent } from './show-documents-page.component';

describe('ShowDocumentsPageComponent', () => {
  let component: ShowDocumentsPageComponent;
  let fixture: ComponentFixture<ShowDocumentsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDocumentsPageComponent]
    });
    fixture = TestBed.createComponent(ShowDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
