import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiarioService } from 'src/app/Service/beneficiary-service.service';
import { LocationService } from 'src/app/Service/location-service.service';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-beneficiario-add-modal',
    templateUrl: './beneficiarioAddModal.component.html'
})

export class BeneficiarioAddModalComponent implements OnInit, OnChanges {

    expRegEmail: any = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

    beneficiarioFormAdd = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.expRegEmail), Validators.minLength(10)]),
        dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
        address: new FormControl('', [Validators.required, Validators.minLength(10)]),
        location_id: new FormControl('', [Validators.required]),
    })

    localidades = [];

    @Input() open: boolean = false;
    @ViewChild('contenidoAdd') contenidoAdd: TemplateRef<any>;
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
        console.log(this.open);
        if (this.open) {
            this.modal.open(this.contenidoAdd).result.then(result => {
            }, reason => {
                this.modalEvent.emit(false);
            });
        }
    }

    onAdd() {
        // Esto queda para hacer los servicios cuando haga el back-end
        if (this.beneficiarioFormAdd.valid) {
            console.log("add");
            const data = this.beneficiarioFormAdd.value;
            this.beneficiarioService.storeBeneficiary(data).subscribe(resp => {
                this.beneficiaryEvent.emit(resp.data);
                this.beneficiarioFormAdd.reset();
                this.modal.dismissAll();
            });
        }
    }

    get nameAdd() { return this.beneficiarioFormAdd.get('name') };
    get lastnameAdd() { return this.beneficiarioFormAdd.get('lastname') };
    get emailAdd() { return this.beneficiarioFormAdd.get('email') };
    get addressAdd() { return this.beneficiarioFormAdd.get('address') };
    get localidadAdd() { return this.beneficiarioFormAdd.get('location_id') };
    get dniAdd() { return this.beneficiarioFormAdd.get('dni') };
}