import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService,private postsService:PostsService, private router: Router) { }
  userIsAuthenticated = false;
  userName:string;
  userEmail:string;
  fullName:string;
  authListenerSubs:any;
  isLoading:boolean;
  isLoadingfromServer:any;
  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log("this.userIsAuthenticated", this.userIsAuthenticated)
    this.userName = this.authService.getUserName();
    console.log("this.userName", this.userName);
    this.userEmail = this.authService.getUserEmail();
    console.log("UserEmail",this.userEmail);
    this.fullName = this.authService.getUserFullName();
    console.log("fullName",this.fullName)
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userName = this.authService.getUserName();
    this.fullName = this.authService.getUserFullName();
      });

    this.isLoadingfromServer = true;
    var profile = this.authService.getProfile();
    console.log("++++++++++++++++++",profile)
    if(profile == "null" || "assets/images/default.png"){
      this.url =  'assets/images/default.png';
    }
    console.log("url : ",this.url)
  }
  url :any
  viewProfile(){
    console.log("view profile")
    this.router.navigate(["/profile"]);
  }
  onLogout() {
    this.authService.logout();
  }
  addPost(){
    console.log("adding post");
    this.postsService.postImage();
    // this.postsService.getUsers();

    
  }

  editProfile(){
    this.router.navigate(["/edit"]);
  }

 
 
 
}