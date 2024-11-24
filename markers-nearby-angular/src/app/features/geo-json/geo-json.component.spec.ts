import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoJsonComponent } from './geo-json.component';

describe('GeoJsonComponent', () => {
  let component: GeoJsonComponent;
  let fixture: ComponentFixture<GeoJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
