import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OdontologosService } from './odontologos.service';
import { OdontologoDTO } from './dto/odontologos.dto';

@Controller('api/v1/odontologos')
export class OdontologosController {
    constructor(private readonly odontologosServicio:OdontologosService){}
//llamada al controlados para insertar
    @Post()
    insertar(@Body() odontologoDTO:OdontologoDTO){
        return this.odontologosServicio.Insertar(odontologoDTO);
    }
    @Get()
    todos(){
        return this.odontologosServicio.todos();
    }
    @Get(':id')
    uno(@Param('id') id:string){
        return this.odontologosServicio.uno(id);
    }
    @Put(':id')
    actualizar(@Param('id') id:string, @Body() odontologoDTO:OdontologoDTO){
        return this.odontologosServicio.actualizar(id, odontologoDTO);
    }

    @Delete(':id')
    eliminar(@Param('id') id:string){
        return this.odontologosServicio.eliminar(id);
    }
}
