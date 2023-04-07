/**
 * Пример использование:

	 <link rel="stylesheet" type="text/css" href="{{ STATIC_URL }}app/src/wrapper/resource/css/alias.css" />
	 <script src="{{ STATIC_URL }}app/lib/masks/masks.js"></script>


 	<input type="text" id="phoneNumber" placeholder="Телефон" name="phoneNumber" value="">

	 <script>
		MASK.init({
			onReady: function () {
				MASK.Set(document.getElementById('phoneNumber0'));
				MASK.Set(document.getElementById('phoneNumber1'));
			}
		});
	 </script>

 * */



var MASK = {
	staticUrl:			LPG.STATIC_URL || '/media/',		//https://static.lpgenerator.ru
	locale:				LPG.LOCALE || 'ru',
	defaultCode:		{'pl': 'pl', 'en': 'us'}[LPG.REG_LANG] || 'ru',

	setDomain: function(domain) {
		this.staticUrl = domain;
	},

	initSelf: {
		phoneNumber:		'',
		phoneCodes:			null,		//Dictionary
		currentMask:		null,
		$countryButton:		null,
		country:			null,
		countryList:		null,
		countryCode:		null,
		eventClickOutId:	null,
		hoveredItem:		null,
		showList:			false,
		showedCount:		0			//Количество элементов в списке стран с учетом фильтра
	},

	init: function (params) {
		var that = this;
		if (!that.initSelf.phoneCodes) {
			var xhrCss = new XMLHttpRequest();
			xhrCss.open('GET', this.staticUrl+ 'app/lib/masks/masks.css', true);
			xhrCss.onreadystatechange = function() {
				if (xhrCss.readyState !== 4) return;
				if (xhrCss.status !== 200) {
					//Почему то не загрузилась css
				} else {
					var cssContent = '.flag { display: inline-block; background: url(' + that.staticUrl + 'app/src/wrapper/resource/img/flags.png?v=' + ( LPG.CURRENT_VERSION || '' ) + '); width: 20px; }' + xhrCss.responseText +
									'.ui_inputphone_activeList {background: white none repeat scroll 0 0;margin: 0;max-height: 200px;overflow: auto;padding: 0;width: 100%;}.ui_inputphone_activeList li {list-style: none;padding: 2px 10px;font-size: 12px;}.ui_inputphone_activeList li:hover, .ui_inputphone_activeList li.hover {cursor: pointer;background: #eaf3f7;}.ui_inputphone_countryButton {display: inline-block; position: relative;margin: 0 10px -1px -42px;}';
					var cssExec = document.createElement('style');
					cssExec.type = 'text/css';
					cssExec.innerHTML = cssContent;
					document.body.appendChild(cssExec);
				}
			};
			xhrCss.send();

			var xhr = new XMLHttpRequest();
			xhr.open('GET', this.staticUrl+ 'app/dsn/' + this.locale + '/phoneCodes.json', true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState !== 4) return;
				if (xhr.status !== 200) {
					//Почему то не загрузились маски
				} else {
					that.initSelf.phoneCodes = JSON.parse(xhr.responseText);
					if (params && params.onReady) { params.onReady(); }
				}
			};
			xhr.send();
		} else {
			if (params && params.onReady) { params.onReady(); }
		}
	},

	getSelf: function () {
		var self = {};
		for (var k in this.initSelf) {
			self[k] = this.initSelf[k];
		}
		return self;
	},
	
	Set: function (inputNode, excludeRules) {			//node,
		if (!(this instanceof MASK.Set)) {
			return new MASK.Set(inputNode, excludeRules);
		}
		var self = MASK.getSelf();
		self.input = inputNode;
		self.form = (function (element) {
			while (element && element.nodeType === 1) {
				if (element.nodeName === 'FORM') {
					return element;
				}
				element = element.parentNode;
			}

			return null;
		})(self.input);


		self.configure = function() {
				self.input.onclick = function() {
					self.caretSetPositionDefault();
				};
				self.input.onkeydown = function(e) {
					var keyCode = e.keyCode;
					var curPos, maskPos;
					if ( (keyCode>=48 && keyCode<=57) || (keyCode>=96 && keyCode<=105) || keyCode === 46 ) {
					} else if (keyCode === 8) {
						curPos = self.caretGetPosition();
						var beforePos = self.currentMask.substr(0, curPos).lastIndexOf('#');
						if (beforePos>0 && curPos>beforePos){
							self.caretSetPosition(beforePos+1);
						} else {
							return false;
						}
					} else if (keyCode === 39) {
						curPos = self.caretGetPosition();
						maskPos = self.input.value.indexOf('_');
						if (maskPos!==-1 && curPos>=maskPos){
							return false;
						}
					} else if (keyCode===37) {
						curPos = self.caretGetPosition();
						maskPos = self.currentMask.indexOf('#');
						if (maskPos!==-1 && curPos<=maskPos){
							return false;
						}
					} else {
						return false;
					}
				};

				self.input.addEventListener('input', function(e) {
					self.parsePhone();
					self.render();
				}, true);

				self.form.addEventListener('submit', function(e) {
					var inputVal = self.input.value,
						className = self.input.className;
					if ( self.exclusionsCheck() || inputVal.length >= self.currentMask.length && !/_/g.test(inputVal) ) {
						self.input.value = inputVal.replace(/([^\+\d])/gi , '');
						self.input.className = className.indexOf('incomplete') !== -1 ? className.replace(/ incomplete/, '') : className;
					} else {
						e.preventDefault();
						self.input.className += self.input.className.indexOf('incomplete') !== -1 ? '' : ' incomplete';
					}
				});

				self.$countryButton = document.createElement('div');
				self.$countryButton.style = 'display: inline-block; margin-left:0';
				self.$countryButton.innerHTML = '<div class="ui_inputphone_countryButton">' +
													'<span class="cp">' +
														'<i class="ui_mask_currentIco vam mr5 flag"></i>' +
														'<i class="vam ico arrow_down_black_mini"></i>' +
													'</span>' +
													'<div class="w200 pos_a r0 t0 bg_white zi10000 dn ui_phonemask_list" style="border: 1px solid silver">' +
														'<div style="background:none repeat scroll 0 0 #eaf3f7">' +
															'<input class="theme_lpg m10 br1 w180 mr0 ui_mask_queryName" style="width:166px;" type="text" placeholder="'+ LT['Search'] +'" value="">' +
															'<i class="ico search_gray_mini infield mb-4"></i>' +
														'</div>' +
														'<ul class="ui_inputphone_activeList" id="ui_mask_countryContainer"></ul>' +
													'</div>' +
												'</div>';


				if (self.input.nextSibling) {
					self.input.parentNode.insertBefore(self.$countryButton, self.input.nextSibling);
				} else {
					self.input.parentNode.appendChild(self.$countryButton);
				}

				self.$currentIco = self.$countryButton.querySelector('.ui_mask_currentIco');
				self.$phonemaskList = self.$countryButton.querySelector('.ui_phonemask_list');
				self.$maskQueryName = self.$countryButton.querySelector('.ui_mask_queryName');
				self.$countryContainer = self.$phonemaskList.querySelector('.ui_inputphone_activeList');

				document.addEventListener('click', function(e) {
					var listContainer = self.$phonemaskList;
					if (e.target.id === self.input.id || e.target.className.indexOf('ui_mask_currentIco') !== -1 || listContainer.contains(e.target)) return;
					listContainer.classList.add('dn');
				});

				self.$currentIco.onclick = self.countryListShow;

				self.$countryButton.addEventListener('keydown', function(e) {
					if (self.showList && self.showedCount) {
						if (self.hoveredItem) self.hoveredItem.classList.remove('hover');
						var oldItem = self.hoveredItem;
						var list = self.$countryContainer;
						switch (e.keyCode) {
							case 38:	//вверх
								self.hoveredItem =  self.hoveredItem? self.hoveredItem.previousSibling : list.childNodes.last;
								while (self.hoveredItem && self.hoveredItem.classList.contains('dn') ) {
									self.hoveredItem = self.hoveredItem.previousSibling;
								}
								break;
							case 40:
								self.hoveredItem = self.hoveredItem ? self.hoveredItem.nextSibling : list.childNodes[0];
								while (self.hoveredItem && self.hoveredItem.classList.contains('dn') ) {
									self.hoveredItem = self.hoveredItem.nextSibling;
								}
								break;
							case 13:
								if (self.hoveredItem) self.countrySelect(self.hoveredItem.getAttribute('code'));
								break
						}
						if (!self.hoveredItem) {
							self.hoveredItem = oldItem;
						}
						if (self.hoveredItem) {
							self.hoveredItem.classList.add('hover');
							list.scrollTop = self.hoveredItem.offsetTop-100;
						}
					}
				});
				self.$countryButton.addEventListener('mouseover', function() {
					if (self.hoveredItem) self.hoveredItem.classList.remove('hover');
				});

				self.$maskQueryName.addEventListener('keypress', function() {
					setTimeout(function() {
						self.countryListRender();
					},1);
				});

				if (self.input.value) {
					var value = self.input.value.replace('+','');
					self.setNumber(value);
				} else {
					self.setNumber(null, MASK.defaultCode);
				}
			};

		self.exclusionsCheck = function () {/* обработчик исключений блокировки события submit, если надо разрешить отправку без строгого совпадения */
			if (!excludeRules) { return false; }
			if ( excludeRules.countryCode ) {
				for ( var i = 0, l = excludeRules.countryCode.length ; i < l ; i += 1 ) {
					if ( excludeRules.countryCode[i] === self.countryCode ) {
						return true;
					}
				}
			}
		};

		self.setNumber = function(number, countryCode) {
				if (number) {
					number = number.replace('+','');
					//console.log('setNumber:', number, countryCode);
					var phoneCodes = Object.keys(self.phoneCodes);
					for (var i=0; i<phoneCodes.length;i++) {
						var code = phoneCodes[i];
						var country = self.phoneCodes[code];
						var prefix = country.mask.replace(/[^\d]/g, '');
						if (number.indexOf(prefix) === 0) {
							countryCode = code;
							self.phoneNumber = number.substr(prefix.length);
							break;
						}
					}
				}
				self.countrySelect(countryCode, number);
				self.caretSetPositionDefault();
			};

		self.countryListShow = function() {
				self.showList = true;
				self.$phonemaskList.classList.remove('dn');
				self.countryListRender();
				setTimeout(function() {
					self.$maskQueryName.focus();
				}, 10);
			};

		self.countryListRender = function() {
			var code;
				if (!self.showList) return;
				var container = document.createDocumentFragment();
				var phoneCodes = Object.keys(self.phoneCodes);
				if (!self.countryList) {
					self.countryList = {};
					for (var i=0; i<phoneCodes.length;i++) {
						code = phoneCodes[i];
						var countryCfg = self.phoneCodes[code];
						var item = document.createElement('li');
						item.setAttribute('code', code);
						item.className = '';
						item.innerHTML = '<i class="flag f_' + countryCfg.flag + ' mr5"></i>' + countryCfg.name;
						item.onclick = self.countrySelect.bind(this, code, null);
						container.appendChild(item);
						self.countryList[code] = item;
					}
				}
				var showed = {};
				self.showedCount = 0;
				var queryName = self.$maskQueryName.value;

				var names = [];
				for (i=0; i<phoneCodes.length; i++) {
					code = phoneCodes[i];
					if ( !self.phoneCodes[code].countryId || self.phoneCodes[code].countryId !== code ) {
						self.phoneCodes[code].countryId = code;
					}
					names.push(self.phoneCodes[code]);
				}

				var filterReg = new RegExp(queryName, 'i');
				names.filter(function(countryCfg) {
					var isEnable = filterReg.test(countryCfg.name);
					if (isEnable) { showed[countryCfg.countryId] = 1; }
					return isEnable;
				});

				for (i=0; i<phoneCodes.length;i++) {
					code = phoneCodes[i];
					var countryItem = self.countryList[code];
					if (!showed[code]) {
						countryItem.classList.add('dn');
					} else {
						countryItem.classList.remove('dn');
						self.showedCount++;
					}
				}

				self.$countryContainer.appendChild(container);
			};

		self.countrySelect = function(code, phoneNumber) {
			var phoneCode =  self.phoneCodes[code]; //.getById(code);
			if (!code || !phoneCode.mask) {
				self.countrySelect(MASK.defaultCode);
				return;
			}

			self.showList = false;
			self.$phonemaskList.classList.add('dn');
			self.$currentIco.className = 'ui_mask_currentIco vam mr5 flag f_' + phoneCode['flag'];
			self.countryCode = code;

			if (phoneCode) { self.currentMask = phoneCode.mask; }/*TODO: rewrite to something like currentMaskGet(phoneCode, phoneNumber)*/
			if (self.currentMask) { self.parsePhone(phoneNumber); }

			self.render(true);
			self.caretSetPositionDefault();
		};

		self.parsePhone = function(phoneNumber) {
				var prefixLength = self.currentMask.replace(/[^\d]+/g, '').length;					//Количество цифр в коде страны
				if (!phoneNumber) phoneNumber = self.input.value;
				//console.log('[parsePhone] phoneNumber:', phoneNumber);
				self.phoneNumber = phoneNumber.replace(/[^\d]+/g, '').substr(prefixLength);	//Номер телефона без кода
			};

		self.render = function(missCaret) {
				var caretPos = self.caretGetPosition();
				var cursor = 0;
				var rendNumber = self.currentMask.replace(/#/g, function() {
					var char = self.phoneNumber[cursor] || '_';
					cursor++;
					return char;
				});
				setTimeout(function() {
					if ( self.input.value !== self.currentMask.replace(/#/g, '_') ) {
						self.input.value = rendNumber;
					}
					if (!missCaret) {
						if ( rendNumber[caretPos] && !rendNumber[caretPos].match(/[\d_]/ )) {caretPos++;}
						self.caretSetPosition(caretPos);
					}
				}, 0);
			};

		self.caretGetPosition = function() {
				var obj = self.input;
				if(obj.selectionStart) {
					return obj.selectionStart;
				} else if (document.selection) {
					var sel = document.selection.createRange();
					var clone = sel.duplicate();
					sel.collapse(true);
					clone.moveToElementText(obj);
					clone.setEndPoint('EndToEnd', sel);
					return clone.text.length;
				}
				return 0;
			};

		self.caretSetPosition = function (pos) {
				var input = self.input;
				if (input.setSelectionRange) {
					input.focus();
					input.setSelectionRange(pos, pos);
				} else if (input.createTextRange) {
					var range = input.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			};

		self.caretSetPositionDefault = function() {
				setTimeout(function() {
					var curPos = self.caretGetPosition();
					var pos = self.input.value.indexOf('_') || self.input.value.length;
					if ( pos !== -1 && pos<curPos ){
						self.caretSetPosition(pos);
					} else {
						var maskPos = self.currentMask.indexOf('#');
						if (maskPos !== -1 && curPos<=maskPos){			//Если в код страны тыкают, то сдвигаем на начало
							self.caretSetPosition(maskPos);
						}
					}
				}, 5);
			};

		self.configure();
	}
};
