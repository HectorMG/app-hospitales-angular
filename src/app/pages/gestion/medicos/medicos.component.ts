import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Medico } from 'src/app/models/Medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[];
  public medicosTemp: Medico[];

  public busqueda: string;
  public imgSubs: Subscription;


  constructor(private medicosService:MedicosService, private busquedaService: BusquedasService, private imagenModalService: ModalImagenService){}


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerMedicos();

    this.imgSubs = this.imagenModalService.nuevaImagen.pipe(
      delay(1000)
    ).subscribe(img=>{
      this.obtenerMedicos();
    })
  }

  obtenerMedicos(){
    this.medicosService.obtenerMedicos().subscribe(
      ({medicos}) =>{
        this.medicos = medicos;
        this.medicosTemp = medicos;
      }
    );
  }

  buscarMedico(){

    if (this.busqueda.length===0) {
      this.medicos = this.medicosTemp;
      return;
    }

    this.busquedaService.buscarColeccion('medicos',this.busqueda).subscribe(
      medicos=>{
        this.medicos = medicos
      }
    )
  }

  eliminarMedico(medico: Medico) {

    this.medicosService.eliminarMedico(medico).subscribe(
      ()=>{
        this.obtenerMedicos();
        Swal.fire('Eliminado', medico.nombre, 'success')
      }
    );

  }

  abrirModal(medico: Medico) {
    this.imagenModalService.abrirModal('medicos',medico._id,medico.img);
  }

}
