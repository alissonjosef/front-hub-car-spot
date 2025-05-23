import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseMasonryComponent } from '@fuse/components/masonry';
import { FuseNavigationItem, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { CardDetailComponent } from '@shared/components/card-detail/card-detail.component';
import { Subject, takeUntil } from 'rxjs';
import { HISTORY_MOVEMENT } from '../../dimp/details/movement-detail-config';
import { IDimpMovement } from '../../dimp/models/dimp-movement.model';

@Component({
    selector: 'app-dimp-details-history',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        FuseVerticalNavigationComponent,
        FuseScrollResetDirective,
        CommonModule,
        MatSidenavModule,
        FuseVerticalNavigationComponent,
        FuseScrollResetDirective,
        MatIconModule,
        MatTooltipModule,
        CardDetailComponent,
        FuseMasonryComponent,
    ],
    templateUrl: './dimp-details-history.component.html',
    styleUrl: './dimp-details-history.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DimpDetailsHistoryComponent {
    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(true);

    data = input<IDimpMovement>()

    private _fuseMediaWatcherService = inject(FuseMediaWatcherService);

    cardConfig = HISTORY_MOVEMENT;

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    columnsDetail = signal(1);

    menu = signal<FuseNavigationItem[]>([
        {
            id: 'regulatory',
            title: 'Gerações',
            subtitle: 'DIMP\'s geradas ao longo do movimento',
            type: 'group',
            children: [
                {
                    id: 'g',
                    title: '02/02/2025',
                    type: 'basic',
                },
            ],
        },
    ]);

    constructor() {
        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            console.log(matchingAliases);
            if (matchingAliases.includes('xl')) {
                this.columnsDetail.set(3);
            } else if (matchingAliases.includes('lg')) {
                this.columnsDetail.set(2);
            } else if (matchingAliases.includes('sm')) {
                this.columnsDetail.set(1);
            } else {
                this.columnsDetail.set(1);
            }
        });
    }

    ngOnDestroy() {
        if (this._unsubscribeAll) {
            this._unsubscribeAll.unsubscribe();
        }
    }
}
