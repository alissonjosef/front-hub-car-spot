import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-administrative',
    standalone: true,
    imports: [RouterOutlet],
    template: `<router-outlet></router-outlet>`,
})
export class AdministrativeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        // Initialization logic can go here
    }
}
