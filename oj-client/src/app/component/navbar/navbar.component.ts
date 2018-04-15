import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Online Judge System';

  username = '';

  searchBox: FormControl = new FormControl();

  subscription: Subscription;

  constructor(@Inject('auth') private auth,
              @Inject('input') private input,
              private router: Router) { }

  profile: any;
  ngOnInit() {
    if(this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }

    this.subscription = this.searchBox.valueChanges
      .debounceTime(500)
      .subscribe(term => {
        this.input.changeInput(term);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem(): void {
    this.router.navigate(['/problems']);
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

}
