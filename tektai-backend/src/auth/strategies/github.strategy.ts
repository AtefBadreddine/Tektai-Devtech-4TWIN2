import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { UsersService } from 'src/users/users.service'; // Assurez-vous que le chemin est correct

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(GithubStrategy.name);
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: '7efefb71654da4d15244',
      clientSecret: '21ac105a6e1697a32abb4d40de391e300ca00dfd',
      callbackURL: 'http://localhost:3000/auth/github/callback', // Remplacez par votre URL de rappel
    });
  }
async validate(accessToken: string, refreshToken: string, profile: any) {
  console.log('Profile received from GitHub: ', profile);

  // Utilisez la propriété appropriée du profil comme identifiant unique
  const email = profile._json.email;

  // Vérifiez si le nom d'utilisateur est présent, sinon utilisez l'e-mail comme nom d'utilisateur
  const username = profile._json.login || email;
  console.log('Username: ', username);

  // Vérifiez si l'utilisateur existe déjà dans votre base de données
  let user = await this.usersService.findByEmail(email);
  console.log('User found by email: ', user);

  // Si l'utilisateur n'existe pas, créez-en un nouveau
  if (!user) {
    // Créez un nouvel utilisateur avec les informations du profil GitHub
    user = await this.usersService.createUser({
      email: email,
      username: username,
      password: "", // Vous pouvez gérer cela de manière appropriée dans votre application
      phoneNumber: "",
      bio: "",
      birthday: "",
      companyName: "",
      adresse: "",
      role: ""
    });
  }
console.log('Profile received from GitHub: ', profile);
  // Retournez l'utilisateur créé ou trouvé
  return user;
}

}
