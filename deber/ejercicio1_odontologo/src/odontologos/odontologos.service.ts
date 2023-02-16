import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOdontologos } from 'src/common/Interfaces/Odontologos.interface';
import { ODONTOLOGOS } from '../common/models/odontologos.models';

import { OdontologoDTO } from './dto/odontologos.dto';

@Injectable()
export class OdontologosService {
  constructor(
    @InjectModel(ODONTOLOGOS.name) private readonly odontologosmodelo: Model<IOdontologos>,
  ) {}

  async Insertar(odontologoDTO: OdontologoDTO): Promise<IOdontologos> {
    return await new this.odontologosmodelo(odontologoDTO).save();
  }
  async todos(): Promise<IOdontologos[]> {
    return await this.odontologosmodelo.find();
  }
  async uno(id: string): Promise<IOdontologos> {
    return await this.odontologosmodelo.findById(id);
  }

  async actualizar(id: string, oDTO: OdontologoDTO): Promise<IOdontologos> {
    return await this.odontologosmodelo.findByIdAndUpdate(id, OdontologoDTO, {
      new: true,
    });
  }
  async eliminar(id: string) {
    await this.odontologosmodelo.findByIdAndDelete(id);
    return {status: HttpStatus.OK, msg:"Se eliminó con éxito"}
  }
}
