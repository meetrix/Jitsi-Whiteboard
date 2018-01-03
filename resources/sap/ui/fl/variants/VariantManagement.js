/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../transport/TransportSelection','sap/ui/model/Context','sap/ui/model/json/JSONModel','sap/ui/model/Filter','sap/ui/Device','sap/ui/core/TextAlign','sap/ui/core/InvisibleText','sap/ui/core/Control','sap/ui/core/ValueState','sap/ui/layout/HorizontalLayout','sap/ui/layout/Grid','sap/m/SearchField','sap/m/RadioButton','sap/m/ScreenSize','sap/m/PopinDisplay','sap/m/ColumnListItem','sap/m/Column','sap/m/Text','sap/m/Bar','sap/m/Table','sap/m/Page','sap/m/PlacementType','sap/m/ButtonType','sap/m/Toolbar','sap/m/ToolbarSpacer','sap/m/Button','sap/m/CheckBox','sap/m/Dialog','sap/m/Input','sap/m/Label','sap/m/ResponsivePopover','sap/m/SelectList','sap/m/ObjectIdentifier','sap/m/OverflowToolbar','sap/m/OverflowToolbarPriority','sap/m/OverflowToolbarLayoutData','sap/ui/fl/Utils','../changeHandler/BaseTreeModifier'],function(q,T,C,J,F,D,a,I,b,V,H,G,S,R,c,P,d,e,f,B,g,h,i,j,k,l,m,n,o,p,L,r,s,O,t,u,v,w,x){"use strict";var y=b.extend("sap.ui.fl.variants.VariantManagement",{metadata:{library:"sap.ui.fl",designTime:true,properties:{showExecuteOnSelection:{type:"boolean",group:"Misc",defaultValue:false},showShare:{type:"boolean",group:"Misc",defaultValue:false},showSetAsDefault:{type:"boolean",group:"Misc",defaultValue:true},showFavorites:{type:"boolean",group:"Misc",defaultValue:false},industrySolutionMode:{type:"boolean",group:"Misc",defaultValue:false},vendorLayer:{type:"boolean",group:"Misc",defaultValue:false},manualVariantKey:{type:"boolean",group:"Misc",defaultValue:false},showSave:{type:"boolean",group:"Misc",defaultValue:true},showSaveAs:{type:"boolean",group:"Misc",defaultValue:true},showManage:{type:"boolean",group:"Misc",defaultValue:true}},associations:{"for":{type:"sap.ui.core.Control",multiple:true}},events:{save:{parameters:{name:{type:"string"},overwrite:{type:"boolean"},key:{type:"string"},execute:{type:"boolean"},def:{type:"boolean"},global:{type:"boolean"},lifecyclePackage:{type:"string"},lifecycleTransportId:{type:"string"}}},manage:{}}},renderer:function(z,A){z.write("<div ");z.writeControlData(A);z.addClass("sapUiFlVarMngmt");z.writeClasses();z.write(">");z.renderControl(A.oVariantLayout);z.write("</div>");}});y.MODEL_NAME="$FlexVariants";y.INNER_MODEL_NAME="$sapUiFlVariants";y.MAX_NAME_LEN=100;y.COLUMN_NAME_IDX=1;y.prototype.init=function(){this.attachModelContextChange(this._setModel,this);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this._createInnerModel();var z=new I({text:{parts:[{path:'currentVariant',model:y.MODEL_NAME},{path:"modified",model:y.MODEL_NAME}],formatter:function(K,M){var N=this.getSelectedVariantText(K);if(M){N=this._oRb.getText("VARIANT_MANAGEMENT_MODIFIED",[N]);}return N;}.bind(this)}});var A=new L(this.getId()+"-text",{text:{path:'currentVariant',model:y.MODEL_NAME,formatter:function(K){var M=this.getSelectedVariantText(K);return M;}.bind(this)}});A.addStyleClass("sapUiFlVarMngmtText");A.addStyleClass("sapMH4Style");if(D.system.phone){A.addStyleClass("sapUiFlVarMngmtTextMaxWidth");}var E=new L(this.getId()+"-modified",{text:"*",visible:{path:"modified",model:y.MODEL_NAME,formatter:function(K){return(K===null||K===undefined)?false:K;}}});E.setVisible(false);E.addStyleClass("sapUiFlVarMngmtText");E.addStyleClass("sapUiFlVarMngmtModified");E.addStyleClass("sapMH4Style");this.oVariantPopoverTrigger=new m(this.getId()+"-trigger",{type:j.Transparent,icon:"sap-icon://arrow-down",press:function(){this._openVariantList();}.bind(this),tooltip:this._oRb.getText("VARIANT_MANAGEMENT_TRIGGER_TT")});this.oVariantPopoverTrigger.addStyleClass("sapUiFlVarMngmtTriggerBtn");this.oVariantPopoverTrigger.addAriaLabelledBy(z);this.oVariantLayout=new H({content:[A,E,this.oVariantPopoverTrigger,z]});this.oVariantLayout.addStyleClass("sapUiFlVarMngmtLayout");this.addDependent(this.oVariantLayout);};y.prototype._createInnerModel=function(){var M=new J({showManage:true,showSave:true,showSaveAs:true,showExecuteOnSelection:false,showShare:false,showSetAsDefault:true,showFavorites:false});this.setModel(M,y.INNER_MODEL_NAME);this._bindProperties();};y.prototype._bindProperties=function(){this.bindProperty("showManage",{path:"/showManage",model:y.INNER_MODEL_NAME});this.bindProperty("showSave",{path:"/showSave",model:y.INNER_MODEL_NAME});this.bindProperty("showSaveAs",{path:"/showSaveAs",model:y.INNER_MODEL_NAME});this.bindProperty("showShare",{path:"/showShare",model:y.INNER_MODEL_NAME});this.bindProperty("showExecuteOnSelection",{path:"/showExecuteOnSelection",model:y.INNER_MODEL_NAME});this.bindProperty("showShare",{path:"/showShare",model:y.INNER_MODEL_NAME});this.bindProperty("showSetAsDefault",{path:"/showSetAsDefault",model:y.INNER_MODEL_NAME});this.bindProperty("showFavorites",{path:"/showFavorites",model:y.INNER_MODEL_NAME});};y.prototype.setInitialDefaultVariantKey=function(K){this._sInitialDefaultVariantKey=K;};y.prototype.getInitialDefaultVariantKey=function(){return this._sInitialDefaultVariantKey;};y.prototype.setDefaultVariantKey=function(K){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){M.setProperty(this.oContext+"/defaultVariant",K);}};y.prototype.getDefaultVariantKey=function(){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){return M.getProperty(this.oContext+"/defaultVariant");}return null;};y.prototype.setSelectedVariantKey=function(K){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){var z=x.getSelector(this,w.getComponentForControl(this)).id;M._updateCurrentVariant(z,K);}return null;};y.prototype.getSelectedVariantKey=function(){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){return M.getProperty(this.oContext+"/currentVariant");}return null;};y.prototype.setModified=function(z){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){M.setProperty(this.oContext+"/modified",z);}};y.prototype.getModified=function(){var M=this.getModel(y.MODEL_NAME);if(M&&this.oContext){return M.getProperty(this.oContext+"/modified");}return false;};y.prototype.getSelectedVariantText=function(K){var z=this._getItemByKey(K);if(z){return z.title;}return"";};y.prototype.getStandardVariantKey=function(){var z=this._getItems();if(z&&z[0]){return z[0].key;}return null;};y.prototype._getItems=function(){var z=[];if(this.oContext&&this.oContext.getObject()){z=this.oContext.getObject().variants;}return z;};y.prototype._getItemByKey=function(K){var z=null,A=this._getItems();A.some(function(E){if(E.key===K){z=E;}return(z!=null);});return z;};y.prototype._setBindingContext=function(){var M,z;if(!this.oContext){M=this.getModel(y.MODEL_NAME);z=this.getId();var A=x.getSelector(this,w.getComponentForControl(this)).id;if(M&&z){this.oContext=new C(M,"/"+A);this.setBindingContext(this.oContext,y.MODEL_NAME);}}};y.prototype._setModel=function(){this._setBindingContext();};y.prototype._createVariantList=function(){if(!this.oContext||this.oVariantPopOver){return;}var z=new m(this.getId()+"-manage",{text:this._oRb.getText("VARIANT_MANAGEMENT_MANAGE"),enabled:true,press:function(){this._openManagementDialog();}.bind(this),layoutData:new v({priority:u.Low}),visible:{path:"/showManage",model:y.INNER_MODEL_NAME}});this.oVariantSaveBtn=new m(this.getId()+"-mainsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_SAVE"),press:function(){this._handleVariantSave();}.bind(this),enabled:{path:"modified",model:y.MODEL_NAME,formatter:function(N){return N;}},layoutData:new v({priority:u.Low}),visible:{path:"/showSave",model:y.INNER_MODEL_NAME}});this.oVariantSaveAsBtn=new m(this.getId()+"-saveas",{text:this._oRb.getText("VARIANT_MANAGEMENT_SAVEAS"),press:function(){this._openSaveAsDialog();}.bind(this),layoutData:new v({priority:u.Low}),visible:{path:"/showSaveAs",model:y.INNER_MODEL_NAME}});var A=new s(this.getId()+"-list",{selectedKey:{path:"currentVariant",model:y.MODEL_NAME},itemPress:function(N){var Q=null;if(N&&N.getParameters()){var U=N.getParameters().item;if(U){Q=U.getKey();}}if(Q){this.setSelectedVariantKey(Q);this.oVariantPopOver.close();}}.bind(this)});A.setNoDataText(this._oRb.getText("VARIANT_MANAGEMENT_NODATA"));this._oVariantList=A;var E=new sap.ui.core.Item({key:'{'+y.MODEL_NAME+">key}",text:'{'+y.MODEL_NAME+">title}"});A.bindAggregation("items",{path:"variants",model:y.MODEL_NAME,template:E});if(this.getModified()){var K=this._getItemByKey(this.getSelectedVariantKey());if(K){if(!K.readOnly||(this._isIndustrySolutionModeAndVendorLayer()&&(this.getStandardVariantKey()===K.key))){this.oVariantSaveBtn.setEnabled(true);}}}var M=new S(this.getId()+"-search");M.attachLiveChange(function(N){this._triggerSearch(N,A);}.bind(this));this.oVariantSelectionPage=new h(this.getId()+"-selpage",{subHeader:new k({content:[M]}),content:[A],footer:new t({content:[new l(this.getId()+"-spacer"),z,this.oVariantSaveBtn,this.oVariantSaveAsBtn]}),showNavButton:false,showHeader:false});this.oVariantPopOver=new r(this.getId()+"-popover",{title:this._oRb.getText("VARIANT_MANAGEMENT_VARIANTS"),contentWidth:"400px",placement:i.Bottom,content:[this.oVariantSelectionPage],afterOpen:function(){this._setTriggerButtonIcon(false);}.bind(this),afterClose:function(){this._setTriggerButtonIcon(true);}.bind(this),contentHeight:"300px"});this.oVariantPopOver.addStyleClass("sapUiFlVarMngmtPopover");if(this.oVariantPopoverTrigger.$().closest(".sapUiSizeCompact").length>0){this.oVariantPopOver.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oVariantPopOver);};y.prototype._openVariantList=function(){var z;if(this.oVariantPopOver&&this.oVariantPopOver.isOpen()){this.oVariantPopOver.close();return;}this._createVariantList();this._oVariantList.getBinding("items").filter(this._getFilters());this.oVariantSelectionPage.setShowSubHeader(this._oVariantList.getItems().length>9?true:false);this.oVariantSaveBtn.setEnabled(false);this.oVariantSaveAsBtn.setEnabled(true);if(this._isIndustrySolutionModeAndVendorLayer()&&this.getManualVariantKey()&&(this.getStandardVariantKey()===this.getCurrentVariantKey())){this.oVariantSaveBtn.setEnabled(false);this.oVariantSaveAsBtn.setEnabled(true);}if(this.getModified()){z=this._getItemByKey(this.getSelectedVariantKey());if(!z.readOnly||(this._isIndustrySolutionModeAndVendorLayer()&&(this.getStandardVariantKey()===z.key))){this.oVariantSaveBtn.setEnabled(true);}}this.oVariantPopOver.openBy(this.oVariantPopoverTrigger);};y.prototype._setTriggerButtonIcon=function(){var z;if(!D.system.phone){z=sap.ui.getCore().byId(this.oVariantPopoverTrigger.$("img")[0].id);if(z){z.toggleStyleClass("sapUiFlVarMngmtImageExpand");}}};y.prototype._triggerSearch=function(E,z){if(!E){return;}var A=E.getParameters();if(!A){return;}var K=A.newValue?A.newValue:"";var M=new F({path:"title",operator:sap.ui.model.FilterOperator.Contains,value1:K});z.getBinding("items").filter(this._getFilters(M));};y.prototype._createSaveAsDialog=function(){if(!this.oSaveAsDialog){this.oInputName=new p(this.getId()+"-name",{liveChange:function(E){this._checkVariantNameConstraints(this.oInputName,this.oSaveSave);}.bind(this)});var z=new L(this.getId()+"-namelabel",{text:this._oRb.getText("VARIANT_MANAGEMENT_NAME"),required:true});z.setLabelFor(this.oInputName);this.oDefault=new n(this.getId()+"-default",{text:this._oRb.getText("VARIANT_MANAGEMENT_SETASDEFAULT"),visible:{path:"/showSetAsDefault",model:y.INNER_MODEL_NAME},width:"100%"});this.oExecuteOnSelect=new n(this.getId()+"-execute",{text:this._oRb.getText("VARIANT_MANAGEMENT_EXECUTEONSELECT"),visible:{path:"/showExecuteOnSelection",model:y.INNER_MODEL_NAME},width:"100%"});this.oShare=new n(this.getId()+"-share",{text:this._oRb.getText("VARIANT_MANAGEMENT_SHARE"),visible:{path:"/showShare",model:y.INNER_MODEL_NAME},select:function(E){this._handleShareSelected(E);}.bind(this),width:"100%"});this.oInputManualKey=new p(this.getId()+"-key",{liveChange:function(E){this._checkVariantNameConstraints(this.oInputManualKey);}.bind(this)});this.oLabelKey=new L(this.getId()+"-keylabel",{text:this._oRb.getText("VARIANT_MANAGEMENT_KEY"),required:true});this.oLabelKey.setLabelFor(this.oInputManualKey);this.oSaveSave=new m(this.getId()+"-variantsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_OK"),press:function(){this._bSaveCanceled=false;this._handleVariantSaveAs(this.oInputName.getValue());}.bind(this),enabled:true});var A=new G({defaultSpan:"L6 M6 S12"});if(this.getShowSetAsDefault()){A.addContent(this.oDefault);}if(this.getShowShare()){A.addContent(this.oShare);}if(this.getShowExecuteOnSelection()){A.addContent(this.oExecuteOnSelect);}this.oSaveAsDialog=new o(this.getId()+"-savedialog",{title:this._oRb.getText("VARIANT_MANAGEMENT_SAVEDIALOG"),beginButton:this.oSaveSave,endButton:new m(this.getId()+"-variantcancel",{text:this._oRb.getText("VARIANT_MANAGEMENT_CANCEL"),press:function(){this._bSaveCanceled=true;this.oSaveAsDialog.close();}.bind(this)}),content:[z,this.oInputName,this.oLabelKey,this.oInputManualKey,A],stretch:D.system.phone,afterOpen:function(){this._setTriggerButtonIcon(false);}.bind(this),afterClose:function(){this._setTriggerButtonIcon(true);}.bind(this)});this.oSaveAsDialog.addStyleClass("sapUiPopupWithPadding");this.oSaveAsDialog.addStyleClass("sapUiFlVarMngmtSaveDialog");if(this.oVariantPopoverTrigger.$().closest(".sapUiSizeCompact").length>0){this.oSaveAsDialog.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oSaveAsDialog);}};y.prototype._openSaveAsDialog=function(){this._createSaveAsDialog();this.oInputName.setValue(this.getSelectedVariantText(this.getSelectedVariantKey()));this.oSaveSave.setEnabled(false);this.oInputName.setEnabled(true);this.oInputName.setValueState(V.None);this.oInputName.setValueStateText(null);this.oDefault.setSelected(false);this.oShare.setSelected(false);this.oExecuteOnSelect.setSelected(false);if(this._isIndustrySolutionModeAndVendorLayer()&&this.getManualVariantKey()){this.oInputName.setValue(this._oRb.getText("VARIANT_MANAGEMENT_STANDARD"));this.oInputName.setEnabled(false);}if(this.oVariantPopOver){this.oVariantPopOver.close();}this.sTransport=null;this.sPackage=null;if(this.getManualVariantKey()){this.oInputManualKey.setVisible(true);this.oInputManualKey.setEnabled(true);this.oInputManualKey.setValueState(V.None);this.oInputManualKey.setValueStateText(null);this.oLabelKey.setVisible(true);}else{this.oInputManualKey.setVisible(false);this.oLabelKey.setVisible(false);}this.oSaveAsDialog.open();};y.prototype._handleVariantSaveAs=function(N){var K=null,z=N.trim(),M=this.oInputManualKey.getValue().trim(),A="",E="";if(z==""){this.oInputName.setValueState(V.Error);this.oInputName.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));return;}if(this.getManualVariantKey()){if(M==""){this.oInputManualKey.setValueState(V.Error);this.oInputManualKey.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));return;}K=M;}if(this.oSaveAsDialog){this.oSaveAsDialog.close();}if(this.oDefault.getSelected()){this.setDefaultVariantKey(K);}if(this.oShare.getSelected()){E=this.sPackage;A=this.sTransport;}this.setModified(false);this.fireSave({key:K,name:z,overwrite:false,def:this.oDefault.getSelected(),execute:this.oExecuteOnSelect.getSelected(),global:this.oShare.getSelected(),lifecyclePackage:E,lifecycleTransportId:A});};y.prototype._handleVariantSave=function(){var z=this._getItemByKey(this.getSelectedVariantKey());var A=false;if(this.getDefaultVariantKey()===z.key){A=true;}if(z.global){var E=function(M,N){if(this.oVariantPopOver){this.oVariantPopOver.close();}this.sPackage=M;this.sTransport=N;this.fireSave({name:z.title,overwrite:true,key:z.key,def:A,global:this._isIndustrySolutionModeAndVendorLayer(),lifecyclePackage:this.sPackage,lifecycleTransportId:this.sTransport});}.bind(this);var K=function(M){this.sTransport=null;this.sPackage=null;}.bind(this);this._assignTransport(z,E,K);}else{if(this.oVariantPopOver){this.oVariantPopOver.close();}this.fireSave({name:z.title,overwrite:true,key:z.key,def:A});}this.setModified(false);};y.prototype._handleShareSelected=function(E){this.sTransport=null;this.sPackage=null;if(E.getParameters().selected){var z=function(K,M){this.sTransport=M;this.sPackage=K;}.bind(this);var A=function(K){this.oShare.setSelected(false);this.sTransport=null;this.sPackage=null;}.bind(this);this._assignTransport(null,z,A);}};y.prototype.openManagementDialog=function(z){if(z&&this.oManagementDialog){this.oManagementDialog.destroy();this.oManagementDialog=undefined;}this._openManagementDialog();};y.prototype._createManagementDialog=function(){var z;if(!this.oManagementDialog){z=new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_ADD_FAV")}),width:"4rem",visible:{path:"/showFavorites",model:y.INNER_MODEL_NAME}});z.getHeader().setTooltip(this._oRb.getText("VARIANT_MANAGEMENT_ADD_FAV_TOOLTIP"));this.oManagementTable=new g(this.getId()+"-managementTable",{growing:true,columns:[z,new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_NAME")}),width:"14rem"}),new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_VARIANTTYPE")}),width:"8rem",demandPopin:true,popinDisplay:P.Inline,minScreenWidth:c.Tablet,visible:{path:"/showShare",model:y.INNER_MODEL_NAME}}),new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_DEFAULT")}),width:"4rem",demandPopin:true,popinDisplay:P.Inline,minScreenWidth:c.Tablet,visible:{path:"/showSetAsDefault",model:y.INNER_MODEL_NAME}}),new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_EXECUTEONSELECT")}),width:"5rem",hAlign:a.Center,demandPopin:true,popinDisplay:P.Inline,minScreenWidth:"800px",visible:{path:"/showExecuteOnSelection",model:y.INNER_MODEL_NAME}}),new e({header:new f({text:this._oRb.getText("VARIANT_MANAGEMENT_AUTHOR")}),width:"8rem",demandPopin:true,popinDisplay:P.Inline,minScreenWidth:"900px"}),new e({width:"2rem",hAlign:a.Center}),new e({visible:false})]});this.oManagementSave=new m(this.getId()+"-managementsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_OK"),enabled:true,press:function(){this._handleManageSavePressed();}.bind(this)});this.oManagementCancel=new m(this.getId()+"-managementcancel",{text:this._oRb.getText("VARIANT_MANAGEMENT_CANCEL"),press:function(){this.oManagementDialog.close();this._handleManageCancelPressed();}.bind(this)});this.oManagementDialog=new o(this.getId()+"-managementdialog",{customHeader:new B(this.getId()+"-managementHeader",{contentMiddle:[new f(this.getId()+"-managementHeaderText",{text:this._oRb.getText("VARIANT_MANAGEMENT_MANAGEDIALOG")})]}),beginButton:this.oManagementSave,endButton:this.oManagementCancel,content:[this.oManagementTable],stretch:D.system.phone,afterOpen:function(){this._setTriggerButtonIcon(false);}.bind(this),afterClose:function(){this._setTriggerButtonIcon(true);}.bind(this)});if(this.oVariantPopoverTrigger.$().closest(".sapUiSizeCompact").length>0){this.oManagementDialog.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oManagementDialog);this.oManagementTable.bindAggregation("items",{path:"variants",model:y.MODEL_NAME,factory:this._templateFactoryManagementDialog.bind(this)});this.oManagementTable.getBinding("items").filter(this._getFilterNotDeleted());this._bDeleteOccured=false;}};y.prototype._templateFactoryManagementDialog=function(z,A){var E=null,K,M,N,Q,U=A.getObject();if(!U){return undefined;}var W=function(b1){this._checkVariantNameConstraints(b1.oSource,this.oManagementSave,b1.oSource.getBindingContext(y.MODEL_NAME).getObject().key);}.bind(this);var X=function(b1){this._handleManageTitleChanged(b1.oSource.getBindingContext(y.MODEL_NAME).getObject());}.bind(this);var Y=function(b1){if(b1.getParameters().selected===true){this._handleManageDefaultVariantChange(b1.oSource.getBindingContext(y.MODEL_NAME).getObject());}}.bind(this);var Z=function(b1){this._handleManageExecuteOnSelectionChanged(b1.oSource.getBindingContext(y.MODEL_NAME).getObject());}.bind(this);var $=function(b1){this._handleManageDeletePressed(b1.oSource.getBindingContext(y.MODEL_NAME).getObject());}.bind(this);var _=function(b1){this._handleManageFavoriteChanged(b1.oSource.getBindingContext(y.MODEL_NAME).getObject());}.bind(this);if(U.key!==this.getStandardVariantKey()){if(U.readOnly){E=this._oRb.getText("VARIANT_MANAGEMENT_WRONG_LAYER");}else if(U.textReadOnly){E=this._oRb.getText("VARIANT_MANAGEMENT_WRONG_LANGUAGE");}}if((U.key===this.getStandardVariantKey())||U.readOnly||U.textReadOnly){Q=new O({title:'{'+y.MODEL_NAME+">title}"});if(E){Q.setTooltip(E);}}else{Q=new p({liveChange:W,change:X,value:'{'+y.MODEL_NAME+">title}"});}M=new m({icon:"sap-icon://sys-cancel",enabled:true,type:j.Transparent,press:$,tooltip:this._oRb.getText("VARIANT_MANAGEMENT_DELETE"),visible:!U.readOnly});this._assignColumnInfoForDeleteButton(M);K=(U.readOnly===false);N=this.oContext.getPath();var a1=new d({cells:[new n({enabled:{path:N+'/defaultVariant',model:y.MODEL_NAME,formatter:function(b1){var c1=(U.readOnly===false);if(U.key===b1){c1=false;if(!U.favorite){this.setSelected(true);}}return c1;}},select:_,selected:'{'+y.MODEL_NAME+">favorite}"}),Q,new f({text:this._oRb.getText(U.global?"VARIANT_MANAGEMENT_SHARED":"VARIANT_MANAGEMENT_PRIVATE"),wrapping:false}),new R({groupName:this.getId(),select:Y,selected:{path:N+"/defaultVariant",model:y.MODEL_NAME,formatter:function(b1){return(U.key===b1)?true:false;}}}),new n({enabled:K,select:Z,selected:'{'+y.MODEL_NAME+">executeOnSelect}"}),new f({text:'{'+y.MODEL_NAME+">author}",textAlign:"Begin"}),M,new f({text:'{'+y.MODEL_NAME+">key}"})]});return a1;};y.prototype._openManagementDialog=function(){this._createManagementDialog();this.setInitialDefaultVariantKey(this.getDefaultVariantKey());if(this.oVariantPopOver){this.oVariantPopOver.close();}this.oManagementSave.setEnabled(false);if(this._bDeleteOccured){this._bDeleteOccured=false;this.oManagementTable.bindAggregation("items",{path:"variants",model:y.MODEL_NAME,factory:this._templateFactoryManagementDialog.bind(this)});this.oManagementTable.getBinding("items").filter(this._getFilterNotDeleted());}this.oManagementDialog.open();};y.prototype._assignColumnInfoForDeleteButton=function(z){if(!this._oInvisibleDeleteColumnName){this._oInvisibleDeleteColumnName=new I({text:this._oRb.getText("VARIANT_MANAGEMENT_ACTION_COLUMN")});this.oManagementDialog.addContent(this._oInvisibleDeleteColumnName);}if(this._oInvisibleDeleteColumnName){z.addAriaLabelledBy(this._oInvisibleDeleteColumnName);}};y.prototype._handleManageDefaultVariantChange=function(z){var K=z.key;if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}this.setDefaultVariantKey(K);};y.prototype._handleManageCancelPressed=function(){var z,A=this._getItems(),M;A.forEach(function(E){E.toBeDeleted=false;E.title=E.originalTitle;E.favorite=E.originalFavorite;E.executeOnSelection=E.originalExecuteOnSelection;});z=this.getInitialDefaultVariantKey();if(z!==this.getDefaultVariantKey()){this.setDefaultVariantKey(z);}M=this.getModel(y.MODEL_NAME);if(M){M.checkUpdate();}};y.prototype._handleManageFavoriteChanged=function(z){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}if(z.global){var A=function(K,M){z.lifecyclePackage=K;z.lifecycleTransportId=M;};var E=function(K){z.favorite=z.originalFavorite;};this._assignTransport(z,A,E);}};y.prototype._handleManageDeletePressed=function(z){var M,K=z.key;if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}z.toBeDeleted=true;if((K===this.getDefaultVariantKey())){this.setDefaultVariantKey(this.getStandardVariantKey());}if(z.global){var A=function(N,Q){z.lifecyclePackage=N;z.lifecycleTransportId=Q;};var E=function(N){z.toBeDeleted=false;};this._assignTransport(z,A,E);}M=this.getModel(y.MODEL_NAME);if(M){M.checkUpdate();}};y.prototype._handleManageExecuteOnSelectionChanged=function(z){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}if(z.global){var A=function(K,M){z.lifecyclePackage=K;z.lifecycleTransportId=M;};var E=function(K){z.executeOnSelection=z.originalExecuteOnSelection;};this._assignTransport(z,A,E);}};y.prototype._handleManageTitleChanged=function(z){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}if(!z.title.localeCompare(z.originalTitle)){if(z.global){var A=function(K,M){z.lifecyclePackage=K;z.lifecycleTransportId=M;};var E=function(K){z.title=z.originalTitle;};this._assignTransport(z,A,E);}}};y.prototype._handleManageSavePressed=function(){var z=this._getItems();this.fireManage();this.oManagementDialog.close();z.some(function(A){if(A.toBeDeleted){this._bDeleteOccured=true;if(A.key===this.getSelectedVariantKey()){this.setModified(false);this.setSelectedVariantKey(this.getStandardVariantKey());return true;}}return false;}.bind(this));};y.prototype._anyInErrorState=function(M){var z,A,E=false;if(M){z=M.getItems();z.some(function(K){A=K.getCells()[y.COLUMN_NAME_IDX];if(A&&A.getValueState&&(A.getValueState()===V.Error)){E=true;}return E;});}return E;};y.prototype._getFilters=function(z){var A=[];if(z){A.push(z);}A.push(this._getFilterNotDeleted());if(this.getShowFavorites()){A.push(this._getFilterFavorites());}return A;};y.prototype._getFilterNotDeleted=function(){return new F({path:"toBeDeleted",operator:sap.ui.model.FilterOperator.NE,value1:true});};y.prototype._getFilterFavorites=function(){return new F({path:"favorite",operator:sap.ui.model.FilterOperator.EQ,value1:true});};y.prototype._checkVariantNameConstraints=function(z,A,K){if(!z){return;}var E=z.getValue();E=E.trim();if(!this._checkIsDuplicate(E,K)){if(E===""){z.setValueState(V.Error);z.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));}else if(E.length>y.MAX_NAME_LEN){z.setValueState(V.Error);z.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_MAX_LEN",[y.MAX_NAME_LEN]));}else{z.setValueState(V.None);z.setValueStateText(null);}}else{z.setValueState(V.Error);z.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_DUPLICATE"));}if(A){if(z.getValueState()===V.Error){A.setEnabled(false);}else{A.setEnabled(true);}}};y.prototype._checkIsDuplicate=function(z,K){var A=false,E=this._getItems(),M=z.toLowerCase();E.some(function(N){if(N.title.toLowerCase()===M){if(K&&(K===N.key)){return false;}A=true;}return A;});return A;};y.prototype._isIndustrySolutionModeAndVendorLayer=function(){if(this.getIndustrySolutionMode()&&this.getVendorLayer()){return true;}return false;};y.prototype._assignTransport=function(z,A,E){var K=null;var M={type:"variant",name:"",namespace:"","package":""};if(z){M["package"]=z.lifecyclePackage;M["name"]=z.key;M["namespace"]=z.namespace;K=z.lifecycleTransportId;}var _=function(W){A(W.getParameters().selectedPackage,W.getParameters().selectedTransport);};var N=function(W){E(W);};if(K!=null&&K.trim().length>0){A(M["package"],K);}else{var Q=false;if(this.oVariantPopoverTrigger.$().closest(".sapUiSizeCompact").length>0){Q=true;}var U=new T();U.selectTransport(M,_,N,Q);}};y.prototype.exit=function(){if(this.oDefault&&!this.oDefault._bIsBeingDestroyed){this.oDefault.destroy();}this.oDefault=undefined;if(this.oShare&&!this.oShare._bIsBeingDestroyed){this.oShare.destroy();}this.oShare=undefined;if(this.oExecuteOnSelect&&!this.oExecuteOnSelect._bIsBeingDestroyed){this.oExecuteOnSelect.destroy();}this.oExecuteOnSelect=undefined;this.oVariantPopoverTrigger=undefined;this._oRb=undefined;this.oContext=undefined;this._oVariantList=undefined;this.oVariantSelectionPage=undefined;};return y;},true);