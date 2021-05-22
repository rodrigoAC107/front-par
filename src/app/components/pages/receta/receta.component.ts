import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
  }

  RecetaFormAdd = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  
  RecetaFormEdit = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  add(contenidoAdd){
    this.modal.open(contenidoAdd);
  }
  edit(contenidoEdit){
    this.modal.open(contenidoEdit);
  }

  onAdd(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.RecetaFormAdd.valid){
      console.log("add");
      console.info(this.RecetaFormAdd.value);
    }
  }
  
  onEdit(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.RecetaFormEdit.valid){
      console.log("edit");
      console.info(this.RecetaFormEdit.value);
    }
  }

  get titleAdd() { return this.RecetaFormAdd.get('title')};
  get descriptionAdd() { return this.RecetaFormAdd.get('description')};
  
  get titleEdit() { return this.RecetaFormEdit.get('title')};
  get descriptionEdit() { return this.RecetaFormEdit.get('description')};

}
