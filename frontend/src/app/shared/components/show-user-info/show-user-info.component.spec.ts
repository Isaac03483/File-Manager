import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserInfoComponent } from './show-user-info.component';

describe('ShowUserInfoComponent', () => {
  let component: ShowUserInfoComponent;
  let fixture: ComponentFixture<ShowUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowUserInfoComponent]
    });
    fixture = TestBed.createComponent(ShowUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
