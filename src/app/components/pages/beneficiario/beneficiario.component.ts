import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Beneficiario } from 'src/app/models/beneficiario';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {

  expRegEmail: any = "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  beneficiarioFormAdd = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.expRegEmail), Validators.minLength(10)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })
  beneficiarioFormEdit = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.expRegEmail), Validators.minLength(10)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  // beneficiario: Beneficiario = new Beneficiario();

  constructor(private modal:NgbModal) {
  }

  ngOnInit(): void {
  }

  add(contenidoAdd){
    this.modal.open(contenidoAdd);
  }
  edit(contenidoEdit){
    this.modal.open(contenidoEdit);
  }

  onAdd(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.beneficiarioFormAdd.valid){
      console.log("add");
      console.info(this.beneficiarioFormAdd.value);
    }
  }
  
  onEdit(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.beneficiarioFormEdit.valid){
      console.log("edit");
      console.info(this.beneficiarioFormEdit.value);
    }
  }

  get nameAdd() { return this.beneficiarioFormAdd.get('name')};
  get lastnameAdd() { return this.beneficiarioFormAdd.get('lastname')};
  get emailAdd() { return this.beneficiarioFormAdd.get('email')};
  get addressAdd() { return this.beneficiarioFormAdd.get('address')};
  
  get nameEdit() { return this.beneficiarioFormEdit.get('name')};
  get lastnameEdit() { return this.beneficiarioFormEdit.get('lastname')};
  get emailEdit() { return this.beneficiarioFormEdit.get('email')};
  get addressEdit() { return this.beneficiarioFormEdit.get('address')};

}
