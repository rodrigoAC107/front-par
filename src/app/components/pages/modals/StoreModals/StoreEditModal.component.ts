import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/Service/location-service.service';
import { EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/Service/store-service.service';
import { ProvinceService } from 'src/app/Service/province-service.service';

@Component({
    selector: 'app-store-edit-modal',
    templateUrl: './storeEditModal.component.html'
})

export class StoreEditModalComponent implements OnInit, OnChanges {

    storeFormEdit = new FormGroup({
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
    @Input() id: number;
    @ViewChild('contenidoEdit') contenidoEdit: TemplateRef<any>;
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
            this.storeService.showStore(this.id).subscribe(res => {
                this.initStore(res.data);
            });
            this.modal.open(this.contenidoEdit).result.then(result => {
            }, reason => {
                this.modalEvent.emit(false);
                this.storeFormEdit.reset();
            });
        }
    }

    onChangeProvince(event){
        this.locationService.getLocations(event).subscribe((items) => {
            this.locations = items['data'];
          });
    }

    onEdit() {
        // Esto queda para hacer los servicios cuando haga el back-end
        if (this.storeFormEdit.valid) {
            const data = this.storeFormEdit.value;
            this.storeService.updateStore(data, this.id).subscribe(resp => {
                this.storeEvent.emit(resp.data);
                this.storeFormEdit.reset();
                this.modal.dismissAll();
            });
        }
    }

    private initStore(data: any): void{
        this.storeFormEdit.controls['name'].setValue(data.name);
        this.storeFormEdit.controls['address'].setValue(data.address);
        this.storeFormEdit.controls['latitude'].setValue(data.latitude);
        this.storeFormEdit.controls['longitude'].setValue(data.longitude);
        this.storeFormEdit.controls['phone'].setValue(data.phone);
        this.storeFormEdit.controls['type_store_id'].setValue(data.type_store_id);
        this.storeFormEdit.controls['location_id'].setValue(data.location_id);
        this.storeFormEdit.controls['province_id'].setValue(data.province_id);
    }

    get nameEdit() { return this.storeFormEdit.get('name') };
    get addressEdit() { return this.storeFormEdit.get('address') };
    get latitudeEdit() { return this.storeFormEdit.get('latitude') };
    get longitudeEdit() { return this.storeFormEdit.get('longitude') };
    get phoneEdit() { return this.storeFormEdit.get('phone') };
    get typeStoreEdit() { return this.storeFormEdit.get('type_store_id')};
    get locationEdit() { return this.storeFormEdit.get('location_id') };
    get provinceEdit() { return this.storeFormEdit.get('province_id') };
}