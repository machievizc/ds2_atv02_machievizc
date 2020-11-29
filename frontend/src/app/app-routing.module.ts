import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso/curso.component';
import { FaculdadeComponent } from './faculdade/faculdade.component';
import { TurmaComponent } from './turma/turma.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './_components/login/login.component';

import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'turmas',
    component: TurmaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faculdades',
    component: FaculdadeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cursos',
    component: CursoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
