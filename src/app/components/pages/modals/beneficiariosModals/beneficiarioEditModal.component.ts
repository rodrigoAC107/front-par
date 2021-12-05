import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/Service/beneficiary-service.service';
import { LocationService } from 'src/app/Service/location-service.service';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-beneficiario-edit-modal',
    templateUrl: './beneficiarioEditModal.component.html'
})

export class BeneficiarioEditModalComponent implements OnInit, OnChanges {

    expRegEmail: any = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    beneficiarioFormEdit = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.expRegEmail), Validators.minLength(10)]),
        dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
        address: new FormControl('', [Validators.required, Validators.minLength(10)]),
        location_id: new FormControl('', [Validators.required]),
    });
    

    localidades = [];

    @Input() open: boolean = false;
    @Input() id: number;
    @ViewChild('contenidoEdit') contenidoEdit: TemplateRef<any>;
    @Output() beneficiaryEvent = new EventEmitter<any>();
    @Output() modalEvent = new EventEmitter<any>();

    constructor(
        private modal: NgbModal,
        private beneficiarioService: BeneficiarioService,
        private localidadService: LocationService,
    ) { }

    ngOnInit(): void {
        this.localidadService.getLocations().subscribe((items) => {
            this.localidades = items['data'];
          });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.open) {
            this.beneficiarioService.showBeneficiary(this.id).subscribe(res => {
                this.initBeneficiary(res.data);
            });
            this.modal.open(this.contenidoEdit).result.then(result => {
            }, reason => {
                this.modalEvent.emit(false);
            });;
        }
    }

    onEdit() {
        // Esto queda para hacer los servicios cuando haga el back-end
        if (this.beneficiarioFormEdit.valid) {
            const data = this.beneficiarioFormEdit.value;
            this.beneficiarioService.updateBeneficiary(data, this.id).subscribe(resp => {
                this.beneficiaryEvent.emit(resp.data);
                this.beneficiarioFormEdit.reset();
                this.modal.dismissAll();
            });
        }
    }

    private initBeneficiary(data: any): void{
        this.beneficiarioFormEdit.controls['name'].setValue(data.name);
        this.beneficiarioFormEdit.controls['lastname'].setValue(data.lastname);
        this.beneficiarioFormEdit.controls['email'].setValue(data.email);
        this.beneficiarioFormEdit.controls['address'].setValue(data.address);
        this.beneficiarioFormEdit.controls['dni'].setValue(data.dni);
        this.beneficiarioFormEdit.controls['location_id'].setValue(data.location_id);
    }

    get nameEdit() { return this.beneficiarioFormEdit.get('name') };
    get lastnameEdit() { return this.beneficiarioFormEdit.get('lastname') };
    get emailEdit() { return this.beneficiarioFormEdit.get('email') };
    get addressEdit() { return this.beneficiarioFormEdit.get('address') };
    get localidadEdit() { return this.beneficiarioFormEdit.get('location_id') };
    get dniEdit() { return this.beneficiarioFormEdit.get('dni') };
}