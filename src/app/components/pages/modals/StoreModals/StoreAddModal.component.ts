import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/Service/location-service.service';
import { EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/Service/store-service.service';
import { ProvinceService } from 'src/app/Service/province-service.service';

@Component({
    selector: 'app-store-add-modal',
    templateUrl: './storeAddModal.component.html'
})

export class StoreAddModalComponent implements OnInit, OnChanges {

    // expRegEmail: any = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"

    storeFormAdd = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        address: new FormControl('', [Validators.required, Validators.minLength(5)]),
        latitude: new FormControl('', [Validators.required, Validators.minLength(5)]),
        longitude: new FormControl('', [Validators.required, Validators.minLength(5)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
        type_store_id: new FormControl('', [Validators.required]),
        location_id: new FormControl('', [Validators.required]),
        province_id: new FormControl('', [Validators.required]),
    })

    locations = [];
    provinces = [];
    typeStores = [];

    @Input() open: boolean = false;
    @ViewChild('contenidoAdd') contenidoAdd: TemplateRef<any>;
    @Output() storeEvent = new EventEmitter<any>();
    @Output() modalEvent = new EventEmitter<any>();

    constructor(
        private modal: NgbModal,
        private storeService: StoreService,
        private provinceService: ProvinceService,
        private locationService: LocationService
    ) {}

    ngOnInit(): void {
        this.provinceService.getProvinces().subscribe((items) => {
            this.provinces = items['data'];
          });
        
        this.storeService.getTypeStore().subscribe((items) => {
            this.typeStores = items['data'];
          });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.open) {
            this.modal.open(this.contenidoAdd).result.then(result => {
            }, reason => {
                this.modalEvent.emit(false);
                this.storeFormAdd.reset();
            });
        }
    }

    onChangeProvince(event){
        this.locationService.getLocations(event).subscribe((items) => {
            this.locations = items['data'];
          });
    }

    onAdd() {
        // Esto queda para hacer los servicios cuando haga el back-end
        if (this.storeFormAdd.valid) {
            const data = this.storeFormAdd.value;
            this.storeService.storeStore(data).subscribe(resp => {
                this.storeEvent.emit(resp.data);
                this.storeFormAdd.reset();
                this.modal.dismissAll();
            });
        }
    }

    get nameAdd() { return this.storeFormAdd.get('name') };
    get addressAdd() { return this.storeFormAdd.get('address') };
    get latitudeAdd() { return this.storeFormAdd.get('latitude') };
    get longitudeAdd() { return this.storeFormAdd.get('longitude') };
    get phoneAdd() { return this.storeFormAdd.get('phone') };
    get typeStoreAdd() { return this.storeFormAdd.get('type_store_id')};
    get locationAdd() { return this.storeFormAdd.get('location_id') };
    get provinceAdd() { return this.storeFormAdd.get('province_id') };
}