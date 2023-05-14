import {Hospital} from './Hospital.model'

interface _usuarioMedico{
    _id:string,
    nombre:string,
    img?:string
}

export class Medico{

    public nombre: string;
    public _id?:string;
    public img?: string;
    public usuario: _usuarioMedico;
    public hospital?: Hospital;
}