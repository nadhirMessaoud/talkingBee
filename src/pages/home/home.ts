import { Component, NgZone } from '@angular/core';
import { News } from '../../models/news';
import { Platform, NavController } from 'ionic-angular';
import { isObject, isString } from 'ionic-angular/util/util';
import { JsonPipe } from '@angular/common';
import { Type } from '@angular/compiler/src/output/output_ast';
declare var ApiAIPromises: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  answer;
  whatever;
  question;
  data = {};
  myId = '12345';
  messagesList : any[];
  isIOS: boolean;
  hideTime: boolean = true;
  cardItems: any[];
  newsArray: any[];
  currentNews: News[];
  constructor(public navCtrl: NavController,public platform: Platform, public ngZone: NgZone) {
    this.messagesList = new Array();
    platform.ready().then(() => {

      ApiAIPromises.init({
        clientAccessToken: "89d9fb760010419ebd2a5c99f4105e9a"
      })
        .then((result) => console.log(result))

    });



/*     let tmp :[{ "source": { "id": null, "name": "Lefigaro.fr" },
     "author": null, 
     "title": "Sciences Po Paris à son tour bloquée par une centaine d'étudiants", 
     "description": "Le blocage de Sciences Po Paris a été voté mardi soir lors d’une assemblée générale qui rassemblait entre 70 et 250 personnes selon les versions. Les manifestants contestent la réforme d’accès à l’université et la politique «néolibérale et raciste» du gouvern…", 
     "url": "http://etudiant.lefigaro.fr/article/sciences-po-paris-a-son-tour-bloquee-par-les-etudiants_2e9e6910-42d8-11e8-a18c-14c960e64307/", 
     "urlToImage": "http://i.f1g.fr/media/eidos/805x453_crop/2018/04/18/XVMd02dbdbc-42d8-11e8-a18d-c12fdf4e8e03.jpg", "publishedAt": "2018-04-18T08:55:14Z" }, 
     { "source": { "id": "le-monde", "name": "Le Monde" }, 
     "author": "Philippe Mesmer", 
     "title": "Shinzo Abe à Mar-a-Lago pour relancer la « diplomatie du golf »", 
     "description": "En visite aux Etats-Unis, le premier ministre japonais est marginalisé dans les négociations sur la Corée du Nord.", 
     "url": "http://www.lemonde.fr/international/article/2018/04/18/shinzo-abe-a-mar-a-lago-pour-relancer-la-diplomatie-du-golf_5286954_3210.html", 
     "urlToImage": "http://s1.lemde.fr/image/2018/04/18/644x322/5286952_3_60aa_le-premier-ministre-japonais-shinzo-abe-et-le_574c0143dd04776f73dfa47c38ed4696.jpg", 
     "publishedAt": "2018-04-18T08:41:00Z" }, 
     { "source": { "id": null, "name": "Lefigaro.fr" }, 
     "author": "Albert Zennou", 
     "title": "Immigration : Wauquiez propose de revoir le droit du sol", 
     "description": "LE SCAN POLITIQUE - Invité de RTL, le patron des Répubicains a fait des propositions fortes pour « réduire au minimum l'immigration».", "url": "http://www.lefigaro.fr/politique/le-scan/2018/04/18/25001-20180418ARTFIG00103-immigration-wauquiez-propose-de-revoir-le-droit-du-sol.php", 
     "urlToImage": "http://i.f1g.fr/media/figaro/805x453_crop/2018/04/18/XVMa66ca3ee-1547-11e8-9898-ffd1d10f0b1e.jpg", 
     "publishedAt": "2018-04-18T08:39:10Z" }];
this.newsArray = tmp;
 */


  }


  slideChanged(index) {
    console.log(index);

    if (index > 0) {
      this.whatever = 'not-first-slide';
      console.log("not the first slide");
    }
    else {
      this.whatever = '';
      console.log("first slide");
    }
  }
  sendMessage() {
    var d = new Date();
    var dateNow = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    this.messagesList.push({
      userId: '12345' ,
      text: this.question,
      time: dateNow
    });
    delete this.question;
    
  }

  ask(question) {
   /*  var d = new Date();
    var dateNow = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    this.messagesList.push({
      userId: '12345' ,
      text: question,
      time: dateNow
    }); */
    console.log('Asking question: ' +question + '\n');
    var displayDate = new Date().toLocaleDateString();
    ApiAIPromises.requestText({
      query: question
    })
      .then(({ result: { fulfillment: { speech } } }) => {
        this.ngZone.run(() => {

          console.log('Responding speech : ' + speech + '\n');

          
         // var tmp = JSON.parse(speech);
          //console.log('Responding speech Object: ' +JSON.stringify(tmp) + '\n');
          if(speech.indexOf('{')<0){
          //this.answer = speech;
          this.messagesList.push({
            userId: '54321' ,
            text: speech,
            time: displayDate
          });
          //console.log('Responding answer: ' +this.answer + '\n');

        }else{
          this.messagesList.push({
            userId: '54321' ,
            text: 'There are my news for yOu !',
            time: displayDate
          });
          var tmp = JSON.parse(speech);
          this.newsArray = tmp.articles;

          //console.log('Responding answer: ' + JSON.stringify(speech) + '\n');
          document.getElementById('myHtml').innerHTML = 'card.html';
         
        }
          

        });
      })
  }


  inputUp() {


  }

  inputDown() {

  }

  openNews(item: News) {
    this.navCtrl.push('NewsDetailPage', {
      item: item
    });
  }

}