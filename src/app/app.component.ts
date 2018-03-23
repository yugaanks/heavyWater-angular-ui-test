import { Component} from '@angular/core';
import { Auth } from 'app/login/auth.service';
import { DataService } from 'app/shared/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public search_term: string = "";
  
  constructor(private router: Router,private data: DataService,private auth: Auth) { 
    this.data.load();
  }

  logout() {
    this.auth.logout();
  }
  
  refresh(){
    window.location.reload();
    console.log('Refreshing')
  }

  trySearching(inputTextValue) {
    this.data.getSearchTerm(inputTextValue);
  }

}
