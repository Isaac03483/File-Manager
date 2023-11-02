import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFilePageComponent } from './show-file-page.component';

describe('ShowFilePageComponent', () => {
  let component: ShowFilePageComponent;
  let fixture: ComponentFixture<ShowFilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowFilePageComponent]
    });
    fixture = TestBed.createComponent(ShowFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
