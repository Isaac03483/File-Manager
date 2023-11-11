import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDirectoryDialogComponent } from './copy-directory-dialog.component';

describe('CopyDirectoryDialogComponent', () => {
  let component: CopyDirectoryDialogComponent;
  let fixture: ComponentFixture<CopyDirectoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CopyDirectoryDialogComponent]
    });
    fixture = TestBed.createComponent(CopyDirectoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
