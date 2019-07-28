import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';

declare let window: any;

@Component({
	selector: 'page-video',
	templateUrl: 'video.html',
})
export class VideoPage {
	videos = [];
	index = 0;
	videosUrl = '';
	constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
		private file: File
		) {
		this.videos = this.navParams.data;

		const lastIndex = localStorage.getItem('videoIndex');

		console.log(lastIndex);
		
		if (lastIndex !== null && lastIndex !== undefined) {
			this.videosUrl = this.getTrustImg(this.videos[lastIndex]);
			this.index = parseInt(lastIndex);
		} else {
			this.videosUrl = this.getTrustImg(this.videos[0]);
		}

	}

	ionViewDidLoad() {
		let audioPlayer = <HTMLVideoElement>document.getElementById('myvideo');
		audioPlayer.src = this.videosUrl;
		audioPlayer.play();
	}

	getTrustImg(imageSrc) {
		const path = window.Ionic.WebView.convertFileSrc(imageSrc);
		return path;
	}

	nextVideo() {
		this.index++;
		localStorage.setItem('videoIndex', this.index+'');
		this.videosUrl = this.getTrustImg(this.videos[this.index]);
		let audioPlayer = <HTMLVideoElement>document.getElementById('myvideo');
		audioPlayer.src = this.videosUrl;
		audioPlayer.play();
	}

	download() {
		console.log(this.videos[this.index]);
		var filename = this.videos[this.index].split(/[\\\/]/).pop();		
		console.log(filename);
		const path = this.videos[this.index].substring(0, this.videos[this.index].lastIndexOf("/"));
		this.file.copyFile(path, filename, this.file.externalRootDirectory, filename)
		.then(res => {
			const toast = this.toastCtrl.create({
				message: 'Video downloaded successfully. Check your file manager root folder.',
				duration: 3000
			});
			toast.present();
		})
		.catch(err => {
			console.log(err);
			const toast = this.toastCtrl.create({
				message: 'Try again later.',
				duration: 3000
			});
			toast.present();
		});
	}

	prevVideo() {
		this.index--;
		localStorage.setItem('videoIndex', this.index+'');
		this.videosUrl = this.getTrustImg(this.videos[this.index]);
		let audioPlayer = <HTMLVideoElement>document.getElementById('myvideo');
		audioPlayer.src = this.videosUrl;
		audioPlayer.play();
	}
}
