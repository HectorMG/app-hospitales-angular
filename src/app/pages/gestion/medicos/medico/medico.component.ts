import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/Hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {


  public medicoForm: FormGroup;
  public hospitales: Hospital[];
  public hospitalSeleccionado: Hospital;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalesService, private medicoService: MedicosService){

    this.medicoForm = this.formBuilder.group({
      nombre: ['House', Validators.required],
      hospital: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.obtenerHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe(
      hospitalId => {
        this.hospitalSeleccionado =  this.hospitales.find(h => h._id == hospitalId)
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

    this.medicoService.crearMedico(this.medicoForm.value).subscribe(
      (resp) => {
        console.log(resp);
      }
    );
  }

}
