import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
// import {
//   CognitoIdentityProviderClient,
//   DescribeUserPoolCommand,
// } from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthenticateRequestDto } from './dto/authenticate.request.dto';
import { ConfirmSignupRequestDto } from './dto/confirmSignup.request.dto';
import { LogoutRequestDto } from './dto/logout.request.dto';
import { RedirectRequestDto } from './dto/redirect.request.dto';
import { ResendCodeRequestDto } from './dto/resendCode.request.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async register(authRegisterRequest: RegisterRequestDto) {
    const { name, email, password } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticate(user: AuthenticateRequestDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async confirmSignup(confirmSignupRequest: ConfirmSignupRequestDto) {
    const { confirmationCode, username } = confirmSignupRequest;
    const poolData = {
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser(userData);
      console.log('cognitoUser', cognitoUser);
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async resendCode(resendCodeRequestDto: ResendCodeRequestDto) {
    const { username } = resendCodeRequestDto;
    const poolData = {
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser(userData);
      console.log('cognitoUser', cognitoUser);
      cognitoUser.resendConfirmationCode((err, result) => {
        console.log(result);
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      // cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve(result);
      //   }
      // });
    });
  }

  async logout() {
    // console.log('logout');
    const poolData = {
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    };
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      // console.log('cognitoUser', cognitoUser);
      if (cognitoUser != null) {
        cognitoUser.signOut();
        resolve('success');
      } else {
        reject('error');
      }
    });
  }

  async globalSignOut(logoutRequest: LogoutRequestDto) {
    const { username } = logoutRequest;
    const poolData = {
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser(userData);
      console.log('cognitoUser', cognitoUser);
      cognitoUser.globalSignOut({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        // cognitoUser.signOut();
        // resolve('success');
      });
    });
  }

  async redirect(redirectRequest: RedirectRequestDto) {
    const { idToken, accessToken, expiresIn } = redirectRequest;
    // console.log(idToken);
    // const obj = {
    //   idToken,
    //   accessToken,
    //   expiresIn,
    // }
    return new Promise((resolve, reject) => {
      if (redirectRequest) {
        resolve('success');
      } else {
        reject('error');
      }
    });
  }
}
