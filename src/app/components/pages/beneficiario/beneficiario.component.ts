import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beneficiario } from 'src/app/models/beneficiario';
import { BeneficiarioService } from 'src/app/Service/beneficiary-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocationService } from 'src/app/Service/location-service.service';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {

  expRegEmail: any = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  
  beneficiarioFormEdit = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.expRegEmail), Validators.minLength(10)]),
    dni: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
    location_id: new FormControl('', [Validators.required]),
  })

  beneficiarios = [];
  localidades = [];
  idBeneficiary = null;
  page = 1;
  total = 0;
  perPage = 10;
  openAdd: boolean;
  openEdit: boolean;

  constructor(
    private modal: NgbModal,
    private beneficiarioService: BeneficiarioService,
    private localidadService: LocationService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
  }

  ngOnInit(): void {

    this.localidadService.getLocations().subscribe((items) => {
      this.localidades = items['data'];
    });

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page, this.perPage);
      window.scrollTo(0, 0);
    });
  }

  getData(page: number = 1, perPage: number = 10) {
    this.beneficiarioService.getBeneficiaries(page, perPage).subscribe((items) => {
      this.beneficiarios = items['data'];
      this.total = items['meta'].total;
      this.perPage = items['meta'].per_page;
    });

  }

  pageChanged(page) {
    this.page = page;
    const queryParams: Params = { page };
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );
    this.getData(this.page);
  }

  showModalEdit(id){
    this.openEdit = true;
    this.idBeneficiary = id;
  }

  receiveBeneficiary($event){
    this.getData(this.page);
  }
  
  receiveModal($event){
    this.openAdd = false;
    this.openEdit = false;
  }

}
