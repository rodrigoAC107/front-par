import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beneficiario } from 'src/app/models/beneficiario';
import { BeneficiarioService } from 'src/app/services/BeneficiarioService.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocationService } from 'src/app/services/LocationService.service';

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
  page = 1;
  total = 0;
  perPage = 5;
  openAdd: boolean;

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
      this.getData(this.page);
      window.scrollTo(0, 0);
    });
  }

  getData(page: number = 1) {
    this.beneficiarioService.getBeneficiaries(page).subscribe((items) => {
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

  edit(contenidoEdit) {
    this.modal.open(contenidoEdit);
  }

  onEdit() {
    //TODO: Esto queda para hacer los servicios cuando haga el back-end
    if (this.beneficiarioFormEdit.valid) {
      console.log("edit");
      console.info(this.beneficiarioFormEdit.value);
    }
  }

  get nameEdit() { return this.beneficiarioFormEdit.get('name') };
  get lastnameEdit() { return this.beneficiarioFormEdit.get('lastname') };
  get emailEdit() { return this.beneficiarioFormEdit.get('email') };
  get addressEdit() { return this.beneficiarioFormEdit.get('address') };
  get localidadEdit() { return this.beneficiarioFormEdit.get('location_id') };
  get dniEdit() { return this.beneficiarioFormEdit.get('dni') };

}
