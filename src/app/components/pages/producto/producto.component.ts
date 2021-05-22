import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
  }

  ProductoFormAdd = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    special: new FormControl(''),
  })
  
  ProductoFormEdit = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    special: new FormControl(''),
  })

  add(contenidoAdd){
    this.modal.open(contenidoAdd);
  }
  edit(contenidoEdit){
    this.modal.open(contenidoEdit);
  }

  onAdd(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.ProductoFormAdd.valid){
      console.log("add");
      console.info(this.ProductoFormAdd.value);
    }
  }
  
  onEdit(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.ProductoFormEdit.valid){
      console.log("edit");
      console.info(this.ProductoFormEdit.value);
    }
  }

  get nameAdd() { return this.ProductoFormAdd.get('name')};
  get typeAdd() { return this.ProductoFormAdd.get('type')};
  
  get nameEdit() { return this.ProductoFormEdit.get('name')};
  get typeEdit() { return this.ProductoFormEdit.get('type')};

}
