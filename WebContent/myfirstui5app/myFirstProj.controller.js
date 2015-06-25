sap.ui.controller("myfirstui5app.myFirstProj", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf myfirstui5app.myFirstProj
*/
//	onInit: function() {
//		alert("abcd");
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf myfirstui5app.myFirstProj
*/
//	onBeforeRendering: function() {
//		alert("abcdef");
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf myfirstui5app.myFirstProj
*/
//	onAfterRendering: function() {
//		alert("abcdeffdsfsf");
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf myfirstui5app.myFirstProj
*/
//	onExit: function() {
//
//	}
onTabSumSelect : function(oEvent) {
//alert(routeTypeCombo.getValue());
	//resetTableRowData(oTripTable, kpiRouteData);
		//alert( oRouteTable.getSelectedIndex());
		var selectedValue = oSumTabStrip.getSelectedIndex();
	},
    
	oRouteTableSelect : function(oEvent) {
		var index = oRouteTable.getSelectedIndex();
		var data = routeGraphModel[index];
		
		 var oModel = new sap.ui.model.json.JSONModel({	    	  
             businessData : data
		 });
		
		oColumnChart.setModel(oModel);
		// alert('test'+oSumTabStrip.getSelectedIndex());
		//oImage.setSrc("images/logo.PNG");
	},

	oTripTableSelect : function(oEvent) {
		var index = oTripTable.getSelectedIndex();
		var data = tripGraphModel[index];
		
		 var oModel = new sap.ui.model.json.JSONModel({	    	  
             businessData : data
		 });
		
		 oColumnTripChart.setModel(oModel);
		
	}
});