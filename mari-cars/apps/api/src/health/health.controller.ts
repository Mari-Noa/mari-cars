import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

@Controller('health')
export class HealthController {
  constructor(@InjectConnection() private readonly db: Connection) {}

  /** Liveness: the process is up. Used by the container/Kubernetes liveness probe. */
  @Get('live')
  live() {
    return { status: 'ok' };
  }

  /** Readiness: dependencies are reachable. Failing this removes the instance from traffic. */
  @Get('ready')
  ready() {
    if (this.db.readyState !== 1) throw new ServiceUnavailableException('database not connected');
    return { status: 'ready' };
  }
}
