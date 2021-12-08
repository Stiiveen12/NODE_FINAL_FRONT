import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  form:FormGroup
  name='Agregar'
  
  constructor(public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder,private service:ServiceService,private _snackBar: MatSnackBar){
      this.form = this.fb.group({
        id:['',],
        nombreHeroe:['', Validators.required],
        poderes:['', Validators.required],
      })
    }

  ngOnInit(): void {
   if(this.data){
  this.name='Actualizar'
    this.form.setValue({
      id:this.data.datos._id,
      nombreHeroe:this.data.datos.nombreHeroe,
      poderes:this.data.datos.poderes,
      })
  }
}
 agregar(){
  let id =this.form.value.id
  const body =new HttpParams()
  .set('nombreHeroe',this.form.value.nombreHeroe)
  .set('poderes',this.form.value.poderes)
  if(this.data){
    this.service.update(body,id).subscribe(res=>{
    this.dialogRef.close();
      this._snackBar.open('Heroes actualizado','',{
        duration: 5 * 1000,
      })
    }, error=>{
      this._snackBar.open('Error al actualizar' ,'',{
        duration: 5 * 1000,
      })      
    })
  }else{
    this.service.agregar(body).subscribe(res=>{
    this.dialogRef.close();
      this.ngOnInit()
      this._snackBar.open('Heroes agregado','',{
        duration: 5 * 1000,
      })
    },
    error=>{
      console.log(error)
      this._snackBar.open('este registro no se pudo agregar','',{
        duration: 5 * 1000,
      })

    })
  }
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
