import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ENV } from './core/consts/app.const';

import { CommonModule, registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { isArray, isBoolean } from 'lodash';
import { Subject, takeUntil } from 'rxjs';
import { MetaService } from './core/services/meta.service';
registerLocaleData(localePT, 'pt');

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatIconModule, MatButtonModule, FuseDrawerComponent, MatTooltipModule],
})
export class AppComponent {
    env = signal(ENV);

    drawer = viewChild<MatDrawer>('envDrawer');
    drawerMode = signal<'side' | 'over'>('side');
    drawerOpened = signal<boolean>(false);

    private _fuseMediaWatcherService: FuseMediaWatcherService = inject(FuseMediaWatcherService);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    private metaService = inject(MetaService);

    envComp = computed(() => {
        const keys = Object.keys(this.env());

        return keys.map((key) => {
            const valueProperty = {
                key,
                value: this.env()[key],
            };

            if (isBoolean(this.env()[key])) {
                return {
                    ...valueProperty,
                    type: 'boolean',
                };
            }

            if (isArray(this.env()[key]) && typeof this.env()[key][0] !== 'object') {
                return {
                    ...valueProperty,
                    value: `[${this.env()[key].join(', ')}]`,
                    type: 'text',
                };
            }

            if (typeof this.env()[key] === 'object') {
                return {
                    ...valueProperty,
                    type: 'object',
                };
            }

            return { ...valueProperty, type: 'text' };
        });
    });

    /**
     * Constructor
     */
    constructor(private meta: Meta) {
        /* if (PRD) {
            //<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            this.meta.addTag({ httpEquiv: 'Content-Security-Policy', content: 'upgrade-insecure-requests' });
        } */

        console.log('AppComponent > env:', ENV.production ? 'production' : 'development');
        console.log(`AppComponent > isDev: ${ENV.isDev}`);

        this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            if (matchingAliases.includes('lg')) {
                this.drawerMode.set('side');
                this.drawerOpened.set(false);
            } else {
                this.drawerMode.set('over');
                this.drawerOpened.set(false);
            }
        });

        this.metaService.updateMetaTags();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleDrawer(): void {
        this.drawer().toggle();
    }
}
