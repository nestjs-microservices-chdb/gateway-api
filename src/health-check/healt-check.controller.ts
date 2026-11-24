import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealtCheckController {

  @Get()
  healthCheck() {
    return 'Client gateway is up and running!!!'
  }
}
