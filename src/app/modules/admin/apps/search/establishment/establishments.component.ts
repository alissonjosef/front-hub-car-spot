import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-establishment',
  standalone: true,
  imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`
})
export class EstablishmentsComponent implements OnInit {
    constructor() { }
    ngOnInit(): void { }
}
