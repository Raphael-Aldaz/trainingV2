import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from '../apiService/apiService';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  userList : User[] = [];
  error = "";
  isConnected = false;
  constructor(private authService : ApiService) { }

  isAdmin() :any {
    for(let user of this.userList){
      if(user.role === 'admin') {
        return true;
      } else {
        return false;
      }
    }

  }

  getUser(email: string, password: string) { {
    this.authService.getUserByEmailAndPassword(email, password)
    .subscribe({
      next: (data) =>{
        this.userList = data
        this.isConnected = true;
        console.log(this.isConnected);
        localStorage.setItem('User', JSON.stringify(this.userList))
      },
      error: (error) => (this.error = error.message),
      complete: () => (this.error = ''),}
    )
  }
  }

  disconnectUser() {
  this.isConnected=false
  localStorage.removeItem('User');
  this.userList = []
  }

}