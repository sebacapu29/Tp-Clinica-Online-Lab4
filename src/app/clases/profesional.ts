import { Usuario } from './usuario';
import { Especialidad } from './especialidad';
import { Jornada } from './jornada';

export class Profesional extends Usuario {
    especialidad:Especialidad;
    jornada:Jornada;
    dias:string;
}
