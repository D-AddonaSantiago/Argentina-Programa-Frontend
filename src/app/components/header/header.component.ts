import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/service/token.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private modalService: NgbModal, private router: Router, private tokenService: TokenService) { }
  isLogged = false;
  logo = "https://firebasestorage.googleapis.com/v0/b/sdfrontend.appspot.com/o/APLogo.png?alt=media&token=f8d159cb-fb1a-44d2-a7be-bfd4f1a4567a";

  openPopup() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.componentInstance.id = 'Login';
  }

  ngOnInit(): void {
    this.isLogged = !!this.tokenService.getToken();
  }

  logout():void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login']);
  }
}
