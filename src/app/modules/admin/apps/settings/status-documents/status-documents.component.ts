import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-status-documents',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class StatusDocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { 
  }

}
