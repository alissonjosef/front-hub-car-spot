import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { DimpNotificationRequestComponent } from './components/dimp-notification-request/dimp-notification-request.component';

@Component({
    selector: 'app-dimp-notification',
    standalone: true,
    imports: [RouterModule, CommonModule, FuseDrawerComponent, MatIconModule, DimpNotificationRequestComponent],
    templateUrl: './dimp-notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpNotificationComponent {
    @ViewChild('requestDrawer') drawer: FuseDrawerComponent;

    toggleDrawer() {
        this.drawer.toggle();
    }
}
