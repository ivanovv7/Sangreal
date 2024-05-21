import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereToBuyComponent } from './where-to-buy.component';

describe('WhereToBuyComponent', () => {
  let component: WhereToBuyComponent;
  let fixture: ComponentFixture<WhereToBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhereToBuyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhereToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
