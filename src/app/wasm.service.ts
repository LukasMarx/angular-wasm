import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';

declare var WebAssembly;

import '../../wasm/fibonacci.wasm';
import '!!file-loader?name=wasm/fibonacci.wasm!../../wasm/fibonacci.wasm';
import * as Module from './../../wasm/fibonacci.js';
import { Subject } from 'rxjs/Subject';
import { filter, map, take } from 'rxjs/operators';

@Injectable()
export class WasmService {
  module;

  preInitBuffer = {};

  wasmReady = new BehaviorSubject<boolean>(false);

  constructor() {
    this.instantiateWasm('wasm/fibonacci.wasm');
  }

  private async instantiateWasm(url: string): Promise<any> {
    const wasmFile = await fetch(url);

    //const mod = await WebAssembly.compile(buffer);
    const buffer = await wasmFile.arrayBuffer();
    const binary = new Uint8Array(buffer);

    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        this.wasmReady.next(true);
      }
    };

    this.module = Module(moduleArgs);
  }

  public fibonacci(input: number): Observable<number> {
    return combineLatest(this.wasmReady.pipe(filter(value => value === true))).pipe(
      map(() => {
        return this.module._fibonacci(input);
      }),
      take(1)
    );
  }
}
