import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CursoService, CursoEntity } from '../_services/curso.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { TurmaEntity, TurmaService } from '../_services/turma.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'nome', 'turma', 'options'];
  public cursos: CursoEntity[] = [];
  public turmas: TurmaEntity[] = [];

  public dataSource = new MatTableDataSource<CursoEntity>();

  public errorMessage: string;
  public loading: boolean;

  public curso: CursoEntity = new CursoEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(
    private service: CursoService,
    private turmaService: TurmaService,
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

    //Carrega a lista de cursos
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.cursos = result as [];

      //Alimenta o datasource com os cursos
      this.dataSource.data = this.cursos;

      // alimenta o datasource com usuarios
      this.turmaService.listarTodos().subscribe(result => {
        this.turmas = result as [];
      })

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createCurso
    this.socketClient.fromEvent('createCurso').subscribe(result => {
      this.cursos.push(result as CursoEntity)
      this.dataSource.data = this.cursos;
    })

    //Listner do evento deleteCurso
    this.socketClient.fromEvent('deleteCurso').subscribe(result => {
      let curso = result as CursoEntity;
      let index = this.cursos.findIndex( item => item.id == curso.id);

      this.cursos.splice(index, 1);

      this.dataSource.data = this.cursos;
    })

    //Listner do evento createCurso
    this.socketClient.fromEvent('updateCurso').subscribe(result => {
      let curso = result as CursoEntity;
      let index = this.cursos.findIndex( item => item.id == curso.id);

      this.cursos[index] = curso;

      this.dataSource.data = this.cursos;
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
    this.service.salvar(this.curso).subscribe(result => {

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
   * @param curso 
   */
  public excluir(curso: CursoEntity): void {
    
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
        this.service.excluir(curso.id).subscribe(result => {
          
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
    this.openSidenav(new CursoEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param curso
   */
  public editar(curso: CursoEntity): void {
    //Como curso é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(curso));
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
   * @param curso 
   */
  private openSidenav(curso: CursoEntity): void {
    this.curso = curso;
    this.sidenav.open();
  }

}
