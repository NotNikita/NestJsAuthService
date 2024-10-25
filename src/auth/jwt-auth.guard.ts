import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

// Extract token from cookies
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = request.cookies['access_token'];
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  }
}
