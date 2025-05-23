// angular component
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FuseNavigationItem, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { IFile } from '../files/models/file.model';
import { CloseDimpComponent } from './components/close-dimp/close-dimp.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { EDimpType, IDimpMovement } from './dimp/models/dimp-movement.model';

export enum EDrawerType {
    FILE_LIST = 'FILE_LIST',
    CLOSE_DIMP = 'CLOSE_DIMP',
}

export interface IDimpDrawer {
    type: EDrawerType;
    title: string;
    data?: IDimpMovement[] | EDimpType | IFile[];
    afterClose?: any;
}

@Component({
    selector: 'ecomm-movement',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        FuseVerticalNavigationComponent,
        FuseScrollResetDirective,
        RouterOutlet,
        FuseDrawerComponent,
        MatIconModule,
        CloseDimpComponent,
        MatTooltipModule,
        FileListComponent,
    ],
    templateUrl: 'movement.component.html',
    styles: [
        `
            :root {
                display: block;
            }

            ecomm-movement {
                fuse-vertical-navigation {
                    .fuse-vertical-navigation-wrapper {
                        box-shadow: none !important;
                    }
                }

                .fuse-vertical-navigation-item-title {
                    color: rgba(var(--fuse-primary-600-rgb)) !important;
                }
            }
        `,
    ],
})
export class MovementComponent implements OnInit {
    @ViewChild('matDrawer') drawer: MatDrawer;
    @ViewChild('dimpDrawer') dimpDrawer: FuseDrawerComponent;

    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(false);

    dimpDrawerData = signal<IDimpDrawer>({
        title: 'Drawer',
        type: EDrawerType.FILE_LIST,
    });

    private _fuseMediaWatcherService: FuseMediaWatcherService = inject(FuseMediaWatcherService);

    menu = signal<FuseNavigationItem[]>([
        {
            id: 'regulatory',
            title: 'Regulatórios',
            // subtitle: 'Regulatórios',
            type: 'group',
            children: [
                {
                    id: 'regulatory.DIMP',
                    title: 'DIMP',
                    type: 'collapsable',
                    children: [
                        {
                            id: 'regulatory.DIMP-movement-list',
                            title: 'Lista',
                            type: 'basic',
                            link: '/apps/services/movement/dimp',
                            exactMatch: true,
                            queryParamsHandling: 'merge',
                        },
                        /* {
                            id: 'regulatory.DIMP-notification',
                            title: 'Notificação',
                            type: 'basic',
                            link: '/apps/services/movement/dimp/notification',
                        }, */
                    ],
                },
            ],
        },
    ]);

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor() {}

    ngOnInit(): void {
        firstValueFrom(this._fuseMediaWatcherService.onMediaChange$).then(({ matchingAliases }) => {
            if (!matchingAliases.includes('md')) {
                console.log('mobile');
                this.toggleDrawer();
            }
        });

        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            if (matchingAliases.includes('md')) {
                this.drawerMode.set('side');
                this.drawerOpened.set(true);
            } else {
                this.drawerMode.set('over');
                this.drawerOpened.set(false);
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleDrawer(): void {
        this.drawer.toggle();
    }

    openDrawer() {
        this.drawer?.open();
    }

    closeDrawer() {
        this.drawer?.close();
    }

    openDimpDrawer(data: IDimpDrawer) {
        this.dimpDrawerData.set(data);
        this.dimpDrawer.toggle();
    }

    afterCloseDimp() {
        this.dimpDrawer.close();
        if (this.dimpDrawerData().afterClose) {
            this.dimpDrawerData().afterClose();
        }
    }
}
