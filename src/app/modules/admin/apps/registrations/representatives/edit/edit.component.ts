import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { NgxMaskDirective } from 'ngx-mask';
import { DATE_TIME_FORMAT } from '../../institution/edit/edit.component';
import { IRepresentatives } from '../../models/representatives';
import { RepresentativesService } from '../../services/representatives.service';

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        HeaderComponent,
        NgxMaskDirective,
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepresentativesEditComponent {
    private _representativesService = inject(RepresentativesService);
    _route = inject(ActivatedRoute);

    isSaving = false;
    formSubmitted = false;
    isUpdate = true;
    canEditReg = false;

    codTipo = 0;

    id = signal(this._route.snapshot.params['id']);

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Cadastros', first: true },
        { label: 'Responsáveis e Representantes', onClick: () => this.goBack() },
        { label: 'Editar', current: true },
    ];

    editForm = this._formBuilder.group({
        id: [],
        refCodInstPagamento: [],
        nmResponsavel: [],
        codTipo: [],
        codCpf: [],
        codDddTelefone: [],
        codRamal: [],
        dsEmail: [],
        refCodUsuarioCadastro: [],
        dtCadastro: [],
        refCodUsuarioAlteracao: [],
        dtAlteracao: [],
        dtInicioVigencia: [],
        dtFimVigencia: [],
        codCargo: []
      });

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        const id = this.id();
        this._representativesService.getRepresentativesById(+id).then((representative) => {
            console.log('representative', representative);
                this.updateForm(representative);
            });
    }

    updateForm(representative: IRepresentatives): void {
        this.editForm.patchValue({
            id: representative.id,
            refCodInstPagamento: representative.refCodInstPagamento,
            nmResponsavel: representative.nmResponsavel,
            codTipo: representative.codTipo,
            codCpf: representative.codCpf,
            codDddTelefone: representative.codDddTelefone,
            codRamal: representative.codRamal,
            dsEmail: representative.dsEmail,
            refCodUsuarioCadastro: representative.refCodUsuarioCadastro,
            dtCadastro: representative.dtCadastro ? representative.dtCadastro.format(DATE_TIME_FORMAT) : null,
            refCodUsuarioAlteracao: representative.refCodUsuarioAlteracao,
            dtAlteracao: representative.dtAlteracao ? representative.dtAlteracao.format(DATE_TIME_FORMAT) : null,
            dtInicioVigencia: representative.dtInicioVigencia ? representative.dtInicioVigencia.format(DATE_TIME_FORMAT) : null,
            dtFimVigencia: representative.dtFimVigencia ? representative.dtFimVigencia.format(DATE_TIME_FORMAT) : null,
            codCargo: representative.codCargo,
        });
    }

    goBack(): void {
        this._router.navigate(['/apps/registrations/representatives/list']);
    }
}
