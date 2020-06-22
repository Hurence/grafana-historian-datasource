/*! For license information please see module.js.LICENSE.txt */
define(["react","@grafana/ui","@grafana/data","@grafana/runtime"],(function(e,t,n,r){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=27)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t,n){var r=n(13).Symbol;e.exports=r},function(e,t,n){var r=n(12);e.exports=function(e){return null==e?"":r(e)}},function(e,t){e.exports=r},function(e,t,n){var r=n(7)((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=r},function(e,t,n){var r=n(8),a=n(9),o=n(23),i=RegExp("['’]","g");e.exports=function(e){return function(t){return r(o(a(t).replace(i,"")),e,"")}}},function(e,t){e.exports=function(e,t,n,r){var a=-1,o=null==e?0:e.length;for(r&&o&&(n=e[++a]);++a<o;)n=t(n,e[a],a,e);return n}},function(e,t,n){var r=n(10),a=n(4),o=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,i=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=a(e))&&e.replace(o,r).replace(i,"")}},function(e,t,n){var r=n(11)({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=r},function(e,t){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},function(e,t,n){var r=n(3),a=n(16),o=n(17),i=n(18),u=r?r.prototype:void 0,l=u?u.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(o(t))return a(t,e)+"";if(i(t))return l?l.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}},function(e,t,n){var r=n(14),a="object"==typeof self&&self&&self.Object===Object&&self,o=r||a||Function("return this")();e.exports=o},function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n(15))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length,a=Array(r);++n<r;)a[n]=t(e[n],n,e);return a}},function(e,t){var n=Array.isArray;e.exports=n},function(e,t,n){var r=n(19),a=n(22);e.exports=function(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==r(e)}},function(e,t,n){var r=n(3),a=n(20),o=n(21),i=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?a(e):o(e)}},function(e,t,n){var r=n(3),a=Object.prototype,o=a.hasOwnProperty,i=a.toString,u=r?r.toStringTag:void 0;e.exports=function(e){var t=o.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(e){}var a=i.call(e);return r&&(t?e[u]=n:delete e[u]),a}},function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},function(e,t,n){var r=n(24),a=n(25),o=n(4),i=n(26);e.exports=function(e,t,n){return e=o(e),void 0===(t=n?void 0:t)?a(e)?i(e):r(e):e.match(t)||[]}},function(e,t){var n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(n)||[]}},function(e,t){var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return n.test(e)}},function(e,t){var n="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",r="["+n+"]",a="\\d+",o="[\\u2700-\\u27bf]",i="[a-z\\xdf-\\xf6\\xf8-\\xff]",u="[^\\ud800-\\udfff"+n+a+"\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]",l="(?:\\ud83c[\\udde6-\\uddff]){2}",s="[\\ud800-\\udbff][\\udc00-\\udfff]",c="[A-Z\\xc0-\\xd6\\xd8-\\xde]",f="(?:"+i+"|"+u+")",p="(?:"+c+"|"+u+")",g="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",m="[\\ufe0e\\ufe0f]?"+g+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",l,s].join("|")+")[\\ufe0e\\ufe0f]?"+g+")*"),d="(?:"+[o,l,s].join("|")+")"+m,h=RegExp([c+"?"+i+"+(?:['’](?:d|ll|m|re|s|t|ve))?(?="+[r,c,"$"].join("|")+")",p+"+(?:['’](?:D|LL|M|RE|S|T|VE))?(?="+[r,c+f,"$"].join("|")+")",c+"?"+f+"+(?:['’](?:d|ll|m|re|s|t|ve))?",c+"+(?:['’](?:D|LL|M|RE|S|T|VE))?","\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",a,d].join("|"),"g");e.exports=function(e){return e.match(h)||[]}},function(e,t,n){"use strict";n.r(t);var r=n(2),a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};function o(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};function u(e,t,n,r){return new(n||(n=Promise))((function(a,o){function i(e){try{l(r.next(e))}catch(e){o(e)}}function u(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}l((r=r.apply(e,t||[])).next())}))}function l(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}function s(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i}function c(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(s(arguments[t]));return e}var f=n(5),p=function(e){function t(t){var n=e.call(this,t)||this;return n.url=t.url,n.backendSrv=Object(f.getBackendSrv)(),n.max_number_of_metric_to_return=t.jsonData.max_number_of_metric_to_return||50,n.withCredentials=t.withCredentials,n.headers={"Content-Type":"application/json"},"string"==typeof t.basicAuth&&t.basicAuth.length>0&&(n.headers.Authorization=t.basicAuth),n}return o(t,e),t.prototype.query=function(e){return u(this,void 0,Promise,(function(){var n,r;return l(this,(function(a){return n=this.buildHistorianQueryRequest(e),r=this.buildHttpRequest(this.url+t.API_QUERY_SUFFIX,"POST",n,e.requestId),[2,this.backendSrv.datasourceRequest(r).then((function(e){return e.data})).then(this.convertQueryRespToGrafanaFormat.bind(this,e)).then((function(e){return{data:e}}))]}))}))},t.prototype.buildHttpRequest=function(e,t,n,r){var a={url:e,headers:this.headers,method:t,withCredentials:this.withCredentials};return void 0!==n&&(a.data=n),void 0!==r&&(a.requestId=r),a},t.prototype.convertQueryRespToGrafanaFormat=function(e,t){return t.map((function(e){var t=new r.MutableDataFrame({name:e.name,refId:e.refId,fields:[{name:"time",type:r.FieldType.time},{name:e.name,labels:e.tags,type:r.FieldType.number}]});return e.datapoints.forEach((function(n){var r={};r.time=n[1],r[e.name]=n[0],t.add(r)})),t}))},t.prototype.buildHistorianQueryRequest=function(e){var t=e.range,n=t.from.toISOString(),r=t.to.toISOString(),a=e.targets.map((function(e){var t={};return t.name=e.name,i(i({},t),{tags:e.tags,sampling:e.sampling})})),o=e.maxDataPoints,u=e.targets.find((function(e){return void 0!==e.sampling}));return{from:n,to:r,names:a,format:"json",max_data_points:o,tags:{},sampling:null==u?void 0:u.sampling}},t.prototype.testDatasource=function(){return u(this,void 0,void 0,(function(){return l(this,(function(e){return[2,this.backendSrv.datasourceRequest(this.buildHttpRequest(this.url+"/","GET")).then((function(e){return 200===e.status?{status:"success",message:"Success"}:{status:"error",message:"Error could not join datasource"}}))]}))}))},t.prototype.getMetricNames=function(e){return u(this,void 0,Promise,(function(){return l(this,(function(t){return[2,this.searchValues(i({field:"name",limit:20},{query:e})).catch((function(e){return console.error(e),[]}))]}))}))},t.prototype.getTagNames=function(e){return u(this,void 0,Promise,(function(){return l(this,(function(t){return[2,this.searchTagNames(i({limit:20},{query:e})).catch((function(e){return console.error(e),[]}))]}))}))},t.prototype.getValuesForTagName=function(e,t){return u(this,void 0,Promise,(function(){return l(this,(function(n){return[2,this.searchValues(i({field:e,limit:20},{query:t})).catch((function(e){return console.error(e),[]}))]}))}))},t.prototype.searchValues=function(e){return u(this,void 0,Promise,(function(){var n;return l(this,(function(r){return n=this.buildHttpRequest(this.url+t.API_SEARCH_VALUES_SUFFIX,"POST",e),[2,this.backendSrv.datasourceRequest(n).then((function(e){return e.data}))]}))}))},t.prototype.searchTagNames=function(e){return u(this,void 0,Promise,(function(){var n;return l(this,(function(r){return n=this.buildHttpRequest(this.url+t.API_SEARCH_TAG_NAMES_SUFFIX,"POST",e),[2,this.backendSrv.datasourceRequest(n).then((function(e){return e.data}))]}))}))},t.API_QUERY_SUFFIX="/query",t.API_SEARCH_VALUES_SUFFIX="/search/values",t.API_SEARCH_TAG_NAMES_SUFFIX="/search/tags",t}(r.DataSourceApi),g=n(0),m=n.n(g),d=n(1),h=d.LegacyForms.FormField,v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onAPIKeyChange=function(e){var n=t.props,r=n.onOptionsChange,a=n.options;r(i(i({},a),{secureJsonData:{apiKey:e.target.value}}))},t.onResetAPIKey=function(){var e=t.props,n=e.onOptionsChange,r=e.options;n(i(i({},r),{secureJsonFields:i(i({},r.secureJsonFields),{apiKey:!1}),secureJsonData:i(i({},r.secureJsonData),{apiKey:""})}))},t.onMaxNumberOfMetricTiReturnChange=function(e){var n=t.props,r=n.onOptionsChange,a=n.options,o=i(i({},a.jsonData),{max_number_of_metric_to_return:parseInt(e.target.value,10)});r(i(i({},a),{jsonData:o}))},t.updateDataSourceSettings=function(e){var n=t.props,r=n.onOptionsChange,a=n.options,o=i(i({},a),e);r(i(i({},a),o))},t}return o(t,e),t.prototype.render=function(){var e=this.props.options,t=e.jsonData;return m.a.createElement("div",{className:"gf-form-group"},m.a.createElement("div",{className:"gf-form"},m.a.createElement(d.DataSourceHttpSettings,{defaultUrl:"http://historienserver:port/api/grafana/v0",dataSourceConfig:e,onChange:this.updateDataSourceSettings,showAccessOptions:!0})),m.a.createElement("div",{className:"gf-form"},m.a.createElement(h,{label:"Max search metric",labelWidth:10,inputWidth:20,onChange:this.onMaxNumberOfMetricTiReturnChange,value:t.max_number_of_metric_to_return||"",placeholder:"Enter a number",tooltip:"The mximum number of metric name to return when filling metric name in query editors"})))},t}(g.PureComponent),y=n(6),b=n.n(y),x=function(e){function t(t){var n=e.call(this,t)||this;return n.onTagKeyChange=function(e){n.props.onUpdateTagElem(n.props.index,{tagKey:e.value||"",tagValue:n.props.tag.tagValue})},n.onTagValueChange=function(e){n.props.onUpdateTagElem(n.props.index,{tagKey:n.props.tag.tagKey,tagValue:e.value||""})},n.onDeleteTag=function(){n.props.onRemoveTagElement(n.props.index)},n.loadTagValues=function(e){return n.props.getTagValues(n.props.tag.tagKey,e)},n.loadTagNames=function(e){return n.props.getTagNames(e)},n}return o(t,e),t.prototype.render=function(){return m.a.createElement("div",{className:"gf-form"},m.a.createElement(d.HorizontalGroup,{align:"center",wrap:!1},m.a.createElement(d.Field,{label:"Name",description:"Tag name"},m.a.createElement(d.AsyncSelect,{loadOptions:this.loadTagNames,value:{label:this.props.tag.tagKey,value:this.props.tag.tagKey},onChange:this.onTagKeyChange,loadingMessage:"Searching metrics..."})),m.a.createElement(d.Field,{label:"Value",description:"Tag value"},m.a.createElement(d.AsyncSelect,{loadOptions:this.loadTagValues,value:{label:this.props.tag.tagValue,value:this.props.tag.tagValue},onChange:this.onTagValueChange,loadingMessage:"Searching metrics..."})),m.a.createElement(d.IconButton,{onClick:this.onDeleteTag,name:"trash-alt",size:"md",tooltip:"Remove tag",iconType:"default"})))},t}(m.a.Component),T=function(e){function t(t){var n=e.call(this,t)||this;return n.AddTagButton=function(){return m.a.createElement(d.IconButton,{onClick:n.props.onAddNewTagElement,tooltip:"Add new tag filter",name:"plus",size:"xxl",surface:"panel"})},n.RemoveAllTagButton=function(){return m.a.createElement(d.IconButton,{onClick:n.props.onClearTags,tooltip:"Remove all tags",name:"trash-alt",size:"xxl",surface:"panel"})},n}return o(t,e),t.prototype.render=function(){var e=this,t=this.props.tags;if(void 0===t||0===t.length)return m.a.createElement(this.AddTagButton,null);var n=t.map((function(t,n){return m.a.createElement(x,{key:n,index:n,tag:t,onUpdateTagElem:e.props.onUpdateTagElem,onRemoveTagElement:e.props.onRemoveTagElement,getTagValues:e.props.getTagValues,getTagNames:e.props.getTagNames})}));return m.a.createElement("div",null,m.a.createElement(d.HorizontalGroup,{align:"center",wrap:!0},n,m.a.createElement(this.AddTagButton,null),m.a.createElement(this.RemoveAllTagButton,null)))},t}(m.a.Component),E=[{label:"default",value:1},{label:"100",value:100},{label:"250",value:250},{label:"500",value:500},{label:"1000",value:1e3},{label:"10000",value:1e4}],S=[],A=[{label:"default",value:"NONE"},{label:"average",value:"AVERAGE"},{label:"first",value:"FIRST_ITEM"},{label:"min",value:"MIN"},{label:"max",value:"MAX"}],_=function(e){function t(t){var n,r=e.call(this,t)||this;r.onMetricNameChange=function(e){var t=r.props,n=t.onChange,a=t.query;n(i(i({},a),{name:e.value||""}))},r.onSamplingAlgorithmChange=function(e){var t,n=r.props,a=n.onChange,o=n.query;a(i(i({},o),{sampling:{algorithm:e.value,bucket_size:null===(t=o.sampling)||void 0===t?void 0:t.bucket_size}}))},r.onBucketSizeChange=function(e){var t,n=r.props,a=n.onChange,o=n.query;a(i(i({},o),{sampling:{algorithm:null===(t=o.sampling)||void 0===t?void 0:t.algorithm,bucket_size:e.value}})),r.setState((function(t){var n=void 0!==e.value&&e.value>0;return i(i({},t),{isBuketSizeInvalid:!n})}))},r.onBucketSizeAddCustomOptions=function(e){S.push({label:b()(e),value:Number(e)})},r.onClearTags=function(){r.setState((function(e){return r.updateTagInQuery([]),i(i({},e),{tagList:[]})}))},r.onUpdateTagElem=function(e,t){r.setState((function(n){var a=n.tagList.map((function(n,r){return r===e?i(i({},n),{tagKey:t.tagKey,tagValue:t.tagValue}):n}));return r.updateTagInQuery(a),i(i({},n),{tagList:a})}))},r.onAddNewTagElement=function(){r.setState((function(e){return{tagList:c(e.tagList,[{tagKey:"",tagValue:""}])}}))},r.onRemoveTagElement=function(e){r.setState((function(t){var n=t.tagList.filter((function(t,n){return e!==n}));return r.updateTagInQuery(n),i(i({},t),{tagList:n})}))};var a=null===(n=r.props.query.sampling)||void 0===n?void 0:n.bucket_size,o=r.buildTagList(r.props.query.tags||{}),u=!1;return void 0!==a&&a<0&&(u=!0),r.state={tagList:o,isBuketSizeInvalid:u},r}return o(t,e),t.prototype.buildTagList=function(e){return Object.keys(e).map((function(t){return{tagKey:t,tagValue:e[t]}}))},t.prototype.buildTagObjectFromState=function(e){if(void 0!==e){var t={};return e.forEach((function(e){t[e.tagKey]=e.tagValue})),t}},t.prototype.updateTagInQuery=function(e){var t=this.props,n=t.onChange,r=t.query;n(i(i({},r),{tags:this.buildTagObjectFromState(e)}))},t.prototype.getMetricNames=function(e){return u(this,void 0,Promise,(function(){return l(this,(function(t){return console.error("metricNameInput",e),[2,this.props.datasource.getMetricNames(e).then((function(e){return e.map((function(e){return{label:e,value:e}}))}))]}))}))},t.prototype.getTagNames=function(e){return u(this,void 0,Promise,(function(){return l(this,(function(t){return[2,this.props.datasource.getTagNames(e).then((function(e){return e.map((function(e){return{label:e,value:e}}))}))]}))}))},t.prototype.getTagValues=function(e,t){return u(this,void 0,Promise,(function(){return l(this,(function(n){return[2,this.props.datasource.getValuesForTagName(e,t).then((function(e){return e.map((function(e){return{label:e,value:e}}))}))]}))}))},t.prototype.getBucketSizeValue=function(){var e,t,n;return void 0!==(null===(e=this.props.query.sampling)||void 0===e?void 0:e.bucket_size)?{label:null===(t=this.props.query.sampling)||void 0===t?void 0:t.bucket_size.toString(),value:null===(n=this.props.query.sampling)||void 0===n?void 0:n.bucket_size}:{label:"default",value:0}},t.prototype.getSamplingAlgoValue=function(){var e,t,n;return void 0!==(null===(e=this.props.query.sampling)||void 0===e?void 0:e.bucket_size)?{label:null===(t=this.props.query.sampling)||void 0===t?void 0:t.algorithm,value:null===(n=this.props.query.sampling)||void 0===n?void 0:n.algorithm}:{label:"default",value:"NONE"}},t.prototype.getNameValue=function(){var e;return void 0!==(null===(e=this.props.query.sampling)||void 0===e?void 0:e.bucket_size)?{label:this.props.query.name,value:this.props.query.name}:{label:"",value:""}},t.prototype.render=function(){var e=this.getBucketSizeValue(),t=this.getSamplingAlgoValue(),n=this.getNameValue();return m.a.createElement("div",{className:"gf-form-group"},m.a.createElement(d.Legend,null,"Metric to target"),m.a.createElement("div",{className:"gf-form"},m.a.createElement(d.Field,{label:"Metric name",description:"The name of the metric"},m.a.createElement(d.AsyncSelect,{loadOptions:this.getMetricNames.bind(this),value:n,onChange:this.onMetricNameChange,loadingMessage:"Searching metrics..."}))),m.a.createElement("div",{className:"gf-form"},m.a.createElement(T,{tags:this.state.tagList,onUpdateTagElem:this.onUpdateTagElem,onRemoveTagElement:this.onRemoveTagElement,onAddNewTagElement:this.onAddNewTagElement,onClearTags:this.onClearTags,getTagValues:this.getTagValues.bind(this),getTagNames:this.getTagNames.bind(this)})),m.a.createElement("div",{className:"gf-form-group"},m.a.createElement(d.Legend,{description:"Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account."},"Sampling configuration"),m.a.createElement(d.HorizontalGroup,{align:"center"},m.a.createElement("div",{className:"gf-form"},m.a.createElement(d.Field,{label:"Algorithm",description:"Sampling algorithm"},m.a.createElement(d.Select,{options:c(A),value:t,onChange:this.onSamplingAlgorithmChange})),m.a.createElement(d.Tooltip,{content:"The sampling algorithm to use when there is too many points matching the query.Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account.",theme:"info"},m.a.createElement(d.Icon,{name:"info-circle",type:"default"}))),m.a.createElement("div",{className:"gf-form"},m.a.createElement(d.Field,{label:"Bucket size",description:"Bucket size"},m.a.createElement(d.Select,{options:c(E,S),value:e,onChange:this.onBucketSizeChange,invalid:this.state.isBuketSizeInvalid,allowCustomValue:!0,onCreateOption:this.onBucketSizeAddCustomOptions})),m.a.createElement(d.Tooltip,{content:"The bucket size to use when sampling datapoints (aggregate every bucket size points into 1).\n                 If bucket size is conflicting with max number of datapoints requested, it will be automatically\n                    recomputed so that there is at most <max datapoints> returned.Sampling option is common to all metrics at the moment, the sampling option of the first metric will be taken in account.",theme:"info"},m.a.createElement(d.Icon,{name:"info-circle"}))))))},t}(g.PureComponent);n.d(t,"plugin",(function(){return C}));var C=new r.DataSourcePlugin(p).setConfigEditor(v).setQueryEditor(_)}])}));
//# sourceMappingURL=module.js.map