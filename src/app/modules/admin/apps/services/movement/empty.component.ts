import { Component } from '@angular/core';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';

@Component({
    selector: 'ecomm-empty-manual-request',
    imports: [HeaderComponent],
    template: `<ecomm-header title="Movimentos (DIMP)" description="Escolha um regulatório" [breadcrumbs]="breadcrumbs">
        <!-- <div class="empty-reg flex min-h-full min-w-full flex-row items-center justify-around">
            <div class="bg-secondary-100 text-primary hover:bg-secondary-200 p-10 shadow-lg min-w-32 rounded-md cursor-pointer">
                <h1 class="font-bold text-3xl">DIMP</h1>
            </div>
        </div> -->
    </ecomm-header> `,
    styles: [
        `
            :host {
                display: block;
            }

            .empty-reg {
                height: calc(50vh)
            }
        `,
    ],
    standalone: true,
})
export class EmptyComponent {
    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Serviços', first: true },
        { label: 'Movimentos', current: true },
    ];
}
