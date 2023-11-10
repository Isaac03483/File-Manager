import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeletedFilesPageComponent } from './show-deleted-files-page.component';

describe('ShowDeletedFilesPageComponent', () => {
  let component: ShowDeletedFilesPageComponent;
  let fixture: ComponentFixture<ShowDeletedFilesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDeletedFilesPageComponent]
    });
    fixture = TestBed.createComponent(ShowDeletedFilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
