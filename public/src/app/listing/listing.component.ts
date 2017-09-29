import { Component, OnInit } from '@angular/core';
import { Question } from "../question";
import { User } from "../user";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  question = new Question();
  myQuestions = [];
  userId: string;

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit()
    {
        this._httpService.getSession()
          .then((user) => {console.log(user)
          this.userId = user._id;
          this.getMyQuestions(this.userId);
            })
          .catch((err) => { console.log(err); });

    }

    getMyQuestions(userId) {
        this._httpService.getMyQuestions(userId)
        .then((questions) => { this.myQuestions = questions; })
        .catch((err) => { console.log(err); });
    }

    delete(questionId){
        this._httpService.removeQuestion(questionId)
        .then(()=>{
            this.getMyQuestions(this.userId);
        });

    }

  newQuestion()
    {
    this._httpService.addQuestion(this.question)
    .then(()=>{
        this.getMyQuestions(this.userId);
    });
    this.question = new Question();
    }

  update(idx){
     this._httpService.updateQuestion(this.myQuestions[idx])
     .then(()=>{
        this.getMyQuestions(this.userId);
           })
     .catch((err) => { console.log(err); });
  }


}
