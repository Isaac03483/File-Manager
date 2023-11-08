import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSharedFilePageComponent } from './show-shared-file-page.component';

describe('ShowSharedFilePageComponent', () => {
  let component: ShowSharedFilePageComponent;
  let fixture: ComponentFixture<ShowSharedFilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSharedFilePageComponent]
    });
    fixture = TestBed.createComponent(ShowSharedFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
