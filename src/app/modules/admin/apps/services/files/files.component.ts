import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ecomm-files',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesComponent {}
