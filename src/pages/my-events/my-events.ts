import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MyEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {

	userEvents: any = null;
	userProfile: any = null;
	token: string = 'EAASLHElQskkBAOXVtHzZBYEZB3qf5xiylRIdqQMyd8igBjsb8lHKZBhXnGfJP86FExgwtdlfrc0dxWGugQsZBOI5LG06ZBfZApUFhRFyaLULiZBQUwwN6J84u6ZAcwimXQ297MMfSpRCnUUpfAwOAyQqcZB5wDvJDBpJX2I32DhPj8OgH6Lxk1bBGClPI3GMo2DgZD';

  constructor(public navCtrl: NavController,
	  			public navParams: NavParams,
				private fb: Facebook,
				private alertCtrl: AlertController,
				private http: Http) {
  }


  private graphUrl = 'https://graph.facebook.com/';
  private graphQuery = `me?access_token=${this.token}&fields=events{cover,name}`;

  getPosts(): Observable<any[]> {
    let url = this.graphUrl +  this.graphQuery;

    return this.http
        .get(url)
        .map(response => response.json().events.data);
   }

  ionViewDidLoad() {
	  this.fb.api('me?fields=events{cover,name}&access_token=' + this.token, null).then((info) => {
		  this.userEvents = info;
	  });

	  if (this.userEvents != null){
		let alert = this.alertCtrl.create({
		  title: 'objects',
		  subTitle: this.userEvents,
		  buttons: ['API']
		});
		alert.present();
	}

	this.userEvents = this.getPosts();
	if (this.userEvents != null){
	  let alert = this.alertCtrl.create({
		title: 'objects',
		subTitle: this.userEvents,
		buttons: ['Get']
	  });
	  alert.present();
  }

    console.log('ionViewDidLoad MyEventsPage');
  }

}
