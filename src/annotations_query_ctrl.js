export class HistorianAnnotationsQueryCtrl {
  constructor() {    
    this.annotation.type = this.annotation.type || 'tags';
    this.annotation.limit = this.annotation.limit || 100;
  }
}
HistorianAnnotationsQueryCtrl.types = [
  { text: 'All', value: 'all' },
  { text: 'Tags', value: 'tags' }
];
HistorianAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';