import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

// imports mikael
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { FlexLayoutModule } from "@angular/flex-layout";

// components
import { UsuarioComponent } from './usuario/usuario.component';
import { TurmaComponent } from './turma/turma.component';
import { FaculdadeComponent } from './faculdade/faculdade.component';
import { CursoComponent } from './curso/curso.component';

// socketIo
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const socketConfig: SocketIoConfig = { url: environment.url, options: {} };

//Locale do Brasil
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ConfirmDialogComponent } from './_components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { LoginComponent } from './_components/login/login.component';
registerLocaleData(localept, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    TurmaComponent,
    FaculdadeComponent,
    CursoComponent,
    ConfirmDialogComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    SocketIoModule.forRoot(socketConfig),
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
