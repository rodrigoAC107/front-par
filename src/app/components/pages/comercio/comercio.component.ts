import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  comercioFormAdd = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    latitude: new FormControl('', [Validators.required, Validators.minLength(5)]),
    length: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5)]),
    province: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })
  comercioFormEdit = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    latitude: new FormControl('', [Validators.required, Validators.minLength(5)]),
    length: new FormControl('', [Validators.required, Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.minLength(5)]),
    province: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(private modal:NgbModal) { }

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
    if(this.comercioFormAdd.valid){
      console.log("add");
      console.info(this.comercioFormAdd.value);
    }
  }
  
  onEdit(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.comercioFormEdit.valid){
      console.log("edit");
      console.info(this.comercioFormEdit.value);
    }
  }

  get nameAdd() { return this.comercioFormAdd.get('name')};
  get addressAdd() { return this.comercioFormAdd.get('address')};
  get latitudeAdd() { return this.comercioFormAdd.get('latitude')};
  get lengthAdd() { return this.comercioFormAdd.get('length')};
  get locationAdd() { return this.comercioFormAdd.get('location')};
  get provinceAdd() { return this.comercioFormAdd.get('province')};

  get nameEdit() { return this.comercioFormAdd.get('name')};
  get addressEdit() { return this.comercioFormAdd.get('address')};
  get latitudeEdit() { return this.comercioFormAdd.get('latitude')};
  get lengthEdit() { return this.comercioFormAdd.get('length')};
  get locationEdit() { return this.comercioFormAdd.get('location')};
  get provinceEdit() { return this.comercioFormAdd.get('province')};


}
