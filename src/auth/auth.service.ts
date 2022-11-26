import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserEntity } from 'src/components/user/user.entity';
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user: UserEntity;

    try {
      user = await this.usersService.findOneOrFail({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(data: UserEntity) {
    try {
      const user = await this.usersService.findOneOrFail({ email: data.email });
      const payload = {
        email: user.email,
        sub: user.id,
        role: user.groupId,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
