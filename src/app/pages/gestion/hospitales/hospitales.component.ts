import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/Hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[];
  public total: number = 0;
  public desde: number = 0;

  public imgSubs: Subscription;


  constructor(private hospitalesService: HospitalesService, private imagenModalService: ModalImagenService){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.obtenerHospitales();

    this.imgSubs = this.imagenModalService.nuevaImagen.pipe(
      delay(1000)
    ).subscribe(img=>{
      this.obtenerHospitales();
    })
  }

  obtenerHospitales(){
    this.hospitalesService.obtenerHospitales(this.desde).subscribe(
      ({hospitales, total}) => {
        this.total = total
        this.hospitales = hospitales;
      }
    );
  }

  actualizarHospital(hospital:Hospital){
    this.hospitalesService.actualizarHospital(hospital).subscribe(
      (resp)=>{
        Swal.fire('Actualizado', hospital.nombre, 'success')
      },
      (error)=>{
        Swal.fire('Error', error.error.errors.nombre.msg, 'error')
      }
    );
  }

  eliminarHospital(hospital:Hospital){
    this.hospitalesService.eliminarHospital(hospital).subscribe(
      (resp)=>{
        this.obtenerHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success')
      }
    );
  }

  cambiarPagina(valor: number){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }else if(this.desde > this.total){
      this.desde -= valor;
    }  

    this.obtenerHospitales()
  }

  async abrirSweetAlert(){
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      showCancelButton: true,
      inputPlaceholder: 'Nombre Hospital'
    })

    if (value.trim().length>0) {
      this.hospitalesService.crearHospital(value).subscribe(
        (resp) => {
          this.obtenerHospitales();
          Swal.fire('Creado', value, 'success')
        }
      );
    }
    
  }

  abrirModal(hospital: Hospital){
    this.imagenModalService.abrirModal('hospitales',hospital._id,hospital.img);
  }

}
