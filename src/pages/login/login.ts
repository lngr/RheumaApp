import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from "../../security/auth.service";
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../home/home';

//import { ForgottenPasswordPage } from '../forgotten-password/forgotten-password';
//import { SignupPage } from '../signup/signup';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public loading: boolean = false;
  public errorMessage: string = "";
  public form: FormGroup;
  public username = new FormControl("", Validators.required);
  public password = new FormControl("", Validators.required);


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _authService: AuthService, fb: FormBuilder, private translate: TranslateService) {

      if(this._authService.isLoggedIn()){
        console.log("I'm already logged in")
        this.navCtrl.setRoot(HomePage)
      }

      this.form = fb.group({
          'username': this.username,
          'password': this.password,
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /*

  */
  login(){
    this.errorMessage = "";
    this.loading = true;
    const formValue = this.form.value;

    //this._authService.login(formValue.username, formValue.password)
    this._authService.login("HVL", "ncRvOMpNLICQ4WJw")
        .subscribe(
            res => {
                if (res) {
                    this.navCtrl.setRoot(HomePage)
                      .catch(() => {
                        this.translate.get('login.error2').subscribe(
                          value => this.setError(value)
                        );
                      })
                }else{
                  this.translate.get('login.error1').subscribe(
                    value => this.setError(value)
                  );
                }

            },
            err => {
              this.translate.get('login.error3').subscribe(
                value => this.setError(value + " " + err)
              );
            }
          );
  }

  navForgotten(){
    //this.navCtrl.setRoot(ForgottenPasswordPage)
    //  .catch(() => this.setError("You do not have access"))
    window.location.href = "http://www.rheuma-online.de/forum/login.php?do=lostpw";

  }

  navSignup(){
    //this.navCtrl.setRoot(SignupPage);
    //window.location.href = "http://www.rheuma-online.de/forum/register.php";


    this._authService.logInByStoredCredentials()
      .subscribe(
        res => {
            if (res) {
                this.navCtrl.setRoot(HomePage);
            }else{
              this.setError("Wrong username or password");
            }

        },
        err => this.setError("Server error logging in: " + err)
      );


  }

  public setError(error: string): void {
      this.loading = false;
      this.errorMessage = error;
  }

}
