import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSharedDocumentsPageComponent } from './show-shared-documents-page.component';

describe('ShowSharedDocumentsPageComponent', () => {
  let component: ShowSharedDocumentsPageComponent;
  let fixture: ComponentFixture<ShowSharedDocumentsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSharedDocumentsPageComponent]
    });
    fixture = TestBed.createComponent(ShowSharedDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
