import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

}
