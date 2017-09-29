import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  regUser = new User();
  logUser = new User();
  allQuestions = [];
  randQuestion;
  random = 0;


  constructor(private _httpService: HttpService, private router: Router)
  {

  }

  ngOnInit()
  {
      this.getAllQuestions()
  }

  getAllQuestions() {
    this._httpService.getAllQuestions()
      .then((questions) => { this.allQuestions = questions;
          this.random = Math.floor((Math.random() * this.allQuestions.length));
          this.randQuestion = this.allQuestions[this.random];
          console.log("Random number:" + this.random);
          console.log(this.randQuestion);
       })
      .catch((err) => { console.log(err); });
  }

  register()
  {
  this._httpService.getSession()
      .then(user => {console.log("The session should print here:" + user.id)})
      .catch(err => {console.log("Session find errors should print here: " + err)})

    this._httpService.addUser(this.regUser)
        .then(user => this.router.navigate(['/browse']))
        .catch(err => {console.log(err)});
    this.regUser = new User();
  }

  login()
  {
  this._httpService.getSession()
      .then(user => {console.log("The session should print here:" + user.id)})
      .catch(err => {console.log("Session find errors should print here: " + err)})

    console.log("Login function firing...")
    console.log(this.logUser);
    this._httpService.findUser(this.logUser)
        .then(user => this.router.navigate(['/browse']))
        .catch(err => {console.log("Check user name and password")})
  }

}
