import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TurmaService, TurmaEntity } from '../_services/turma.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { UsuarioEntity, UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.scss']
})
export class TurmaComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'usuario', 'options'];
  public turmas: TurmaEntity[] = [];
  public usuarios: UsuarioEntity[] = [];

  public dataSource = new MatTableDataSource<TurmaEntity>();

  public errorMessage: string;
  public loading: boolean;

  public turma: TurmaEntity = new TurmaEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(
    private service: TurmaService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private socketClient: Socket) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de turmas
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.turmas = result as [];

      //Alimenta o datasource com os turmas
      this.dataSource.data = this.turmas;

      // alimenta o datasource com usuarios
      this.usuarioService.listarTodos().subscribe(result => {
        this.usuarios = result as [];
      })

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createTurma
    this.socketClient.fromEvent('createTurma').subscribe(result => {
      this.turmas.push(result as TurmaEntity)
      this.dataSource.data = this.turmas;
    })

    //Listner do evento deleteTurma
    this.socketClient.fromEvent('deleteTurma').subscribe(result => {
      let turma = result as TurmaEntity;
      let index = this.turmas.findIndex( item => item.id == turma.id);

      this.turmas.splice(index, 1);

      this.dataSource.data = this.turmas;
    })

    //Listner do evento createTurma
    this.socketClient.fromEvent('updateTurma').subscribe(result => {
      let turma = result as TurmaEntity;
      let index = this.turmas.findIndex( item => item.id == turma.id);

      this.turmas[index] = turma;

      this.dataSource.data = this.turmas;
    })
  }

    /**
   * Função responsável por carregar um item no select, comparando
   * os dois parametros se possuem ID's identicos. 
   * 
   * @param item1 
   * @param item2 
   */
  public compareOptions(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.turma).subscribe(result => {

      //Deu tudo certo, então avise o usuário...
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3500
      });

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Não foi possível salvar o registro!', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, 
      //oculta a barra de progresso...
      this.loading = false;

      //... e fecha a sidenav com o formulário
      this.sidenav.close();
    })
  }

  /**
   * Chama a janela de confirmação de exclusão, se usuário confirmar
   * chama evento de exclusão da service.
   * 
   * @param turma 
   */
  public excluir(turma: TurmaEntity): void {
    
    //Mostra a janela modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: new ConfirmDialogOption('Excluir Registro', 'Deseja realmente exluir o registro?', 'warn')
    });

    //Depois de fechado (clicado em cancelar ou confirmar)...
    dialogRef.afterClosed().subscribe(result => {
      
      //Se confirmou, exclui o registro
      if (result) {
        this.service.excluir(turma.id).subscribe(result => {
          
          //Deu certo, avisa o usuário...
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3500
          });

        }, error => {
          
          //Se ocorreu algum erro neste processo, mostra mensagem para usuário
          this.showError('Não foi possível excluir o registro!', error);

        }).add(() => {
          
          //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
          this.loading = false;

        });
      }
    });
  }

  /**
   * Abre o formulário com um novo cliente para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new TurmaEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param turma
   */
  public editar(turma: TurmaEntity): void {
    //Como turma é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(turma));
  }

  /**
   * Função responsável por mostrar uma mensagem de erro padrão.
   * @param text
   * @param error 
   */
  private showError(text: string, error: any): void {
    //Mostra a snackbar com fundo customizado (vermelho)
    this.snackBar.open(text, '', {
      duration: 5000,
      panelClass: 'snakWarn'
    });

    //Adiciona a mensagem de erro no painel de erro
    this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
  }

  /**
   * Dá um open na sidnav exibindo o formulário com os dados 
   * da objeto passado por parâmetro.
   * 
   * @param turma 
   */
  private openSidenav(turma: TurmaEntity): void {
    this.turma = turma;
    this.sidenav.open();
  }

}
