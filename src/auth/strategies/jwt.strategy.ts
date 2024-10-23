import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// The JWT strategy will extract the JWT from incoming requests and validate it.
// If the token is valid, it will allow access to protected routes.

// Integration: Integrate this strategy to manage route access based on the JWT token.
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, email: payload.email };
  }
}
