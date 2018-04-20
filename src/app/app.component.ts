import { Component } from '@angular/core';
import { WasmService } from './wasm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private wasm: WasmService) {}

  ngOnInit() {
    console.log('comp');
    this.wasm.fibonacci(43).subscribe(value => {
      console.log(value);
    });
  }
}
