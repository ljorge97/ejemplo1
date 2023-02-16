import {  IsNotEmpty, IsString } from "class-validator";

export class OdontologoDTO{
    @IsNotEmpty()
   
    @IsString()
    Cedula:string;
    @IsNotEmpty()
    @IsString()
    Nombre:string;
    @IsNotEmpty()
    @IsString()
    Apellido:string;
    @IsNotEmpty()
    @IsString()
    FechaNacimiento:Date;
    @IsNotEmpty()
    @IsString()
    Especialidad:string;

}