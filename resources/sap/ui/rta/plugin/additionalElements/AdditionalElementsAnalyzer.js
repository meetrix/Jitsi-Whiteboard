/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/StashedControlSupport','sap/ui/dt/ElementUtil','sap/ui/rta/Utils','sap/ui/rta/util/BindingsExtractor'],function(q,S,E,R,B){"use strict";function _(P,i){var j=q.extend({},P);j.entityName=i.name;var l=P["com.sap.vocabularies.Common.v1.Label"];j.fieldLabel=l&&l.String;var Q=P["com.sap.vocabularies.Common.v1.QuickInfo"];j.quickInfo=Q&&Q.String;var F=P["com.sap.vocabularies.Common.v1.FieldControl"];j.visible=!(F&&F.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden");return j;}function a(P){if(P&&P.type){if(P.type.toLowerCase().indexOf("edm")!==0){return true;}}return false;}function b(O,M,i){return O.reduce(function(j,P){var v=_(P,i);if(a(v)){var C=M.getODataComplexType(v.type);v=C.property.map(function(l){l=_(l,i);l.bindingPath=v.name+"/"+l.name;l.referencedComplexPropertyName=v.fieldLabel||v.name;return l;});}else{v.bindingPath=P.name;}return j.concat(v);},[]);}function c(O,i){return O.filter(function(P){return P.visible;}).filter(function(P){var F=P["com.sap.vocabularies.Common.v1.FieldControl"];var j=F&&F.Path;if(j){var l=i.getBindingContext().getProperty(j);return l!==0;}return true;});}function d(i){var M=i.getModel();var D={property:[],navigationProperty:[],navigationEntityNames:[]};if(M){var j=M.getMetadata().getName();if(j==="sap.ui.model.odata.ODataModel"||j==="sap.ui.model.odata.v2.ODataModel"){var l=M.getMetaModel();return l.loaded().then(function(){var t=i.getBindingContext();if(t){var u=t.getPath();var v=l.getMetaContext(u);var O=v.getObject();D.property=O.property||[];D.property=b(D.property,l,O);D.property=c(D.property,i);if(O.navigationProperty){D.navigationProperty=O.navigationProperty;O.navigationProperty.forEach(function(N){var F=l.getODataAssociationEnd(O,N.name)&&l.getODataAssociationEnd(O,N.name).type;var w=l.getODataEntityType(F);if(w&&w.name){if(D.navigationEntityNames.indexOf(w.name)===-1){D.navigationEntityNames.push(w.name);}}});}}return D;});}}return Promise.resolve(D);}function e(O){return{selected:false,label:O.fieldLabel||O.name,referencedComplexPropertyName:O.referencedComplexPropertyName?O.referencedComplexPropertyName:"",duplicateComplexName:O.duplicateComplexName?O.duplicateComplexName:false,tooltip:O.quickInfo||O.fieldLabel,originalLabel:"",type:"odata",entityType:O.entityName,name:O.name,bindingPath:O.bindingPath};}function f(D){var i=D.element;var j=D.action;return{selected:false,label:R.getLabelForElement(i,j.getLabel),tooltip:R.getLabelForElement(i,j.getLabel),referencedComplexPropertyName:i.referencedComplexPropertyName?i.referencedComplexPropertyName:"",duplicateComplexName:i.duplicateComplexName?i.duplicateComplexName:false,bindingPaths:i.bindingPaths,originalLabel:i.renamedLabel&&i.fieldLabel!==i.labelFromOData?i.labelFromOData:"",type:"invisible",element:i};}function g(i,j){if(j){var l=R.getEntityTypeByPath(i.getModel(),i.getBindingContext().getPath());return E.findAllSiblingsInContainer(i,j).filter(function(t){return R.getEntityTypeByPath(t.getModel(),t.getBindingContext().getPath())===l;});}else{return[i];}}function h(O){O.forEach(function(i,l,O){if(i["duplicateComplexName"]!==true){for(var j=l+1;j<O.length-1;j++){if(i.fieldLabel===O[j].fieldLabel){i["duplicateComplexName"]=true;O[j]["duplicateComplexName"]=true;}}}});return O;}function k(i,O){return O.some(function(D){return D.fieldLabel===i.fieldLabel;});}function m(I,M){I.bindingPaths=[];I.bindingContextPaths=[];var j=B.getBindings(I,M);for(var i=0,l=j.length;i<l;i++){if(j[i].getPath&&j[i].getPath()){if(I.bindingPaths.indexOf(j[i].getPath())===-1){I.bindingPaths.push(j[i].getPath());}}if(j[i].getContext&&j[i].getContext()){if(I.bindingContextPaths.indexOf(j[i].getContext().getPath())===-1){I.bindingContextPaths.push(j[i].getContext().getPath());}}}return I;}function n(i){return Array.isArray(i)&&i.length>0;}function o(i,N,j,l){var t=n(i)&&i.some(function(P){var v=P.trim().replace(/^\//gi,'').split('/');if(v.length>1){return N.indexOf(v.shift())!==-1;}});var u=l.some(function(C){C=C.match(/^\/?([A-Za-z0-9_]+)/)[0];return(j.indexOf(C)>=0);});return t||u;}function p(i,O){return O.filter(function(D){return i.indexOf(D.bindingPath)!==-1;}).pop();}function r(i,O){i.labelFromOData=O.fieldLabel;if(i.fieldLabel!==i.labelFromOData){i.renamedLabel=true;}if(O.referencedComplexPropertyName){i.referencedComplexPropertyName=O.referencedComplexPropertyName;}}function s(i,O,N,j){var l=i.bindingPaths,t=i.bindingContextPaths,u;return(!n(l)||o(l,N,j,t)||((u=p(l,O))&&(r(i,u)||true)));}var A={enhanceInvisibleElements:function(P,i){var M=P.getModel();var j=i.reveal;var l=i.addODataProperty;return Promise.resolve().then(function(){return d(P);}).then(function(D){var O=D.property;var t=D.navigationProperty.map(function(N){return N.name;});var u=D.navigationEntityNames;O=h(O);var v=[];var I=j.elements||[];I.forEach(function(w){var T=w.getMetadata().getName();var x=j.types[T].action;var y=true;if(P.getBindingContext()===w.getBindingContext()){w=m(w,M);w.fieldLabel=R.getLabelForElement(w,x.getLabel);w.duplicateComplexName=k(w,O);if(l&&O.length>0){y=s(w,O,t,u);}}else if(w.getParent()&&w.getBindingContext()===w.getParent().getBindingContext()&&B.getBindings(w,M).length>0){y=false;}if(y){v.push({element:w,action:x});}});return v;}).then(function(t){return t.map(f);});},getUnboundODataProperties:function(i,j){var M=i.getModel();return Promise.resolve().then(function(){return d(i);}).then(function(D){var O=D.property;var l=g(i,j.relevantContainer);var t=[];l.forEach(function(i){t=t.concat(B.getBindings(i,M));});var F=j.action.filter?j.action.filter:function(){return true;};O=O.filter(function(u){var H=false;if(t){H=t.some(function(v){return!!v.getPath&&(v.getPath()===u.bindingPath);});}return!H&&F(j.relevantContainer,u);});O=h(O);return O;}).then(function(u){return u.map(e);});}};return A;});
