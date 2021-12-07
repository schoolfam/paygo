import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PaynowService } from '../service/paynow.service';

import { PaynowComponent } from './paynow.component';

describe('Paynow Management Component', () => {
  let comp: PaynowComponent;
  let fixture: ComponentFixture<PaynowComponent>;
  let service: PaynowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PaynowComponent],
    })
      .overrideTemplate(PaynowComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaynowComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PaynowService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.paynows?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
