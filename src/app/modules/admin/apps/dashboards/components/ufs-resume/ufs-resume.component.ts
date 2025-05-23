import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATES_BR } from 'app/mock-api/api/states.mock';

@Component({
    selector: 'app-ufs-resume',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ufs-resume.component.html',
    styleUrl: './ufs-resume.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UfsResumeComponent {
    statesOptions = STATES_BR;
}
