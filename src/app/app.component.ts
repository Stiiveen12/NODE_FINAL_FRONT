import { FormularioComponent } from './formulario/formulario.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from './service/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Heroes';
  settings = {
    noDataMessage:'No se han encontrado datos',
    
    actions:{  
      delete:false,     
      add:false,     
      edit:false,     
      custom:[
     {name:'update',
     title:`Actualizar `
    },
    {name:'delete',
      title:`Eliminar`
     }
    ],
     position:'right',
    },
    columns: {
      _id: {
        hide:true
      },
      nombreHeroe: {
        title: 'Heroe',
        filter: true
      },
      poderes: {
        title: 'Poderes',
        filter: true
      }
    }
  };
  data:any=[]

  constructor(private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.service.getContact().subscribe(res=>{
      console.log(res)
      console.log('Hola')
      this.data=res
    },error=>{
      console.log(error)
    })
  }
  getContact(event:any){
    let datos = event.data
   switch (event.action) {
    case 'update':
     const dialogRef= this.dialog.open(FormularioComponent,{
        width: '500px',
        data:{datos}
      })
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit()
      });
      break;
      case 'delete':
      if(confirm('Estas seguro de eliminar este Heroes')){
      this.service.delete(event.data._id).subscribe(res=>{
        this._snackBar.open(res, 'Ok');
        this.ngOnInit()
      },error=>{
        this._snackBar.open(error, 'Ok');
      })}
      break;
   
     default:
       break;
   }
  }

  ventanaModal(){
    const dialogRef=  this.dialog.open(FormularioComponent,{
      width: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit()
        });
  }
}
