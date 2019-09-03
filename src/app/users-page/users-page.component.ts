import { Component, OnInit } from '@angular/core';
import { User } from '../userclass/user';
import { Repo} from '../repoclass/repo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { InfoRequestService } from '../info-http/info-service.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  user: User;
  repo: Repo[];
  constructor(private http:HttpClient,
    private infoservice:InfoRequestService
    ) { }

  ngOnInit() {}
    searchUser(newUser:string){
    interface ApiRes{
          login: string;
          avatar_url: any;
          followers: number;
          following: number;
          created_at: Date;
          public_repos: number;
        }
        this.http.get<ApiRes>("https://api.github.com/users/"+newUser+"?access_token="+(environment.pass)).subscribe(data=> {
              this.user = new User( data.login,data.avatar_url, data.followers, data.following, data.public_repos, data.created_at)
            })
  }
  
}
