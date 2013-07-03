/*! validation - v1.1 - 2013-07-03 11:55:18 AM
* Copyright (c) 2013 changyin; Licensed  */
KISSY.add("gallery/validation/1.1/utils",function(S,undefined){var utils={log:S.log,toJSON:function(str){try{eval("var result="+str)}catch(e){return{}}return result},isEmpty:function(a){return null===a||a===undefined||""===a},format:function(a){var b=Array.prototype.slice.call(arguments,1);return a.replace(/\{(\d+)\}/g,function(a,c){return b[c]})},toNumber:function(a){return a=new String(a),a=a.indexOf(".")>-1?parseFloat(a):parseInt(a),isNaN(a)?0:a},getStrLen:function(a,b){return b?a.replace(/[^\x00-\xFF]/g,"**").length:a.length},storage:function(){this.cache={}}};return S.augment(utils.storage,{add:function(a,b,c){var d=this,e=d.cache;(!e[a]||e[a]&&(null==c||c))&&(e[a]=b)},remove:function(a){var b=this,c=b.cache;c[a]&&delete c[a]},get:function(a){var b=this,c=b.cache;return c[a]?c[a]:null},getAll:function(){return this.cache},each:function(a){var b=this,c=b.cache;for(var d in c)if(a.call(b,d,c[d])===!1)break}}),utils}),KISSY.add("gallery/validation/1.1/define",function(){var a={};return a.Config={attrname:"data-valid",prefix:"auth-f",defaultwarn:"alert"},a.Const={enumvalidsign:{error:0,ok:1,hint:2,ignore:3}},a}),KISSY.add("gallery/validation/1.1/rule/base",function(a,b,c,d){return new function(){var b=this,c=new d.storage;b.add=function(b,d,e){a.isFunction(e)&&c.add(b,{name:b,fun:e,text:d})},b.get=function(b,d){var e=c.get(b);if(!e)return null;var f=e.fun,g=e.text,h=f.length-1,i=[];return d?a.isArray(d)?d.length>=h?(i.push(d[d.length-1]),i=i.concat(d.slice(0,-1))):(i.push(g),i=i.concat(d)):h>0?(i.push(g),i.push(d)):i.push(g):i=[g],function(a){return f.apply(this,[a].concat(i))}},b.toString=function(a,b){var e=c.get(a);return b=b||"\u3010\u89c4\u5219\u540d\u3011\n {0}\n\n\u3010\u9ed8\u8ba4\u63d0\u793a\u4fe1\u606f\u3011\n {1}\n\n\u3010\u51fd\u6570\u4f53\u3011\n {2}",e?d.format(b,e.name,e.text,e.fun.toString()):void 0}}},{requires:["dom","event","../utils"]}),KISSY.add("gallery/validation/1.1/rule/normal",function(a,b,c,d,e){e.add("func","\u6821\u9a8c\u5931\u8d25\u3002",function(a,b,c){var e=c.call(this,a);return e===!1?b:d.isEmpty(e)?void 0:e}),e.add("regex","\u6821\u9a8c\u5931\u8d25\u3002",function(a,b,c){return new RegExp(c).test(a)?void 0:b}),e.add("depend","\u8be5\u5b57\u6bb5\u65e0\u9700\u6821\u9a8c",function(a,b,c){return c.call(this,a)}),e.add("ajax","\u6821\u9a8c\u5931\u8d25\u3002",function(a,b,c){return c.call(this,a)}),e.add("required","\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002",function(b,c,e){return a.isArray(b)&&0==b.length?c:d.isEmpty(b)&&e?c:void 0}),e.add("equalTo","\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\u3002",function(c,d,e){return c!==b.val(a.get(e))?d:void 0}),e.add("length","\u5b57\u7b26\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0},\u4e14\u4e0d\u80fd\u5927\u4e8e{1}",function(a,b,c,e,f){var g=d.getStrLen(a,f),h=d.toNumber(c),i=d.toNumber(e);return g>=h&&i>=g?void 0:d.format(b,h,i)}),e.add("minLength","\u4e0d\u80fd\u5c0f\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(a,b,c,e){var f=d.getStrLen(a,e),g=d.toNumber(c);return g>f?d.format(b,g):void 0}),e.add("maxLength","\u4e0d\u80fd\u5927\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(a,b,c,e){var f=d.getStrLen(a,e),g=d.toNumber(c);return f>g?d.format(b,g):void 0}),e.add("fiter","\u5141\u8bb8\u7684\u683c\u5f0f{0}\u3002",function(a,b,c){return new RegExp("^.+.(?=EXT)(EXT)$".replace(/EXT/g,c.split(/\s*,\s*/).join("|")),"gi").test(a)?void 0:d.format(b,c)}),e.add("range","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(a,b,c,e){return c=d.toNumber(c),e=d.toNumber(e),c>a||a>e?d.format(b,c,e):void 0}),e.add("group","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,c,e,f){if(a.isArray(b)){var g=b.length;if(!(g>=e&&f>=g))return d.format(c,e,f)}}),e.add("trim","\u4e24\u7aef\u4e0d\u80fd\u542b\u6709\u7a7a\u683c\u3002",function(a,b){return/(^\s+)|(\s+$)/g.test(a)?b:void 0}),e.add("ltrim","\u5b57\u7b26\u4e32\u6700\u524d\u9762\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(a,b){return/^\s+/g.test(a)?b:void 0}),e.add("rtrim","\u5b57\u7b26\u4e32\u672b\u5c3e\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(a,b){return/\s+$/g.test(a)?b:void 0}),e.add("card","\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e",function(a,b){var c=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],d=0;for(i=0;17>i;i++)d+=parseInt(a.charAt(i))*c[i];var e=(12-d%11)%11;10==e&&(e="x");var f=a.charAt(17).toLowerCase();return f!=e?b:void 0}),e.add("mobile","\u624b\u673a\u53f7\u7801\u4e0d\u5408\u6cd5",function(b,c){var d={cm:/^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,cu:/^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,ce:/^(?:0?1)(?:33|53|8[079])\d{8}$/,cn:/^(?:0?1)[3458]\d{9}$/,hk:/^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,macao:/^6\d{7}$/,tw:/^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/},e=!1;return a.each(d,function(a){return b.match(a)?(e=!0,!1):void 0}),e?void 0:c}),a.each([["chinese",/^[\u0391-\uFFE5]+$/,"\u53ea\u80fd\u8f93\u5165\u4e2d\u6587"],["english",/^[A-Za-z]+$/,"\u53ea\u80fd\u8f93\u5165\u82f1\u6587\u5b57\u6bcd"],["currency",/^\d+(\.\d+)?$/,"\u91d1\u989d\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["phone",/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,"\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["url",/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>""])*$/,"url\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684email\u683c\u5f0f"]],function(a){e.add(a[0],a[2],function(b,c){return new RegExp(a[1]).test(b)?void 0:c})})},{requires:["dom","event","../utils","./base"]}),KISSY.add("gallery/validation/1.1/rule",function(a,b,c){return c},{requires:["./utils","./rule/base","./rule/normal"]}),KISSY.add("gallery/validation/1.1/rule/remote",function(a,b,c,d){function e(c,e,f){function g(b){return function(c,d,g){!c||c.state!==!0&&c.state!==!1?f(0,"failure"):(f(c.state,c.message),c.state&&j.add(b,{est:c.state,msg:c.message})),a.isFunction(e.success)&&e.success.call(this,c,d,g),i=null}}var h=null,i=null,j=new d.storage,k=b.attr(c,"name"),l={loading:"loading",type:"POST",dataType:"json",data:{}};a.mix(l,e),l.error=function(b,c,d){a.isFunction(e.error)&&e.success.call(this,b,c,d)},this.check=function(b){var c=j.get(b);return c?[c.msg,c.est]:(h&&h.cancel(),h=a.later(function(){i&&i.abort(),l.data[k]=b,l.success=g(b),i=a.io(l)},500),[l.loading,0])}}return e},{requires:["dom","event","../utils"]}),KISSY.add("gallery/validation/1.1/warn/baseclass",function(a,b,c){function d(b,c){var d=this;d.target=a.isArray(b)?b[b.length-1]:b,d.el=b,d.single=!1,a.mix(d,c||{}),d.init()}return a.augment(d,a.EventTarget,{init:function(){},_bindEvent:function(d,e,f){if("select"==a.get(d).tagName.toLowerCase())c.on(d,"change",f);else switch((b.attr(d,"type")||"input").toLowerCase()){case"radio":case"checkbox":c.on(d,"click",f);break;case"file":c.on(d,"change",f);break;default:c.on(d,e,f)}},showMessage:function(a,b){a=1,b=1,evttype=1}}),d},{requires:["dom","event"]}),KISSY.add("gallery/validation/1.1/warn/base",function(a,b,c,d,e){var f=new d.storage,g=new d.storage;return{extend:function(b,c){var d=function(a,b){d.superclass.constructor.call(this,a,b)},g=a.isFunction(c)?c():c;if(g.style){for(var h in g.style)this.addStyle(h,a.merge(g.style[h],{core:b}));delete g.style}return a.extend(d,e,g),f.add(b,d),d},addStyle:function(a,b){g.add(a,b)},getStyle:function(a){return g.get(a)},get:function(a){return f.get(a)}}},{requires:["dom","event","../utils","./baseclass"]}),KISSY.add("gallery/validation/1.1/warn/alert",function(a,b,c,d,e){function f(){return{init:function(){this.single=!0},showMessage:function(a,c){var d=this;return a==g.error?(d.invalidClass&&b.addClass(d.target,d.invalidClass),alert(c),d.target.focus(),!1):(d.invalidClass&&b.removeClass(d.target,d.invalidClass),void 0)},style:{alert:{invalidClass:"vailInvalid"}}}}var g=e.Const.enumvalidsign;return f},{requires:["dom","event","../utils","../define"]}),KISSY.add("gallery/validation/1.1/warn/static",function(a,b,c,d){function e(){return{init:function(){var a,c=this,d=g(c.target);a=d.attr("data-message")?g(d.attr("data-messagebox")):c.messagebox?g(c.messagebox):b(c.template).appendTo(d.parent()),a&&(c.panel=a,c.panelheight=a.css("height"),c.estate=a.one(".estate"),c.label=a.one(".label"),c.estate&&c.label&&a.hide())},showMessage:function(b,c){var d=this,e=g(d.el),h=d.panel,i=d.estate,j=d.label,k=a.isNumber(d.anim)?d.anim:.1;d.invalidClass&&(b==f.ignore&&b==f.ok?e.removeClass(d.invalidClass):e.addClass(d.invalidClass));var l="none"==h.css("display")?!1:!0,m=d.panelheight;b==f.ignore?l&&h.slideUp(k):(i.removeClass("ok tip error"),b==f.error?(i.addClass("error"),j.html(c),l||h.height(m).slideDown(k)):b==f.ok?d.isok===!1?l&&h.slideUp(k):(l||h.height(m).slideDown(k),i.addClass("ok"),j.html(d.oktext?d.oktext:c)):b==f.hint&&(i.addClass("tip"),j.html(c),l||h.height(m).slideDown(k)))},style:{text:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur keyup"},under:{template:'<div class="valid-under"><p class="estate"><span class="label"></span></p></div>',event:"focus blur keyup"}}}}var f=d.Const.enumvalidsign,g=b.all;return e},{requires:["node","../utils","../define"]}),KISSY.add("gallery/validation/1.1/warn/float",function(a,b,c,d,e){function f(){return{invalidCls:"J_Invalid",init:function(){var d=this,e=d.target,f=b.create(d.template),g=b.get("div.msg",f);a.ready(function(){document.body.appendChild(f)}),a.mix(d,{panel:a.one(f),msg:a.one(g)}),c.on(d.el,"focus",function(a){b.hasClass(e,d.invalidCls)&&d._toggleError(!0,a.target)}),c.on(d.el,"blur",function(){d._toggleError(!1)})},showMessage:function(a,c,d,e){var f=this,h=f.target,i=f.msg;g.ok==a?(b.removeClass(h,f.invalidClass),i.html("OK")):("submit"!=d&&f._toggleError(!0,e),b.addClass(h,f.invalidClass),i.html(c))},_pos:function(a){var c=this,d=b.offset(a||c.target),e=c.panel.height(),f=d.left-10,g=d.top-e-20;c.panel.css("left",f).css("top",g)},_toggleError:function(a,c){var d=this,e=d.panel;a?(b.show(e),d._pos(c)):b.hide(e)},style:{"float":{template:'<div class="valid-float" style="display:none;"><div class="msg">&nbsp;</div><s>\u25e5\u25e4</s></div>',event:"focus blur",invalidClass:"vailInvalid"}}}}var g=e.Const.enumvalidsign;return f},{requires:["dom","event","../utils","../define"]}),KISSY.add("gallery/validation/1.1/warn",function(a,b,c,d,e,f,g){return c.extend("Alert",e),c.extend("Static",f),c.extend("Float",g),c.BaseClass=d,c},{requires:["./utils","./warn/base","./warn/baseclass","./warn/alert","./warn/static","./warn/float"]}),KISSY.add("gallery/validation/1.1/field",function(a,b,c,d,e,f,g,h){function i(b,c){var e=this;return(b=a.get(b))?(e.el=b,e.rule=new d.storage,e._init(c),void 0):(d.log("\u5b57\u6bb5\u4e0d\u5b58\u5728\u3002"),void 0)}var j=e.Const.enumvalidsign,k=document;return i.Config={required:[!0,"\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002"],initerror:"data-showerror"},a.augment(i,{_init:function(c){var d=this,e=a.merge(i.Config,c||{});a.mix(d,e,"label"),d._initField(),d._initVType(e),d._initWarn(e),b.attr(d.el,e.initerror)&&d.showMessage(!1,b.attr(d.el,e.initerror))},_initField:function(){var c=this,d=c.el;if("checkbox,radio".indexOf(b.attr(d,"type"))>-1){var e=d.form,f=b.attr(d,"name"),g=[];a.each(k.getElementsByName(f),function(a){a.form==e&&g.push(a)}),c.el=g}},_initVType:function(b){var c=this,d=c.el;for(var e in b)c.addRule(e,b[e]);if(b.remote){var f=a.isArray(b.remote)?{url:b.remote[0]}:b.remote,h=new g(d,f,function(a,b){c.showMessage(a,b)});c.addRule("ajax",function(a){return h.check(a)})}},_initWarn:function(b){var c,e,f=this,g={};if(b.warn&&(c=a.isFunction(b.warn)?b.warn:h.get(b.warn),g=a.merge(b,{})),b.style&&h.getStyle(b.style)){var i=h.getStyle(b.style);c=h.get(i.core),g=a.merge(b,i)}return c?(e=new c(f.el,g),e._bindEvent(f.el,b.event||e.event,function(){var b=f._validateValue();a.isArray(b)&&2==b.length&&f.showMessage(b[1],b[0])}),a.mix(f,{warn:e,single:e.single}),void 0):(d.log("\u63d0\u793a\u4fe1\u606f\u7c7b\u914d\u7f6e\u9519\u8bef."),void 0)},_validateValue:function(){var a=this,c=a.rule,e=a._getValue(),f=c.getAll(),g=function(a,b){return[b,a]};if(b.attr(a.el,"disabled")||b.hasClass(a.el,"disabled"))return g(j.ignore,void 0);if(f.depend&&f.depend.call(this,e)!==!0)return g(j.ignore,void 0);for(var h in f){if("required"==h){var i=f.required.call(this,e);if(i)return a.label?g(j.hint,a.label):g(j.error,i);if(d.isEmpty(e))return g(j.ignore,"")}if(!("depend".indexOf(h)>-1)){if("ajax".indexOf(h)>-1)break;var k=f[h].call(this,e);if(!d.isEmpty(k))return a._ajaxtimer&&a._ajaxtimer.cancel(),g(j.error,k)}}return f.ajax?f.ajax.call(a,e):g(j.ok,a.okMsg||"OK")},_getValue:function(){var c=this,d=c.el,e=[];switch(b.attr(d,"type")){case"select-multiple":a.each(d.options,function(a){a.selected&&e.push(a.value)});break;case"radio":case"checkbox":a.each(d,function(a){a.checked&&e.push(a.value)});break;default:e=b.val(d)}return e},addRule:function(b,c){var d=this,e=d.rule;if(a.isFunction(b))return e.add(a.guid(),b),d;var g=f.get(b,c);return g?(e.add(b,g),d):void 0},removeRule:function(a){var b=this,c=b.rule;c.remove(a)},showMessage:function(a,b,c){var d=this;d.warn.showMessage(a,b,c)},isValid:function(){var a=this,b=a._validateValue();return a.showMessage(b[1],b[0]),1==b[1]||1===b[1]||3===b[1]?!0:!1}}),i},{requires:["dom","event","./utils","./define","./rule","./rule/remote","./warn"]}),KISSY.add("gallery/validation/1.1/base",function(a,b,c,d,e,f,g,h){function i(b,c){var e=this;return"string"==typeof b&&(b=a.get(b)),b?(e._init(b,c||{}),void 0):(d.log("\u8bf7\u914d\u7f6e\u6b63\u786e\u7684form ID."),void 0)}return a.augment(i,a.EventTarget,{_init:function(b,c){var f=this;f.config=a.merge(e.Config,c),f.form=b,f.fields=new d.storage,f._initfields()},_initfields:function(){var c=this,e=c.config;a.each(c.form.elements,function(a){var f=b.attr(a,e.attrname);f&&c.add(a,d.toJSON(f.replace(/'/g,'"')))})},add:function(c,e){var g=this,h=g.fields,i=a.merge(g.config,e);if(a.isObject(c)&&c instanceof f)return h.add(b.attr(c.el,"id"),c),this;var j=b.get(c)||b.get("#"+c),k=b.attr(j,"id");return j&&j.form==g.form?(k||(k=i.prefix+a.guid(),b.attr(j,"id",k)),h.add(k,new f(j,i)),void 0):(d.log("\u5b57\u6bb5"+c+"\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u8be5form"),void 0)},remove:function(a){this.fields.remove(a)},get:function(a){return this.fields.get(a)},isValid:function(a){var b=this,c=b.fields;if(a&&c.get(a))return c.get(a).isValid();var d=!0;return c.each(function(a,b){return!b.isValid()&&(d=!1,b.single)?!1:void 0}),d},submit:function(){var a=this,b=a.fire("submit",a.fields);b&&a.isValid()&&a.form.submit()}}),a.mix(i,{Util:d,Define:e,Field:f,Warn:g,Rule:h}),i},{requires:["dom","event","./utils","./define","./field","./warn","./rule"]}),KISSY.add("gallery/validation/1.1/index",function(a,b){return b},{requires:["./base","./assets/base.css"]});