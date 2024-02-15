var RptCustomGeoScript = {
	maxIterations : 5,
	lang : {
		'loading' : 'Loading...',
		'load_button_text' : 'Load results and select all',
		'select_only_button_text' : 'Only select results',
		'copy_html_text' : 'Copy results as HTML',
		'copy_json_text' : 'Copy results as JSON',
		'copy_csv_text' : 'Copy results for CSV',
		'results_copied_to_clipboard' : 'Results copied to clipboard!',
		'not_unique_avatar' : 'Not unique avatar',
		'round_1' : 'Round 1:',
		'round_2' : 'Round 2:',
		'round_3' : 'Round 3:',
		'round_4' : 'Round 4:',
		'round_5' : 'Round 5:',
		'round_6' : 'Total:'
	},
	init : function() {
		RptCustomGeoScript.addStyle();
		RptCustomGeoScript.addCopyButtons();
		RptCustomGeoScript.addButtons();
	},
	addStyle : function() {
		var style = document.createElement('style');
		style.appendChild(document.createTextNode(
			'.player_info {' + 
				'box-shadow: 0px 0px 5px 0px #000; height: 119px; line-height: 15px; z-index: 10000; display: none; position: relative;' + 
				'bottom: calc(100% + 129px); left: 0; background: #fff; color: #000; width: fit-content; padding: 5px; white-space: nowrap;'+ 
			'}' + 
			'.player_info .player_name { font-weight: bold; font-size: 14px; }' + 
			'.not_unique_player_info { box-shadow: 0px 0px 5px 0px #000; height: 15px; bottom: calc(100% + 25px); }'
		));
		style.appendChild(document.createTextNode(
			'.player_result_table { border: 0; border-spacing: 0; }' + 
			'.player_result_table td { line-height: 15px; text-align: right; border: 0; box-sizing: border-box; padding-left: 10px; }' + 
			'.player_result_table tr.round_6 td { border-top: 1px solid #000; }' + 
			'.player_result_table td.label { font-weight: bold; padding-left: 0; }'
		));
		style.appendChild(document.createTextNode(
			'.button_green {' +  
				'--loading-indicator-size: 1.75rem; --icon-size: 1.25rem; --vertical-padding: 0.75rem; --horizontal-padding: 1.5rem;' + 
				'--box-shadow: unset; --text-shadow: unset; background: #6cb928; border-radius: 3.75rem; cursor:pointer;margin: 0 5px;' + 
			    'box-shadow: 0 0.275rem 1.125rem rgba(0,0,0,.25),inset 0 0.0625rem 0 hsla(0,0%,100%,.2),inset 0 -0.125rem 0 rgba(0,0,0,.3);' + 
				'box-sizing: border-box; color: #fff; display: inline-block; font-family: neo-sans,sans-serif; font-size: 0.875rem; font-style: italic;' + 
			    'font-weight: 700; padding: 10px; position: relative; text-align: center; text-shadow: 0 0.0625rem 0.125rem #1a1a2e; text-transform: uppercase;' +
				'transition: transform .15s ease,background .15s ease; -webkit-user-select: none; -moz-user-select: none; user-select: none; will-change: transform;' + 
			'}'
		));
		style.appendChild(document.createTextNode(
			'.button_blue {' +  
				'--loading-indicator-size: 1.75rem; --icon-size: 1.25rem; --vertical-padding: 0.75rem; --horizontal-padding: 1.5rem;' + 
				'--box-shadow: unset; --text-shadow: unset; background: #286fb9; border-radius: 3.75rem; cursor:pointer;margin: 0 5px;' + 
			    'box-shadow: 0 0.275rem 1.125rem rgba(0,0,0,.25),inset 0 0.0625rem 0 hsla(0,0%,100%,.2),inset 0 -0.125rem 0 rgba(0,0,0,.3);' + 
				'box-sizing: border-box; color: #fff; display: inline-block; font-family: neo-sans,sans-serif; font-size: 0.875rem; font-style: italic;' + 
			    'font-weight: 700; padding: 10px; position: relative; text-align: center; text-shadow: 0 0.0625rem 0.125rem #1a1a2e; text-transform: uppercase;' +
				'transition: transform .15s ease,background .15s ease; -webkit-user-select: none; -moz-user-select: none; user-select: none; will-change: transform;' + 
			'}'
		));
		document.getElementsByTagName('head')[0].appendChild(style);
	},
	addButtons : function() {
		if(document.getElementById('RptCustomGeoScriptButtonContainer') !== null) {
			return false;
		}
		var div = document.createElement('div');
		div.setAttribute('style', '--columns:1;--gap:32;--xsColumns:1;margin-bottom: 15px; text-align: center;');
		div.setAttribute('id', 'RptCustomGeoScriptButtonContainer');
		// load results and select all
		var load_button = document.createElement('button');
		load_button.setAttribute('id', 'RptCustomGeoScriptLoadAndSelectButton');
		load_button.setAttribute('type', 'button');
		load_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.load_button_text));
		load_button.setAttribute('class', 'button_green');
		load_button.addEventListener('click', RptCustomGeoScript['loadResultsAndSelect']);
		div.appendChild(load_button);
		// select only button 
		var select_only_button = document.createElement('button');
		select_only_button.setAttribute('id', 'RptCustomGeoScriptSelectOnlyButton');
		select_only_button.setAttribute('type', 'button');
		select_only_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.select_only_button_text));
		select_only_button.setAttribute('class', 'button_green');
		select_only_button.addEventListener('click', RptCustomGeoScript['onlySelectResults']);
		div.appendChild(select_only_button);
		document.querySelectorAll('div[class^="results_gameInfo__"]').forEach(el => {
			el.prepend(div);
		});
	},
	addCopyButtons : function() {
		if(document.getElementById('RptCustomGeoScriptCopyButtonContainer') !== null) {
			return false;
		}
		var div = document.createElement('div');
		div.setAttribute('style', '--columns:1;--gap:32;--xsColumns:1;margin-bottom: 15px; text-align: center;');
		div.setAttribute('id', 'RptCustomGeoScriptCopyButtonContainer');
		// copy results as HTML
		var copy_result_as_html_button = document.createElement('button');
		copy_result_as_html_button.setAttribute('id', 'RptCustomGeoScriptCopyHTMLButton');
		copy_result_as_html_button.setAttribute('type', 'button');
		copy_result_as_html_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.copy_html_text));
		copy_result_as_html_button.setAttribute('class', 'button_blue');
		copy_result_as_html_button.addEventListener('click', RptCustomGeoScript['copyResultsAsHTML']);
		div.appendChild(copy_result_as_html_button);
		// copy results as JSON
		var copy_result_as_json_button = document.createElement('button');
		copy_result_as_json_button.setAttribute('id', 'RptCustomGeoScriptCopyJSONButton');
		copy_result_as_json_button.setAttribute('type', 'button');
		copy_result_as_json_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.copy_json_text));
		copy_result_as_json_button.setAttribute('class', 'button_blue');
		copy_result_as_json_button.addEventListener('click', RptCustomGeoScript['copyResultsAsJSON']);
		div.appendChild(copy_result_as_json_button);
		// copy results for CSV
		var copy_results_for_csv_button = document.createElement('button');
		copy_results_for_csv_button.setAttribute('id', 'RptCustomGeoScriptCopyCSVButton');
		copy_results_for_csv_button.setAttribute('type', 'button');
		copy_results_for_csv_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.copy_csv_text));
		copy_results_for_csv_button.setAttribute('class', 'button_blue');
		copy_results_for_csv_button.addEventListener('click', RptCustomGeoScript['copyResultsForCSV']);
		div.appendChild(copy_results_for_csv_button);
		document.querySelectorAll('div[class^="results_gameInfo__"]').forEach(el => {
			el.prepend(div);
		});
	},
	loadResultsAndSelect : function() {
		if(window.location.hostname !== 'www.geoguessr.com' && window.location.hostname !== 'geoguessr.com') {
			return false;
		}
		RptCustomGeoScript.disableLoadButton();
		RptCustomGeoScript.showAllResults(1);
	},
	onlySelectResults : function() {
		if(window.location.hostname !== 'www.geoguessr.com' && window.location.hostname !== 'geoguessr.com') {
			return false;
		}
		RptCustomGeoScript.select();
	},
	enableLoadButton : function() {
		var load_button = document.getElementById('RptCustomGeoScriptLoadAndSelectButton');
		load_button.disabled = false;
		load_button.style.setProperty('background', '#6cb928');
		childnodes = load_button.childNodes;
		for(var key in childnodes) {
			if(typeof childnodes[key] === 'object') {
				load_button.removeChild(childnodes[key]);
			}
		}
		load_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.load_button_text));
	},
	disableLoadButton : function() {
		var load_button = document.getElementById('RptCustomGeoScriptLoadAndSelectButton');
		load_button.disabled = true;
		load_button.style.setProperty('background', '#515151');
		childnodes = load_button.childNodes;
		for(var key in childnodes) {
			if(typeof childnodes[key] === 'object') {
				load_button.removeChild(childnodes[key]);
			}
		}
		load_button.appendChild(document.createTextNode(RptCustomGeoScript.lang.loading));
	},
	showAllResults : function(iteration) {
		if(iteration > RptCustomGeoScript.maxIterations) {
			console.log('too much recursion');
			RptCustomGeoScript.select();
			return false;
		}
		var show_more_button = document.querySelectorAll('button[class^="button_button__"]');
		if(show_more_button.length === 1) {
			show_more_button.forEach(el => {
				if(RptCustomGeoScript.hasClass(el, 'button_variantSecondary') && !RptCustomGeoScript.hasClass(el, 'button_loading')) {
					el.click();
					iteration++;
					setTimeout(function() { RptCustomGeoScript.showAllResults(iteration); }, 400);
				}
			});
		} else {
			RptCustomGeoScript.select();
			RptCustomGeoScript.enableLoadButton();
		}
	},
	select : function() {
		RptCustomGeoScript.selectResultRows();
		RptCustomGeoScript.selectFirstColumn();
		setTimeout(function() { RptCustomGeoScript.setNamesOnMap(); }, 2000);
	},
	copyResultsAsHTML : function() {
		navigator.clipboard.writeText(document.querySelector('div[class^="results_table__"]').outerHTML);
		alert(RptCustomGeoScript.lang.results_copied_to_clipboard);
	},
	copyResultsAsJSON : function() {
		var results = [];
		document.querySelectorAll('div[class^="results_row__"]').forEach(el => {
			if(!RptCustomGeoScript.hasClass(el, 'results_headerRow')) {
				var current_row_data = {};
				var i = 0;
				el.querySelectorAll('div[class^="results_column__"]').forEach(res_col_el => {
					var json_key = null;
					switch(i) {
						case 0:
							current_row_data['name'] = el.querySelectorAll('div[class^="user-nick_nick__"]')[0].innerText.trim();
							break;
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
							json_key = 'round_' + i;
							break;
						case 6:
							json_key = 'total';
							break;
						default:
							break;
					}
					if(json_key !== null) {
						var distance_and_time = res_col_el.querySelectorAll('div[class^="results_scoreDetails__"]')[0].innerText.split(' - ');
						current_row_data[json_key] = {
							'points' : res_col_el.querySelectorAll('div[class^="results_score__"]')[0].innerText.trim(),
							'distance' : typeof distance_and_time[0] !== 'undefined' ? distance_and_time[0].trim() : '',
							'time' : typeof distance_and_time[1] !== 'undefined' ? distance_and_time[1].trim() : '',
						};
					}
					i++;
				});
				results.push(current_row_data);
			}
		});
		navigator.clipboard.writeText(JSON.stringify(results));
		alert(RptCustomGeoScript.lang.results_copied_to_clipboard);
	},
	copyResultsForCSV : function() {
		var results = '"Name";';
		for(var i = 1; i < 6; i++) {
			results += '"Round ' + i + ' points";"Round ' + i + ' distance";"Round ' + i + ' time";';
		}
		results += '"Total points";"Total distance";"Total time"';
		results += "\r\n";
		document.querySelectorAll('div[class^="results_row__"]').forEach(el => {
			if(!RptCustomGeoScript.hasClass(el, 'results_headerRow')) {
				var i = 0;
				el.querySelectorAll('div[class^="results_column__"]').forEach(res_col_el => {
					switch(i) {
						case 0:
							results += '"' + el.querySelectorAll('div[class^="user-nick_nick__"]')[0].innerText.trim() + '";';
							break;
						case 1:
						case 2:
						case 3:
						case 4:
						case 5:
						case 6:
							var distance_and_time = res_col_el.querySelectorAll('div[class^="results_scoreDetails__"]')[0].innerText.split(' - ');
							results += '"' + res_col_el.querySelectorAll('div[class^="results_score__"]')[0].innerText.trim() + '";';
							results += '"' + (typeof distance_and_time[0] !== 'undefined' ? distance_and_time[0].trim() : '') + '";';
							results += '"' + (typeof distance_and_time[1] !== 'undefined' ? distance_and_time[1].trim() : '') + '";';
							break;
					}
					i++;
				});
				results += "\r\n";
			}
		});
		navigator.clipboard.writeText(results);
		alert(RptCustomGeoScript.lang.results_copied_to_clipboard);
	},
	selectFirstColumn : function() {
		var round_col_headers = document.querySelectorAll('div[class^="results_hideOnSmallScreen__"]');
		var has_selected_col = false;
		document.querySelectorAll('div[class^="results_hideOnSmallScreen__"]').forEach(el => {
			if(RptCustomGeoScript.hasClass(el, 'results_selectedColumn')) {
				has_selected_col = true;
				return false;
			}
			if(!has_selected_col) {
				el.click();
				has_selected_col = true;
			}
		});
	},
	setNamesOnMap : function() {
		var data_by_src = {};
		document.querySelectorAll('div[class^="results_row__"]').forEach(el => {
			if(!RptCustomGeoScript.hasClass(el, 'results_headerRow')) {
				var current_image = el.querySelectorAll('img[class^="styles_image__"]')[0];
				if(typeof current_image !== 'undefined') {
					if(typeof data_by_src[current_image.getAttribute('src')] !== 'undefined') {
						data_by_src[current_image.getAttribute('src')]['name'] += ' / ' + current_image.getAttribute('alt');
						data_by_src[current_image.getAttribute('src')]['unique'] = false;
						delete data_by_src[current_image.getAttribute('src')]['rounds'];
					} else {
						data_by_src[current_image.getAttribute('src')] = { 'name' : current_image.getAttribute('alt'), 'unique' : true, 'rounds' : {} };
						for(var i = 1; i < 7; i++) {
							var current_result = el.querySelectorAll('div[class^="results_column__"]')[i];
							if(typeof current_result !== 'undefined') {
								var distance = current_result.querySelectorAll('div[class^="results_scoreDetails__"]')[0].innerHTML.split(' - ');
								data_by_src[current_image.getAttribute('src')]['rounds']['round_' + i] = {
									'points' : current_result.querySelectorAll('div[class^="results_score__"]')[0].innerHTML,
									'time' : distance[1],
									'distance' : distance[0]
								};
							}
						}
					}
				}
			}
		});
		document.querySelectorAll('div[class^="map-pin_mapPin__"]').forEach(el => {
			el.setAttribute('style', 'position: relative;');
			el.addEventListener('mouseenter', RptCustomGeoScript['showPlayerInfo']);
			el.addEventListener('mouseleave', RptCustomGeoScript['hidePlayerInfo']);
			var map_image = el.querySelectorAll('img[class^="styles_image__"]')[0];
			if(typeof map_image !== 'undefined' && !RptCustomGeoScript.hasClass(map_image, 'styles_fitCover') && typeof map_image.getAttribute('src') !== 'undefined' && typeof data_by_src[map_image.getAttribute('src')] !== 'undefined') {
				var image_src = map_image.getAttribute('src');
				map_image.setAttribute('title', (data_by_src[image_src]['unique'] ? '' : RptCustomGeoScript.lang.not_unique_avatar + ' - ') + data_by_src[map_image.getAttribute('src')]['name']);
				var div = document.createElement('div');
				div.setAttribute('id', 'player_' + data_by_src[image_src]['name']);
				if(data_by_src[image_src]['unique']) {
					div.setAttribute('class', 'player_info');
				} else {
					div.setAttribute('class', 'player_info not_unique_player_info');
				}
				var name = document.createElement('div');
				name.setAttribute('class', 'player_name');
				name.appendChild(document.createTextNode(
					(data_by_src[image_src]['unique'] ? '' : RptCustomGeoScript.lang.not_unique_avatar + ' - ') + 
					data_by_src[image_src]['name']
				));
				div.appendChild(name);
				if(data_by_src[image_src]['unique']) {
					var data_table = document.createElement('table');
					data_table.setAttribute('class', 'player_result_table');
					for(var key in data_by_src[image_src]['rounds']) {
						var line = document.createElement('tr');
						line.setAttribute('class', key);
						// label
						var label_cell = document.createElement('td');
						label_cell.setAttribute('class', 'label');
						label_cell.appendChild(document.createTextNode(RptCustomGeoScript.lang[key]));
						line.appendChild(label_cell);
						// distance
						var distance_cell = document.createElement('td');
						distance_cell.setAttribute('class', 'distance');
						distance_cell.appendChild(document.createTextNode(data_by_src[image_src]['rounds'][key]['distance']));
						line.appendChild(distance_cell);
						// points
						var points_cell = document.createElement('td');
						points_cell.setAttribute('class', 'points');
						points_cell.appendChild(document.createTextNode(data_by_src[image_src]['rounds'][key]['points']));
						line.appendChild(points_cell);
						// time
						var time_cell = document.createElement('td');
						time_cell.setAttribute('class', 'time');
						time_cell.appendChild(document.createTextNode(data_by_src[image_src]['rounds'][key]['time']));
						line.appendChild(time_cell);
						
						data_table.appendChild(line);
					}
					div.appendChild(data_table);
				}
				el.appendChild(div);
			}
		});
	},
	showPlayerInfo : function(event) {
		if(typeof event.target.querySelectorAll('div[class^="player_info"]')[0] !== 'undefined') {
			event.target.querySelectorAll('div[class^="player_info"]')[0].setAttribute('style', 'display: block;');
		}
	},
	hidePlayerInfo : function(event) {
		if(typeof event.target.querySelectorAll('div[class^="player_info"]')[0] !== 'undefined') {
			event.target.querySelectorAll('div[class^="player_info"]')[0].setAttribute('style', 'display: none;');
		}
	},
	selectResultRows : function() {
		document.querySelectorAll('div[class^="results_row__"]').forEach(el => {
			var click_row = !RptCustomGeoScript.hasClass(el, 'results_selected') && !RptCustomGeoScript.hasClass(el, 'results_headerRow');
			if(click_row && typeof el['click'] === 'function') {
				el.click();
			}
		});
	},
	hasClass : function(element, class_to_match) {
		var classes = String(element.classList).split(' ');
		var has_class = false;
		for(var ck in classes) {
			var class_parts = classes[ck].split('__');
			if(class_parts[0] === class_to_match) {
				has_class = true;
			}
		}
		return has_class;
	}
};
RptCustomGeoScript.init();