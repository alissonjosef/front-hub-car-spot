import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

export interface HeaderBreadcrumb {
    first?: boolean;
    label: string;
    link?: string;
    current?: boolean;
    onClick?: () => void;
}

@Component({
  selector: 'ecomm-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltip,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    title = input.required<string>();
    description = input('');
    breadcrumbs = input<HeaderBreadcrumb[]>([]);

    showButtonToggle = input(false, {
        transform: (value: string | boolean) => typeof value === 'string' ? value === '' || value === 'true' : value
    });

    iconToggle = input('menu');

    showGoBackButton = input(false, {
        transform: (value: string | boolean) => typeof value === 'string' ? value === '' || value === 'true' : value
    });

    showActionButton = input(false, {
        transform: (value: string | boolean) => typeof value === 'string' ? value === '' || value === 'true' : value
    });

    wrapToggle = input(false, {
        transform: (value: string | boolean) => typeof value === 'string' ? value === '' || value === 'true' : value
    });

    toggleButtonLabel = input<string>('Filtro')

    actionButtonLabel = input<string>('Ação');
    actionButtonIcon = input('add');
    actionRouterLink = input<string | undefined>(undefined);
    
    disabledActionButton = input(false, {
        transform: (value: string | boolean) => typeof value === 'string' ? value === '' || value === 'true' : value
    })

    onToggleButton = output();
    onGoBack = output();
    onActionButtonClick = output();

    toggleButton() {
        this.onToggleButton.emit();
    }

    goBack() {
      this.onGoBack.emit();
    }

    actionButtonHandler() {
        this.onActionButtonClick.emit();
    }
}
