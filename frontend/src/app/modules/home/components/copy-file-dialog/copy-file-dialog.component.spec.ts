import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyFileDialogComponent } from './copy-file-dialog.component';

describe('CopyFileDialogComponent', () => {
  let component: CopyFileDialogComponent;
  let fixture: ComponentFixture<CopyFileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyFileDialogComponent]
    });
    fixture = TestBed.createComponent(CopyFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
