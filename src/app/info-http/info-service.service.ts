import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { User } from '../userclass/user';
import{ Repo} from '../repoclass/repo';



@Injectable({
  providedIn: 'root'
})
export class InfoRequestService {

user: User;
  repos:Repo[];

  constructor(private http:HttpClient) {
    this.user= new User("","", 0,0,0,new Date);
    this.repos= [];
   }
   searchUser(newUser:string){
    interface ApiRes{
      login:string;
      avatar_url: string;
      public_repos: number;
      followers: number;
      following:number;
      created_at: Date;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiRes>("https://api.github.com/users/" +newUser+"?access_token=" +environment.pass).toPromise().then(response=>{
        this.user.username = response.login;
        this.user.avatar = response.avatar_url;
        this.user.repos = response.public_repos;
        this.user.followers = response.followers;
        this.user.following = response.following;
        this.user.createdDate = response.created_at;

        resolve()
      },
      error=>{
        reject(error)
      })
    })
    return promise
  }

  displayRepo(newUser:string) {
    interface ApiRes{
      name: string;
      description: string;
      homepage: string;
    }
    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiRes>("https://api.github.com/users/"+newUser+"/repos?access_token="+(environment.pass)).subscribe(response=> {
        for(let i=0;i<response["length"];i++){
          let newRepo= new Repo("","","");
          newRepo.repoName = response[i].name;
          newRepo.description = response[i].description;
          newRepo.livelink = response[i].homepage;
          this.repos.push(newRepo);
        }
        resolve();
      },error=>{
        reject(error);
      })
    })
    return promise;
  }
}
