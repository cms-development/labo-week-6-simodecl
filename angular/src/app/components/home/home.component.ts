import { OAuth } from './../../models/oauth';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public username: '';
  public password: '';
  public authData: OAuth;

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }

  public async login(username, password): Promise<void> {
    try {
      const data = {
        username: username,
        password: password,
        client_id: '671c1a41-66db-48af-baac-1c81b0392dea',
        client_secret: 'secret',
        grant_type: 'password'
      };
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        formData.append(key, data[key]);
      }
      const authResponse = await this.authService.login<OAuth>(formData);
      console.log(authResponse);
      this.authData = authResponse;

      localStorage.setItem('access_token', this.authData.access_token);
      localStorage.setItem('refresh_token', this.authData.refresh_token);
      this.router.navigate(['/students']);
    } catch (error) {
      console.error(error);
    }
  }
}

