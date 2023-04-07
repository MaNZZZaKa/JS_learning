/**
 * @description Показывает попапы авторизации/регистрации на главных страницах и на странице промо партнерки
 */

var _loginDefaultData = {
	enableSocial:			true,
	enableSocialVk:			true,
	enableSocialTwitter:	true,
	requireEmailConfirm:	LPG.LOCALE === 'pl',
	checkUrl:				'/accounts/registration/check/',
	authUrl:				'/accounts/registration/login/',
	regUrl:					LPG.LOCALE === 'pl' ? "/accounts/registration/registration/pl/" : "/accounts/registration/registration/"
};

Object.keys(_loginDefaultData).forEach(function(propName) {
	if (!window.loginConfig.hasOwnProperty(propName)) {
		window.loginConfig[propName] = _loginDefaultData[propName];
	}
});



var templateSet = function (tplName, model, callback) {
	var tplRaw = $("#tpl_authForm_"+tplName).html(),
		$dialog = $( '#login_dialog' ),
		oldClass = $dialog.data( 'tplName' ),
		classPrefix = 'tpl__';/* при изменении не забыть поменять в стлях */

	if (model) {
		tplRaw = tplRaw.replace(/{@([\w ]+)@}/g, function(_, varName) {
			return model[varName.trim()];
		});
	}

	if ( oldClass !== undefined ) {
		$dialog.removeClass( classPrefix + oldClass );
	}
	$dialog.addClass( classPrefix + tplName ).data( 'tplName', tplName );
	$dialog.find( '.authForm' )[0].innerHTML = tplRaw;
	if ( typeof callback === 'function' ) {
		callback();
	}
};
var setProgress = function(progress) {
	document.getElementById( 'login_dialog' ).querySelector( '.line' ).style.width = progress + "%";
};


LPG.namespace('LPG.login');

