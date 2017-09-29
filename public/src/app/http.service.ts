import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs";

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  addUser(user)
  {
    return this._http.post('/addUser', user).map(data => data.json()).toPromise();
  }

  findUser(user)
  {
    return this._http.post('/findUser', user).map(data => data.json()).toPromise();
  }

  getSession()
  {
    console.log("Within http service check session method.")
    return this._http.get('/getSession').map(data => data.json()).toPromise();
  }
  addQuestion(question)
  {
    console.log("Add question method in http service firing...");
    return this._http.post('/addquestion', question).map(data => data.json()).toPromise();
  }
  getAllQuestions()
  {
    console.log("Getting all questions http service firing...");
    return this._http.get('/getAllQuestions').map(data => data.json()).toPromise();
  }
  getMyQuestions(userId)
  {
    console.log("Getting users Questions http service firing...");
    return this._http.post('/getMyQuestions', {userId: userId}).map(data => data.json()).toPromise();
  }
  findCreator(creatorId){
      console.log("Getting contact info http service firing...");
      return this._http.post('/findCreator', {creatorId: creatorId}).map(data => data.json()).toPromise();
  }
  removeQuestion(questionid)
  {
      return this._http.post("/removeQuestion", {questionid: questionid}).map(data => data.json()).toPromise();
  }

  updateQuestion(question)
  {
      return this._http.post("/updateQuestion", {question: question}).map(data => data.json()).toPromise();
  }

  logout(userId){
    return this._http.get("/logout").map(data => data.json()).toPromise();
  }

}
