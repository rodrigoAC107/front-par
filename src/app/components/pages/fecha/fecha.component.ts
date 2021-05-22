import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  fechaFormAdd = new FormGroup({
    accreditation: new FormControl('', [Validators.required]),
    performance: new FormControl('', [Validators.required]),
    expiration: new FormControl('', [Validators.required]),
  })
  fechaFormEdit = new FormGroup({
    accreditation: new FormControl('', [Validators.required]),
    performance: new FormControl('', [Validators.required]),
    expiration: new FormControl('', [Validators.required]),
  })

  constructor(private modal:NgbModal) {}

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
    if(this.fechaFormAdd.valid){
      console.log("add");
      console.info(this.fechaFormAdd.value);
    }
  }
  
  onEdit(){
    // Esto queda para hacer los servicios cuando haga el back-end
    if(this.fechaFormEdit.valid){
      console.log("edit");
      console.info(this.fechaFormEdit.value);
    }
  }

  get accreditationAdd() { return this.fechaFormAdd.get('accreditation')};
  get performanceAdd() { return this.fechaFormAdd.get('performance')};
  get expirationAdd() { return this.fechaFormAdd.get('expiration')};
  
  get accreditationEdit() { return this.fechaFormEdit.get('accreditation')};
  get performanceEdit() { return this.fechaFormEdit.get('performance')};
  get expirationEdit() { return this.fechaFormEdit.get('expiration')};
  
}