var loginModel = {
	"enableSocialLogin":	loginConfig.enableSocial ? 'dib' : 'dn',
	"enableSocialVk":		loginConfig.enableSocialVk ? 'dib' : 'dn',
	"enableSocialTwitter":	loginConfig.enableSocialTwitter ? 'dib' : 'dn',
	"requireName":			loginConfig.requireName ? 'dib' : 'dn',
	"termsCheckedAttr":		LPG.LOCALE !== 'ru' ? '' : 'checked',
	"privacyCheckedAttr":	LPG.LOCALE !== 'ru' ? '' : 'checked'
};
LPG.login = {
	email:	null,
	mobDt: new MobileDetect(window.navigator.userAgent),
	utmData: {},
	agreementsData: {
		terms: false,
		privacy: false
	},
	inProgress: false,

	init: function (el) {
		if (el) {
			var utmData = el.getAttribute('utmData');
			if (utmData) {
				LPG.login.utmData = (new Function("return " + utmData))();
			}
		}
		templateSet('check', loginModel);
		setProgress(33);
		setTimeout(function() {
			$('#authForm_email')[0].focus();
		}, 500);
	},
	ifEnterPress: function(e, action, el) {
		if (e.key === 'Enter') {
			LPG.login[action](el);
		}
	},

	check: function(button) {
		if (LPG.login.inProgress) {
			return;
		} else {
			LPG.login.inProgress = true;
		}
		var that = this;
		this.email = $('#authForm_email')[0].value;
		LPG.forms.showLoaderIn(button, LT['Check']);
		LPG.login.ajax(loginConfig.checkUrl, {
			email: this.email
		}, function(res) {
			LPG.login.inProgress = false;
			if (res) {
				if (res.errors && Object.keys(res.errors).length > 0) {
					LPG.login.errorShow(res.errors);
					LPG.forms.hideLoaderIn(button);
				} else {
					if (res['is_exist']) {
						templateSet('auth', loginModel);
					} else {
						templateSet('register', loginModel, that.watchAgreements.bind( that ) );
						if (loginConfig.requireName) {
							setTimeout(function() {
								MASK.init({
									onReady: function () {
										MASK.Set($('#authForm_phone')[0], {countryCode: ['kr', 'de13']});
									}
								});
							}, 100);
						}
					}
					$("#cnt_authForm_email").html(LPG.login.email);
					setProgress(66);
					setTimeout(function() {		//и в авторизации и в реге есть поле
						$('#authForm_password')[0].focus();
					}, 100);
				}
			}
		});
	},
	redirectMake: function ( redirect_to ) {
		if ( typeof redirect_to !== 'undefined' && redirect_to === '/' && loginConfig.requireEmailConfirm ) {
			templateSet( 'requireEmailConfirmation' );
		} else {
			document.location = loginConfig.regSuccessUrl || redirect_to;
		}
	},
	auth: function(button) {
		var that = this;
		if (LPG.login.inProgress) {
			return;
		} else {
			LPG.login.inProgress = true;
		}
		var password = $('#authForm_password')[0].value;
		LPG.forms.showLoaderIn(button, LT['Auth']);
		setProgress(66);
		LPG.login.ajax(loginConfig.authUrl, {
			email:		this.email,
			password:	password
		}, function(res) {
			if (res) {
				if (res['success']) {
					that.redirectMake( loginConfig.authSuccessUrl || res[ 'redirect_to' ] || '/pages/' );
				} else if (res['errors']) {
					LPG.login.errorShow(res.errors);
					LPG.forms.hideLoaderIn(button);
					LPG.login.inProgress = false;
				}
			}
		});
	},
	register: function (button) {
		if (LPG.login.inProgress) {
			return;
		} else {
			LPG.login.inProgress = true;
		}
		var nameObj = $('#authForm_name')[0];
		var phoneObj = $('#authForm_phone')[0];
		var that = this,
			password = $('#authForm_password')[0].value;
		LPG.forms.showLoaderIn(button, LT['Register']);
		var data = {
			email:		that.email,
			password:	password,
			name:		nameObj ? nameObj.value : null,
			phone:		phoneObj ? phoneObj.value : null,
			is_mobile:	( that.mobDt.mobile() !== null ),
			terms:		that.agreementsData.terms,
			privacy:	that.agreementsData.privacy
		};
		Object.assign(data, LPG.login.utmData);
		LPG.login.ajax(loginConfig.regUrl, data, function(res) {
			if (res) {
				if (res['success']) {
					try {
						yaCounter17937001.reachGoal( 'reg-cg', function () {
							that.redirectMake( loginConfig.regSuccessUrl || res['redirect_to'] );
						}, that );
					} catch ( e ) {
						LPG.utils.cookie.setCookie( 'YA_COUNTER_EVENT', JSON.stringify( { "event" : "reg" } ), {
							expires: ( 30 * 24 * 60 * 60 ),
							path: '/',
							domain: window.location.hostname
						} );
						that.redirectMake( loginConfig.regSuccessUrl || res['redirect_to'] );
						if ( LPG.utils.urlData.getValue( 'js_debug' ) !== '' ) {
							console.log( 'On reg metriks failed: ', e );
						}
					}
				} else if (res.errors){
					that.errorShow(res.errors);
					LPG.forms.hideLoaderIn(button);
					LPG.login.inProgress = false;
				}
			}
		});
	},
	passwordRestore: function () {
		templateSet('passwordRestore');
		setProgress(66);
		$('#authForm_email')[0].focus();
	},
	passwordReset: function () {
		var email = $('#authForm_email')[0].value;
		LPG.login.ajax('/accounts/registration/password-reset/', {
			email:		email
		}, function(res) {
			if (res) {
				if (res['success']) {
					templateSet('passwordRestoreProcess');
				} else if (res.errors){
					LPG.login.errorShow(res.errors);
				}
			}
		});
	},

	ajax: function(url, data, callback, method) {
		var csrf = JSON.parse($.ajax({type: 'GET', url: '/accounts/csrf/', async: false}).responseText).token;
		$.ajax({
			url: url,
			type: method || 'POST',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('X-CSRFToken', csrf);
			},
			data: data,
			success: function (response) {
				callback(response);
			},
			error: function () { }
		});
	},

	watchAgreements: function () {
		this.checkAgreements();
		this.initAgreementsListeners();
	},
	checkAgreements: function () {
		this.agreementsData.terms = document.getElementById( 'authForm__termsOfUse_checkbox' ).checked;
		this.agreementsData.privacy = document.getElementById( 'authForm__privacyPolicy_checkbox' ).checked;
		this.switchButtonState();
	},
	initAgreementsListeners: function () {
		var that = this;
		$( '#authForm__termsOfUse_checkbox, #authForm__privacyPolicy_checkbox' ).on( 'change', function () {
			that.agreementsData[ this.name ] = this.checked;
			that.switchButtonState();
		} );
	},
	switchButtonState: function () {
		var isAgreeWithAll = true;
		var keys = Object.keys( this.agreementsData );
		var l = keys.length;

		for ( var i = 0 ; i < l ; i += 1 ) {
			if ( this.agreementsData[ keys[ i ] ] === false ) {
				isAgreeWithAll = false;
			}
		}

		document.querySelector( '.authForm__submitBtn' ).disabled = !isAgreeWithAll;
	},

	errorShow: function(errors) {
		var i, ln, fields, errs, texts = [];
		console.log('errors:', errors);
		fields = Object.keys(errors);
		for (i=0, ln =fields.length; i<ln; i++) {
			errs = errors[fields[i]];
			errs.forEach(function(text) {
				texts.push(text);
			});
		}

		$("#authForm_error").removeClass( 'hidden' ).html("<i class='ico_error'></i><div class='dib'>"+texts.join('<br>') + "</div>");
	}
};

$('a[data-target="#login_dialog"]').on('click', function(el) {LPG.login.init(el.currentTarget);});

// Open auth
location.search.replace(/\?/, '').split('&').forEach(function(param) {
	param = param.split('=')[0];
	if (param === 'openAuthModal') {
		$('a[data-target="#login_dialog"]').click();
	}
});


$( function ( $ ) {
	$( '#login_dialog' ).on( 'shown', function () {
		$( 'body' ).css( { overflowY: 'hidden' } );
	} );
	$( '#login_dialog' ).on( 'hidden', function () {
		$( 'body' ).css( { overflowY: '' } );
	} );
} );
