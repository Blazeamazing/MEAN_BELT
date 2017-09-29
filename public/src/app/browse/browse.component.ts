import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
    allQuestions = [];
    userId: string;

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
      this.getAllQuestions();
      this._httpService.getSession()
        .then((user) => {console.log(user)
        this.userId = user._id; })
        .catch((err) => { console.log(err); });

    }

    getAllQuestions() {
      this._httpService.getAllQuestions()
        .then((questions) => { this.allQuestions = questions; })
        .catch((err) => { console.log(err); });
    }
    contact(creatorId){
        console.log(creatorId);
        this._httpService.findCreator(creatorId)
            .then((contact)=>{console.log("Question was created by " + contact)
            alert(contact.firstname + ":  " + contact.email)
                })
            .catch((err) => {
                console.log("Can't find question listing creator!!" + err);
                });

    }
    delete(questionId){
        this._httpService.removeQuestion(questionId)
        .then(()=>{this.getAllQuestions()});

    }
    logout(userId){
        this._httpService.logout(userId)

    }
}
