import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveFileDialogComponent } from './move-file-dialog.component';

describe('MoveFileDialogComponent', () => {
  let component: MoveFileDialogComponent;
  let fixture: ComponentFixture<MoveFileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveFileDialogComponent]
    });
    fixture = TestBed.createComponent(MoveFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
