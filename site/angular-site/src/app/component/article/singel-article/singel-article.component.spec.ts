import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingelArticleComponent } from './singel-article.component';

describe('SingelArticleComponent', () => {
  let component: SingelArticleComponent;
  let fixture: ComponentFixture<SingelArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingelArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingelArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
