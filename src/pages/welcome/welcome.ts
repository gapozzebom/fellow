import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import Firebase from 'firebase'

import { TabsPage } from '../tabs/tabs';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public menu: MenuController, private fb:Facebook) { }
	userProfile: any = null;
  doLogin(){


	  this.fb.login(["email"]).then((loginResponse) => {

			let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken);

		  	firebase.auth().signInWithCredential(credential).then((info) => {
				alert(JSON.stringify(info));
			})
	  })
/*
	  this.fb.login(['email']).then( (response) => {
	   const facebookCredential = firebase.auth.FacebookAuthProvider
		   .credential(response.authResponse.accessToken);

	   firebase.auth().signInWithCredential(facebookCredential)
	   .then((success) => {
		   console.log("Firebase success: " + JSON.stringify(success));
		   this.userProfile = success;
	   })
	   .catch((error) => {
		   console.log("Firebase failure: " + JSON.stringify(error));
	   });

   }).catch((error) => { console.log(error) });


	  this.fb.login(["email"])
	  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
	  .catch(e => console.log('Error logging into Facebook', e));
*/

	  this.navCtrl.setRoot(TabsPage);
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    //this.menu.enable(true);
  }

}
