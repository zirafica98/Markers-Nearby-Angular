import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerInfoComponent } from './marker-info.component';

describe('MarkerInfoComponent', () => {
  let component: MarkerInfoComponent;
  let fixture: ComponentFixture<MarkerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
