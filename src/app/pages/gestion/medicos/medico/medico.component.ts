import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, pipe } from 'rxjs';
import { Hospital } from 'src/app/models/Hospital.model';
import { Medico } from 'src/app/models/Medico.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {


  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;


  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalesService,
     private medicoService: MedicosService,
     private router: Router,
     private activatedRouter: ActivatedRoute){

  }

  ngOnInit(): void {

    this.obtenerHospitales();

    this.medicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.activatedRouter.params.subscribe(
      ({id}) => this.cargarMedico(id)
    );


    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        this.hospitalSeleccionado =  this.hospitales.find(h => h._id == hospitalId)
      }
    );

  }

  cargarMedico(id: string){

    if (id==='nuevo') {
      return;
    }

    this.medicoService.obtenerMedico(id).pipe(delay(100)).subscribe(
      ( medico ) => {
        const {nombre, hospital} = medico;
        console.log(hospital);
        this.medicoSeleccionado = medico 
        this.medicoForm.setValue({nombre, hospital})
      }
    );
  }

  obtenerHospitales(){
    this.hospitalService.obtenerHospitales().subscribe(
      ({hospitales})=>{
        this.hospitales = hospitales
      }
    );
  }

  guardarMedico(){

    if (this.medicoSeleccionado) {

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data).subscribe(
        (resp) => {
          Swal.fire('Actualizado', this.medicoForm.get('nombre').value, 'success');
          this.router.navigateByUrl('/dashboard/medicos');
        }
      );  
    }else{
      this.medicoService.crearMedico(this.medicoForm.value).subscribe(
        (resp) => {
          Swal.fire('Creado', this.medicoForm.get('nombre').value, 'success');
          this.router.navigateByUrl('/dashboard/medicos');
        }
      );
    }
  }
}
