import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewComponent {

}
