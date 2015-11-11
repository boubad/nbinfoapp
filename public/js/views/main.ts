// main.ts
///
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
		.globalResources(['js/resources/nav-bar', 'js/resources/connect-bar', 'js/resources/person-bar',
			'js/resources/sheader-bar', 'js/resources/work-bar', 'js/resources/pagination-bar', 'js/resources/avatar-bar',
			'js/resources/command-bar', 'js/resources/elements-bar', 'js/resources/siglename-bar',
			'js/resources/interval-bar','js/resources/depart-bar','js/resources/depannee-bar',
			'js/resources/depunite-bar','js/resources/import-bar']);
  aurelia.start().then(a => a.setRoot('./js/views/app'));
}
