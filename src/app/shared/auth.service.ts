import { Login } from './../users/shared/login';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth
  ) { }


  login(login: Login){
    return this.afa.signInWithEmailAndPassword(login.email, login.password)
  }

}
