import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemoComponent } from './create-memo.component';

describe('CreateMemoComponent', () => {
  let component: CreateMemoComponent;
  let fixture: ComponentFixture<CreateMemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMemoComponent]
    });
    fixture = TestBed.createComponent(CreateMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
