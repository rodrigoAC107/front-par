import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from 'src/app/Service/store-service.service';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.css']
})
export class ComercioComponent implements OnInit {

  stores = [];
  idStore = null;
  page = 1;
  total = 0;
  perPage = 5;
  openAdd: boolean;
  openEdit: boolean;


  constructor(
    private modal: NgbModal,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 5) || 1;
      this.getData(this.page, this.perPage);
      window.scrollTo(0, 0);
    });
    console.log(this.stores);
  }

  getData(page: number = 1, perPage: number = 5) {
    this.storeService.getStores(page, perPage).subscribe((items) => {
      this.stores = items['data'];
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
    this.idStore = id;
  }

  receiveStore($event){
    this.getData(this.page);
  }
  
  receiveModal($event){
    this.openAdd = false;
    this.openEdit = false;
  }


}
