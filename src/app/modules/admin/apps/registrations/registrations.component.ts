import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class RegistrationsComponent implements OnInit{
    constructor() { }

    ngOnInit(): void {}
}
