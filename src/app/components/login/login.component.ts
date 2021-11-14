import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(event){
    event.preventDefault();
    let data = {
        "email": this.email,
        "password": this.password,
        "device": "Front-Angular"

    }
    this.authService.login(data).subscribe(item => {
      if (item['message'] === 'Success') {
        this.authService.setToken(item['token']);
        this.router.navigate(['home']); // Esto es temporal hasta que se pueda hacer con autenticación
      }else{
       console.log("error in login"); 
      }
        
    })
  }

}
