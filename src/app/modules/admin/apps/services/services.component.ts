import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ecomm-service',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`,
})

export class ServiceComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
