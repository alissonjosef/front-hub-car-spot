import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-representatives',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class RepresentativesComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
