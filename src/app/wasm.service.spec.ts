/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WasmService } from './wasm.service';

describe('Service: Wasm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WasmService]
    });
  });

  it('should ...', inject([WasmService], (service: WasmService) => {
    expect(service).toBeTruthy();
  }));
});
