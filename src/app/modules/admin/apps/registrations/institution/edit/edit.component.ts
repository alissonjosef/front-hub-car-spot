import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { HeaderBreadcrumb, HeaderComponent } from '@shared/components/header/header.component';
import { NgxMaskDirective } from 'ngx-mask';
import { IInstitution } from '../../models/institution';
import { InstitutionService } from '../../services/institution.service';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

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
        MatChipsModule,
        FuseDrawerComponent,
        FuseAlertComponent,
    ],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstitutionEditComponent implements OnInit {
    private _institutionService = inject(InstitutionService);
    form: FormGroup;
    @ViewChild('regDrawer') drawer: FuseDrawerComponent;
    _route = inject(ActivatedRoute);

    isNew: boolean = this._route.snapshot.data['isNew'];
    id = signal(this._route.snapshot.params['id']);

    openedReg = signal<boolean>(false);

    backupResponsibleCpf = signal('');

    breadcrumbs: HeaderBreadcrumb[] = [
        { label: 'Cadastros', first: true },
        { label: 'Instituição de Pagamento', onClick: () => this.goBack() },
        { label: this.isNew ? 'Nova instituição' : 'Edição' },
    ];

    regForm = new FormGroup({
        regulatory: new FormControl(null),
    });

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.initHorizontalStepperForm();

        if (this.id()) {
            const id = parseInt(this.id(), 10);
            this.loadData(id);

        }
    }

    goBack(): void {
        this._router.navigate(['/apps/registrations/institution/list']);
    }

    initHorizontalStepperForm(): void {
        this.form = this._formBuilder.group({
            id: [undefined],
            nmRazaoSocial: [''],
            nmFantasia: [''],
            nmEndereco: [''],
            nmNumero: [''],
            nmComplemento: [''],
            nmBairro: [''],
            codCep: ['', [Validators.required]],
            dsEmailResponsavel: [''],
            nmResponsavel: [''],
            codCpfResponsavel: [''],
            codCpfRepresentante: [''],
            nmRepresentante: [''],
            dsEmailRepresentante: [''],
            codTelefoneRamal: [''],
            codIm: [''],
            codCidade: [],
            codIbge: [''],
            nmUf: [''],
            nmCidade: [''],
            codCnpj: ['', [Validators.required]],
            codIe: [''],
            codDddTelefone: [''],
            dtInicioVigencia: [new Date()],
            dtFimVigencia: [new Date()],
            refCodUsuarioCadastro: [],
            dtCadastro: [],
            refCodUsuarioAlteracao: [4],
            dtAlteracao: [],
        });
    }

    updateForm(institution: IInstitution): void {
        this.form.patchValue({
            id: institution.id,
            nmRazaoSocial: institution.razaoSocial,
            nmFantasia: institution.nomeFantasia,
            nmEndereco: institution.logradouro,
            nmNumero: institution.logradouroNumero,
            nmBairro: institution.bairro,
            codCep: institution.cep,
            dsEmailResponsavel: institution.email,
            nmResponsavel: institution.nomeResponsavel,
            codDddTelefone: institution.telefone,
            codIbge: institution.codigoIbge,
            nmUf: institution.uf,
            nmCidade: institution.cidade,
            codCnpj: institution.cnpj,
            dtInicioVigencia: institution.auditCreatedAt,
            dtFimVigencia: institution.auditUpdatedAt,
            refCodUsuarioCadastro: institution.auditSystemCreatedBy,
            refCodUsuarioAlteracao: institution.auditSystemUpdatedBy,
            dtCadastro: institution.auditCreatedAt,
            dtAlteracao: institution.auditUpdatedAt,
        });
    }

    loadData(id: number): void {
        this._institutionService.getRepresentativeById(id).then((institution) => {
            if (institution) {
                this.updateForm(institution);
            } else {
                console.error(`Instituição com ID ${id} não encontrada.`);
            }
        });
    }

    regToggle() {
        this.drawer.toggle();
    }
}
