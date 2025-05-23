import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricItemComponent } from './historic-item.component';

describe('HistoricItemComponent', () => {
  let component: HistoricItemComponent;
  let fixture: ComponentFixture<HistoricItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
