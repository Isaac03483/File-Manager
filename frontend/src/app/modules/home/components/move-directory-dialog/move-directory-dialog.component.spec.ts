import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDirectoryDialogComponent } from './move-directory-dialog.component';

describe('MoveDirectoryDialogComponent', () => {
  let component: MoveDirectoryDialogComponent;
  let fixture: ComponentFixture<MoveDirectoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveDirectoryDialogComponent]
    });
    fixture = TestBed.createComponent(MoveDirectoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
