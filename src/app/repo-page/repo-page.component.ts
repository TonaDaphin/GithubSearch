import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Repo} from '../repoclass/repo';
import { User } from '../userclass/user';
import { environment } from 'src/environments/environment';
import { InfoRequestService } from '../info-http/info-service.service';

@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.css']
})
export class RepoPageComponent implements OnInit {

  user: User;
  repos: Repo[];
  show=false;
  showRepository(){
    this.show=true;
    // this.infoService.repoNameRequest(this.repoName);
    this.repos=this.infoservice.repos;
  }

  constructor(private http: HttpClient,
    private infoservice:InfoRequestService
    ) { }

  ngOnInit() {
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
