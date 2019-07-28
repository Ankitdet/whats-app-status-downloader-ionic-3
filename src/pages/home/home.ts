import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoPage } from './../photo/photo';
import { VideoPage } from './../video/video';
import { AboutPage } from './../about/about';
import { File, DirectoryEntry } from '@ionic-native/file';
import { Events } from "ionic-angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


declare let window: any;
declare let cordova: any;
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	files = [];
	videos = [];
	constructor(public navCtrl: NavController, private file: File, private events: Events, private socialSharing: SocialSharing) {
		this.events.subscribe("my:event", res => {
			this.readFiles();
		});
	}

	readFiles() {
		const p = `file:///storage/emulated/0/WhatsApp/Media/.Statuses`;
		this.file.resolveLocalFilesystemUrl(p)
			.then((directoryEntry: DirectoryEntry) => {
				console.log(directoryEntry);
				const directoryReader = directoryEntry.createReader();
				directoryReader.readEntries(files => {
					files.forEach(ff => {
						if (ff.nativeURL.indexOf('.jpg') > -1) {
							this.files.push(ff.nativeURL);
						} else {
							this.videos.push(ff.nativeURL);
						}
					});
				});
			});
	}

	photoPage() {
		this.navCtrl.push(PhotoPage, this.files);
	}

	videoPage() {
		this.navCtrl.push(VideoPage, this.videos);
	}

	aboutPage() {
		this.navCtrl.push(AboutPage);
	}

	privacyPage() {
		window.open('http://keepnote.cc/privacy-policy-wa-downloader');
	}

	shareApp() {
		window.plugins.socialsharing.share(
			'Status Downloader',
			'Please share application with your friends and family.',
			'https://lh3.googleusercontent.com/OwlCwefxLTbOk2T5n3n2zf5CDTP4YWLHjN1XpyFF2jPWbQS1G3VkwalzsR242bo_1Aw=s180-rw',
			'https://play.google.com/store/apps/details?id=io.ubiq.wastatusdownloader')
	}

	rateApp() {
		window.open('https://play.google.com/store/apps/details?id=io.ubiq.wastatusdownloader');
	}

}
