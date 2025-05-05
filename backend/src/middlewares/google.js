import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { FRONTEND_URL } from '../config/constants.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://api.roteirus.com.br/auth/google/callback', 
}, (_, __, profile, done) => {
  // Aqui você pode verificar ou criar o usuário no banco de dados
//   console.log(profile);
  return done(null, profile); // Salva a informação do usuário no req.user
}));

// Serializa o usuário na sessão
passport.serializeUser((user, done) => {
  done(null, user);
});

// Desserializa o usuário da sessão
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Middleware para iniciar o processo de autenticação com o Google
export const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

// Middleware de callback do Google
export const googleCallback = passport.authenticate('google', { failureRedirect: `${FRONTEND_URL}/login` });
