interface _HospitalUsuario {
    uid:string,
    nombre:string,
    img?:string
}

export class Hospital{

    constructor(
        public nombre: string,  
        public _id?: string,    
        public img?: string,
        public usuario?: _HospitalUsuario,
    ){}   
}