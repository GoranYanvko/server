import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolesnoComponent } from './polesno.component';

describe('PolesnoComponent', () => {
  let component: PolesnoComponent;
  let fixture: ComponentFixture<PolesnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolesnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolesnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
