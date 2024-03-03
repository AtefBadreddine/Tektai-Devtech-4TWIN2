import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UsersService } from 'src/users/users.service'; 
import { HashService } from '../services/hash.service';
// Assurez-vous que le chemin est correct

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);
  constructor(
    private readonly usersService: UsersService,
     private readonly hashService: HashService,

  ) {
    super({
      clientID: '7efefb71654da4d15244',
      clientSecret: '21ac105a6e1697a32abb4d40de391e300ca00dfd',
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: [ 'user:email' ],
    });
  }
async validate(accessToken: string, refreshToken: string, profile: any) {
 

  // Utilisez la propriété appropriée du profil comme identifiant unique
  const email = profile._json.email;
console.log(profile);
  // Vérifiez si le nom d'utilisateur est présent, sinon utilisez l'e-mail comme nom d'utilisateur
  const username = profile._json.login || email;
  console.log('Username: ', username);

  // Vérifiez si l'utilisateur existe déjà dans votre base de données
  const user = await this.usersService.findByUsername(username);

  // Si l'utilisateur n'existe pas, créez-en un nouveau
  if (!user) {
    // Créez un nouvel utilisateur avec les informations du profil GitHub
    return null;
  }

  // Retournez l'utilisateur créé ou trouvé
  return user;
}

}
