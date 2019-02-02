import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";

import * as Module from "./../../wasm/fibonacci.js";
import "!!file-loader?name=wasm/fibonacci.wasm!../../wasm/fibonacci.wasm";

@Injectable()
export class WasmService {
  module: any;

  wasmReady = new BehaviorSubject<boolean>(false);

  constructor() {
    this.instantiateWasm("wasm/fibonacci.wasm");
  }

  private async instantiateWasm(url: string) {
    // fetch the wasm file
    const wasmFile = await fetch(url);

    // convert it into a binary array
    const buffer = await wasmFile.arrayBuffer();
    const binary = new Uint8Array(buffer);

    // create module arguments
    // including the wasm-file
    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        this.wasmReady.next(true);
      }
    };

    // instantiate the module
    this.module = Module(moduleArgs);
  }

  public fibonacci(input: number) {
    return this.wasmReady.pipe(
      filter(value => value === true),
      mergeMap(
        () =>
          new Observable(observer => {
            const result = this.module._fibonacci(input);
            observer.next(result);
            observer.complete();
          })
      )
    );
  }
}
