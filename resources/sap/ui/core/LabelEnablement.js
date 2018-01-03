/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/ManagedObject'],function(q,M){"use strict";function l(o,m){var F=sap.ui.require(m);return typeof F==='function'&&(o instanceof F);}var C={};var N=["sap.m.Link","sap.m.Select","sap.m.Label","sap.m.Text"];function t(i,I){if(!i){return null;}var o=sap.ui.getCore().byId(i);if(o&&I&&(!l(o,'sap/ui/core/Control')||o.getDomRef())){o.invalidate();}return o;}function f(d){var i=d.getLabelFor()||d._sAlternativeId||'';return i;}function r(o,d){var s=o.getId();var O=o.__sLabeledControl;var n=d?null:f(o);if(O==n){return;}if(!d){o.invalidate();}if(n){o.__sLabeledControl=n;}else{delete o.__sLabeledControl;}var e;if(O){e=C[O];if(e){e=e.filter(function(i){return i!=s;});if(e.length){C[O]=e;}else{delete C[O];}}}if(n){e=C[n]||[];e.push(s);C[n]=e;}var g=t(O,true);var h=t(n,true);if(g){o.detachRequiredChange(g);}if(h){o.attachRequiredChange(h);}}function c(o){if(!o){throw new Error("sap.ui.core.LabelEnablement cannot enrich null");}var m=o.getMetadata();if(!m.isInstanceOf("sap.ui.core.Label")){throw new Error("sap.ui.core.LabelEnablement only supports Controls with interface sap.ui.core.Label");}var d=m.getAssociation("labelFor");if(!d||d.multiple){throw new Error("sap.ui.core.LabelEnablement only supports Controls with a to-1 association 'labelFor'");}}function a(o){if(!o){return true;}var n=o.getMetadata().getName();return N.indexOf(n)<0;}var L={};L.writeLabelForAttribute=function(R,o){if(!o||!o.getLabelForRendering){return;}var s=o.getLabelForRendering();if(!s){return;}var d=t(s);if(d&&d.getIdForLabel){s=d.getIdForLabel();}if(s&&a(d)){R.writeAttributeEscaped("for",s);}};L.getReferencingLabels=function(e){var i=e?e.getId():null;if(!i){return[];}return C[i]||[];};L.isRequired=function(e){if(b(e)){return true;}var d=L.getReferencingLabels(e),o;for(var i=0;i<d.length;i++){o=sap.ui.getCore().byId(d[i]);if(b(o)){return true;}}return false;};function b(e){return!!(e&&e.getRequired&&e.getRequired());}L.enrich=function(o){c(o);o.__orig_setLabelFor=o.setLabelFor;o.setLabelFor=function(i){var d=this.__orig_setLabelFor.apply(this,arguments);r(this);return d;};o.__orig_exit=o.exit;o.exit=function(){this._sAlternativeId=null;r(this,true);if(o.__orig_exit){o.__orig_exit.apply(this,arguments);}};o.setAlternativeLabelFor=function(i){if(i instanceof M){i=i.getId();}else if(i!=null&&typeof i!=="string"){return this;}this._sAlternativeId=i;r(this);return this;};o.getLabelForRendering=function(){var i=this.getLabelFor()||this._sAlternativeId;var o=t(i);return a(o)?i:"";};if(!o.getMetadata().getProperty("required")){return;}o.__orig_setRequired=o.setRequired;o.setRequired=function(R){var O=this.getRequired(),d=this.__orig_setRequired.apply(this,arguments);if(this.getRequired()!==O){t(this.__sLabeledControl,true);}return d;};o.isRequired=function(){var F=t(this.getLabelForRendering(),false);return b(this)||b(F);};o.disableRequiredChangeCheck=function(n){this._bNoRequiredChangeCheck=n;};o.attachRequiredChange=function(F){if(F&&!this._bNoRequiredChangeCheck){if(F.getMetadata().getProperty("required")){F.attachEvent("_change",_,this);}this._bRequiredAttached=true;}};o.detachRequiredChange=function(F){if(F&&!this._bNoRequiredChangeCheck){if(F.getMetadata().getProperty("required")){F.detachEvent("_change",_,this);}this._bRequiredAttached=false;}};function _(e){if(e.getParameter("name")=="required"){this.invalidate();}}o.__orig_onAfterRendering=o.onAfterRendering;o.onAfterRendering=function(e){var d;if(this.__orig_onAfterRendering){d=this.__orig_onAfterRendering.apply(this,arguments);}if(!this._bNoRequiredChangeCheck&&!this._bRequiredAttached&&this.__sLabeledControl){var F=t(this.__sLabeledControl,false);this.attachRequiredChange(F);}return d;};};return L;},true);
