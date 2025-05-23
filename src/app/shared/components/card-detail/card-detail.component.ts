// card-detail.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { IDimpMovement } from '../../../modules/admin/apps/services/movement/dimp/models/dimp-movement.model';

export interface ConfigDataCard {
    key: string;
    label: string;
    classes?: string[];
    applyColor?: boolean;
    applyColorInverted?: boolean;
    pipe?: 'currency' | 'date';
    isBoolean?: boolean;
}

export interface CardDetailSubGroup {
    subtitle?: string;
    items: ConfigDataCard[];
    totals?: ConfigDataCard[];
}

export interface CardDetailConfig {
    id?: string;
    groups: CardDetailSubGroup[];
    totals?: ConfigDataCard[];
    header: string;
    icon: string;
    layout?: 'vertical' | 'horizontal';
    bgClass?: string;
    routerLink?: string;
    routerVar?: {
        key: string;
        replace: string;
    }[];
}

@Component({
    selector: 'app-card-detail',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterLink],
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailComponent {
    @Input() dataSource!: IDimpMovement;

    config = input<CardDetailConfig>({
        groups: [],
        header: '',
        icon: '',
        layout: 'vertical',
        bgClass: 'bg-card',
        routerLink: null,
    });

    getByKey(key, data?) {
        const splitKey = key.split('.');
        const hasNested = splitKey.length > 1;

        if (!hasNested) {
            return (data || this.dataSource)[key];
        }

        const newKeys = [...splitKey];
        newKeys.shift();

        return this.getByKey(newKeys.join('.'), (data || this.dataSource)[splitKey[0]]);
    }

    routerComp = computed(() => {
        const routerLink = this.config().routerLink;
        if (!routerLink) {
            return undefined;
        }

        const routerVar = this.config().routerVar;
        if (routerVar) {
            let newRouterLink = routerLink;

            routerVar.forEach((el) => {
                newRouterLink = newRouterLink.replace(el.replace, this.getByKey(el.key));
            });

            return newRouterLink;
        }

        return routerLink;
    });

    containerClass = computed(() => {
        const classes = [];

        classes.push(this.config().bgClass ?? 'bg-card');
        if (this.routerComp()) {
            classes.push('hover:cursor-pointer hover:opacity-80');
        }

        return classes.join(' ');
    });
}
