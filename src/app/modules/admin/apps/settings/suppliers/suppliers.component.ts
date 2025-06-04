import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-suppliers',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`,
})
export class SuppliersComponent implements OnInit{

    constructor() { }

    ngOnInit(): void {}
}
