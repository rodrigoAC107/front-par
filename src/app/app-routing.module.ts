import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ContentComponent } from './components/shared/content/content.component';
import { HomeComponent } from './components/pages/home/home.component';
import { BeneficiarioComponent } from './components/pages/beneficiario/beneficiario.component';
import { ComercioComponent } from './components/pages/comercio/comercio.component';
import { FechaComponent } from './components/pages/fecha/fecha.component';
import { ProductoComponent } from './components/pages/producto/producto.component';
import { RecetaComponent } from './components/pages/receta/receta.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      {
        path: 'content', component: ContentComponent,
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'beneficiarios', component: BeneficiarioComponent },
          { path: 'comercios', component: ComercioComponent },
          { path: 'fechas', component: FechaComponent },
          { path: 'productos', component: ProductoComponent },
          { path: 'recetas', component: RecetaComponent },
        ]
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/main/content/home' },
  { path: '**', pathMatch: 'full', redirectTo: '/main/content/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


