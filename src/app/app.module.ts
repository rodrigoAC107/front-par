import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BeneficiarioComponent } from './components/pages/beneficiario/beneficiario.component';
import { ComercioComponent } from './components/pages/comercio/comercio.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductoComponent } from './components/pages/producto/producto.component';
import { RecetaComponent } from './components/pages/receta/receta.component';
import { FechaComponent } from './components/pages/fecha/fecha.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CanActiveLoginGuard } from './helpers/CanActiveLoginGuard';
import { NgxPaginationModule } from 'ngx-pagination';
import { BeneficiarioAddModalComponent } from './components/pages/modals/beneficiariosModals/beneficiarioAddModal.component';
import { BeneficiarioEditModalComponent } from './components/pages/modals/beneficiariosModals/beneficiarioEditModal.component';
import { StoreAddModalComponent } from './components/pages/modals/StoreModals/StoreAddModal.component';
import { StoreEditModalComponent } from './components/pages/modals/StoreModals/StoreEditModal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    BeneficiarioComponent,
    ComercioComponent,
    HomeComponent,
    ProductoComponent,
    RecetaComponent,
    FechaComponent,
    ProfileComponent,
    BeneficiarioAddModalComponent,
    BeneficiarioEditModalComponent,
    StoreAddModalComponent,
    StoreEditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [CanActiveLoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
