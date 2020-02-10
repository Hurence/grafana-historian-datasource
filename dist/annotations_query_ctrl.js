'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HistorianAnnotationsQueryCtrl = exports.HistorianAnnotationsQueryCtrl = function HistorianAnnotationsQueryCtrl() {
  _classCallCheck(this, HistorianAnnotationsQueryCtrl);

  this.annotation.type = this.annotation.type || 'tags';
  this.annotation.limit = this.annotation.limit || 100;
  this.types = [{ text: 'All', value: 'all' }, { text: 'Tags', value: 'tags' }];
};

HistorianAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
//# sourceMappingURL=annotations_query_ctrl.js.map
