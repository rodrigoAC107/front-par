import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {

  constructor(private modal:NgbModal) {
  }

  ngOnInit(): void {
  }

  open(contenido){
    this.modal.open(contenido);
  }

}
