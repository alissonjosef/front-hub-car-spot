import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-exchange-vehicle',
  standalone: true,
  imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`,
})
export class ExchangeVehicleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialization logic can go here
  }

}
