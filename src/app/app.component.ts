import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Events } from "ionic-angular";
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = HomePage;
	constructor(platform: Platform, 
		statusBar: StatusBar,
		splashScreen: SplashScreen, 
		private androidPermissions: AndroidPermissions, 
		private events: Events,
		private admobFree: AdMobFree) {
		platform.ready().then(() => {

			setTimeout(() => {
				const bannerConfig: AdMobFreeBannerConfig = {
					isTesting: false,
					autoShow: true,
					id: 'ca-app-pub-4549938660772103/8879927279',
				};
				this.admobFree.banner.config(bannerConfig);
	
				this.admobFree.banner.prepare()
					.then((res) => {
						console.log(res);
					})
					.catch(e => console.log(e));
			});

			statusBar.styleLightContent();
			splashScreen.hide();
			this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
				.then(res => {
					events.publish("my:event", {});
				})
				.catch(err => {
					console.log(err);
				});
		});
	}
}
