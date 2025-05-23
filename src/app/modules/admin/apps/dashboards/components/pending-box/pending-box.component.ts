import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pending-box',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule],
  templateUrl: './pending-box.component.html',
  styleUrl: './pending-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingBoxComponent {
  onFilesToggle = output();


  clickPendingFiles() {
    this.onFilesToggle.emit()
  }
}
