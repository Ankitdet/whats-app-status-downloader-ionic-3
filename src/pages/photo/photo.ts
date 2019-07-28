import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

declare let window: any;

@Component({
	selector: 'page-photo',
	templateUrl: 'photo.html',
})
export class PhotoPage {
	files = [];
	constructor(public navCtrl: NavController, public navParams: NavParams,
		private transfer: FileTransfer, private file: File,
		private toastCtrl: ToastController
		) {
		this.files = this.navParams.data;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PhotoPage');
	}

	getTrustImg(imageSrc) {
		const path = window.Ionic.WebView.convertFileSrc(imageSrc);
		return path;
	}

	download(url) {
		window.cordova.plugins.imagesaver.saveImageToGallery(url, success => {
			const toast = this.toastCtrl.create({
				message: 'Photo downloaded successfully',
				duration: 3000
			});
			toast.present();
		}, error => {
			const toast = this.toastCtrl.create({
				message: 'Try again later.',
				duration: 3000
			});
			toast.present();
		});
	}
}
