sap.ui.jsview("myfirstui5app.myFirstProj", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf myfirstui5app.myFirstProj
	*/ 
	getControllerName : function() {
		return "myfirstui5app.myFirstProj";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf myfirstui5app.myFirstProj
	*/ 
	createContent : function(oController) {
		var oSampleShell, mContent = {};
		oSampleShell = new sap.ui.ux3.Shell(
				"idoSampleShell",
				{
					showSearchTool : false,
					showInspectorTool : false,
					showFeederTool : false,
					appTitle : "",
					appIcon : "images/ashokleyland_logo.jpg",
					appIconTooltip : "",
					showLogoutButton : true,
					worksetItems : [
							new sap.ui.ux3.NavigationItem(
									"idNavItemSummary11",
									{
										key : "keyNavItemSummary1",
										text : "Trip Management"
									}),
							
							 ],
					headerItems : [ new sap.ui.commons.TextView(
							"idUserName1", {
								text : "Welcome Fleet Manager",
								tooltip : "U.Name"
							}) ],

					logout : function() {
						//alert("Logout Button has been clicked.\nThe application can now do whatever is required.\nThis example page will just clear the screen.");
						oSampleShell.forceInvalidation();
						oSampleShell.destroy();
						sap.ui.getCore().applyChanges();
						jQuery(document.body)
								.html(
										"<span>Logout had been pressed, screen has been cleared.</span>");
					}
				});
		oSampleShell.attachWorksetItemSelected(function(oEvent) {
			var key = oEvent.getParameter("key");
			oSampleShell.setContent(oController.oView
							.populateContent(mContent, key,
									oController));
		});
		
		//oShell.addHeaderItem (new sap.ui.commons.Label("l1", {text: "TEST"}));
		//oShell.setHeaderType ();

		oSampleShell.setContent(oController.oView.populateContent(
				mContent, "keyNavItemSummary1", oController));
		return oSampleShell;
		
	},
	populateContent : function(mContent, key, oController) {
		if (mContent[key])
			return mContent[key];
		if (key === "keyNavItemSummary1") {
			mContent[key] = this.getSummaryNavItem1(oController);
			
		} 
		
		return mContent[key];
		
	},
	getSummaryNavItem1 : function(oController) {

		// create route selection combo box
		var routeFilterLabel = new sap.ui.commons.Label("idrouteFilterLabel",{text:"Route:", labelFor: routeTypeCombo});
		routeTypeCombo = new sap.ui.commons.ComboBox("idcbRouteType");
		routeTypeCombo.setTooltip("Route Type");
		routeTypeCombo.setWidth("90%");
		// Add items to combo box
		dataForSumDropDown('BLR-DELHI-10:00am','one',routeTypeCombo,'id1');
		routeTypeCombo.setSelectedKey ('one');
		dataForSumDropDown('BLR-DELHI-11:30am','two',routeTypeCombo,'id2');
		dataForSumDropDown('BLR-DELHI-20:00pm','three',routeTypeCombo,'id3');
		// create a Travel DatePicker	
		var travelDateLabel = new sap.ui.commons.Label("idtravelDateLabel",{text:"Date:", labelFor: travelDatePicker});
		var travelDatePicker = new sap.ui.commons.DatePicker('idTravelDatePicker', {
			value : {	path : "/dateValue",
						type : new sap.ui.model.type.Date({
						pattern : "yyyy-MM-dd"
					})
			}
		}
		);
		// DpSumFromDate.setYyyymmdd(todaydateStr);
		var todaydateSum = new Date();
		var todaydateSumStr = todaydateSum.getFullYear() + '-'
							  + ("0" + (todaydateSum.getMonth() + 1).toString()).substr(-2) + '-'
							  + ("0" + todaydateSum.getDate().toString()).substr(-2);
		
		travelDatePicker.setYyyymmdd(todaydateSumStr);
		travelDatePicker.setLocale("en-IN"); // Try with "de" or "fr"
		// instead!
		travelDatePicker.setWidth("90%");
		travelDatePicker.attachChange(function(oEvent) {
			var data = kpiData[routeTypeCombo.getValue()];
			resetTableRowData(oRouteTable, data);
			var data1 = kpiRouteData[routeTypeCombo.getValue()];
			resetTableRowData(oTripTable, data1);
			if (oEvent.getParameter("invalidValue")) {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
			} else {
				oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			}
		});		 
		//Define some sample data 
		 oRouteTable = new sap.ui.table.Table({
				id: "idoRouteTable",
				visibleRowCount: 6,
				firstVisibleRow: 2,
				rowSelectionChange: oController.oRouteTableSelect,
				selectionMode: sap.ui.table.SelectionMode.Single,
				selectionBehavior: sap.ui.table.SelectionBehavior.Row 
			});
			 
			//Define the columns and the control templates to be used
			var oColumn = new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Measure"}),
				template: new sap.ui.commons.TextView().bindProperty("text", "Measure"),
				sortProperty: "Measure",
				filterProperty: "Measure",
				width: "17%"
			});
			var oCustomMenu = new sap.ui.commons.Menu();
			oCustomMenu.addItem(new sap.ui.commons.MenuItem({
				text:"Custom Menu",
				select:function() {
					//alert("Custom Menu");
				}
			}));
			oColumn.setMenu(oCustomMenu);
			oRouteTable.addColumn(oColumn);
			var columnUnit = new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Actual"}),
				template: new sap.ui.commons.TextView().bindProperty("text", "Actual"),
				sortProperty: "Actual",
				filterProperty: "Actual",
				width: "6%"
			});
			oRouteTable.addColumn(columnUnit);
			var columnActual = new sap.ui.table.Column({
					label: new sap.ui.commons.Label({text: "Benchmark"}),
					template: new sap.ui.commons.TextView().bindProperty("text", "Benchmark"),
					sortProperty: "Benchmark",
					filterProperty: "Benchmark",
					width: "9%"
			});
			oRouteTable.addColumn(columnActual);
					
			var columnIndicator = new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Indicator"}),
				template: new sap.ui.commons.Image().bindProperty("src", "src"),
				width: "9%",	
				hAlign: "Center"
			});
			oRouteTable.addColumn(columnIndicator);
			
			//Create a model and bind the table rows to this model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({modelData: aData});
			oRouteTable.setModel(oModel);
			oRouteTable.bindRows("/modelData");

			//Initially sort the table
			oRouteTable.sort(oRouteTable.getColumns()[0]);
		
			//Assigning default Value			
			defaultData;
			for(var key in kpiData) {
				if(kpiData.hasOwnProperty(key)) {
					defaultData = kpiData[key];
					break;
				}
			}			
			resetTableRowData(oRouteTable, defaultData);
			

			//Define some sample data 
			var aData =[
	        {"kPIName":"Call Volume",
	     	   "unit":"%",
	     	   "actual":"42",
	     	   "planned":"45",
	     	   "difference":"3",
	     	   "per_difference":"36",
	     	   "src":"images/person1.gif"}
	        ];

			oTripTable = new sap.ui.table.Table({
					id: "idoTripTable" ,
					visibleRowCount: 5,
					firstVisibleRow: 2,
					editable:true,
					rowSelectionChange: oController.oTripTableSelect,
					selectionMode: sap.ui.table.SelectionMode.Single,
					selectionBehavior: sap.ui.table.SelectionBehavior.Row 
				});
			
				//Define the columns and the control templates to be used
				var oColumn = new sap.ui.table.Column({
					label: new sap.ui.commons.Label({text: "Trip Profitablity"}),
					template: new sap.ui.commons.TextView().bindProperty("text", "TripProfitablity"),
					sortProperty: "Trip Profitablity",
					filterProperty: "Trip Profitablity",
					width: "17%"
				});
				var oCustomMenu = new sap.ui.commons.Menu();
				oCustomMenu.addItem(new sap.ui.commons.MenuItem({
					text:"Custom Menu",
					select:function() {
						//alert("Custom Menu");
					}
				}));
				oColumn.setMenu(oCustomMenu);
				oTripTable.addColumn(oColumn);
				var columnUnit = new sap.ui.table.Column({
					label: new sap.ui.commons.Label({text: "Actual"}),
					template: new sap.ui.commons.TextField().bindProperty("value", "Actual"),
					sortProperty: "Actual",
					filterProperty: "Actual",
					width: "6%"
				});
				oTripTable.addColumn(columnUnit);
				var columnActual = new sap.ui.table.Column({
						label: new sap.ui.commons.Label({text: "Benchmark"}),
						template: new sap.ui.commons.TextField().bindProperty("value", "Benchmark"),
						sortProperty: "Benchmark",
						filterProperty: "Benchmark",
						width: "9%"
				});
				oTripTable.addColumn(columnActual);
							
				var columnIndicator = new sap.ui.table.Column({
					label: new sap.ui.commons.Label({text: "Indicator"}),
					template: new sap.ui.commons.Image().bindProperty("src", "src"),
					width: "9%",	
					hAlign: "Center"
				});
				oTripTable.addColumn(columnIndicator);
				
				//Create a model and bind the table rows to this model
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({modelData: aData});
				oTripTable.setModel(oModel);
				oTripTable.bindRows("/modelData");

				//Initially sort the table
				oTripTable.sort(oTripTable.getColumns()[0]);
			//	oTripTable.setSelectionInterval(0,0);*/
				var data1 = kpiRouteData[routeTypeCombo.getValue()];
				resetTableRowData(oTripTable, data1);
			
				  // some business data 
			       var oModel = new sap.ui.model.json.JSONModel({
			    	  
			              businessData : [
										{date :"January",benchmark:1,actual:1.5,},
										{date :"Febrary",benchmark:2,actual:1},
										{date :"March",benchmark:2,actual:1.6},
										{date :"April",benchmark:1.8,actual:2},
										{date :"May",benchmark:2,actual:1},
										{date :"June",benchmark:3,actual:2} 
			              ]
			      });  
			       
			        extraMesure = oTrendGraphWithOutPlanned;
			  // A Dataset defines how the model data is mapped to the chart 
			       oDataset = new sap.viz.ui5.data.FlattenedDataset({
			              // a Bar Chart requires exactly one dimension (x-axis) 
			              dimensions : [ 
			                      {
			                              axis : 1, // must be one for the x-axis, 2 for y-axis
			                              name : 'date', //date
			                              value : "{date}"
			                      } 
			              ],
			              // it can show multiple measures, each results in a new set of bars in a new color 
			              measures : extraMesure,
			              // 'data' is used to bind the whole data collection that is to be displayed in the chart 
			              data : {
			                      path : "/businessData"
			              }
			      });

			  // create a Bar chart
			  // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
			  // for Donut and Pie please remove one of the two measures in the above Dataset.  
			       oColumnChart = new sap.viz.ui5.Line({
			              width : "100%",
			              height : "270px",
			              plotArea : {
			              //'colorPalette' : d3.scale.category20().range()
			              },
			              title : {},
			              dataset : oDataset
			      });
			      // attach the model to the chart and display it
			      oColumnChart.setModel(oModel);
			      
			      // some business data 
			       var oModel = new sap.ui.model.json.JSONModel({
			    	  
			              businessData : [
										{date :"January",benchmark:1,actual:1.5,},
										{date :"Febrary",benchmark:2,actual:1},
										{date :"March",benchmark:2,actual:1.6},
										{date :"April",benchmark:1.8,actual:2},
										{date :"May",benchmark:2,actual:1},
										{date :"June",benchmark:3,actual:2} 
			              ]
			      });  
			       
			        extraMesure = oTrendGraphWithOutPlanned;
			  // A Dataset defines how the model data is mapped to the chart 
			       oDataset = new sap.viz.ui5.data.FlattenedDataset({
			              // a Bar Chart requires exactly one dimension (x-axis) 
			              dimensions : [ 
			                      {
			                              axis : 1, // must be one for the x-axis, 2 for y-axis
			                              name : 'date', //date
			                              value : "{date}"
			                      } 
			              ],
			              // it can show multiple measures, each results in a new set of bars in a new color 
			              measures : extraMesure,
			              // 'data' is used to bind the whole data collection that is to be displayed in the chart 
			              data : {
			                      path : "/businessData"
			              }
			      });

			  // create a Bar chart
			  // you also might use Combination, Line, StackedColumn100, StackedColumn or Column
			  // for Donut and Pie please remove one of the two measures in the above Dataset.  
			       oColumnTripChart = new sap.viz.ui5.Line({
			              width : "100%",
			              height : "270px",
			              plotArea : {
			              //'colorPalette' : d3.scale.category20().range()
			              },
			              title : {},
			              dataset : oDataset
			      });
			      // attach the model to the chart and display it
			      oColumnTripChart.setModel(oModel);

			// Create a TabStrip instance
//			oSumTabStrip = new sap.ui.commons.TabStrip({
//					//"idTabStrip"
//					id: "idSumTabStrip" ,
//					select: oController.onTabSumSelect
//			});
//
//				oSumTabStrip.createTab( "Key Performance Indicators",oRouteTable);
//				oSumTabStrip.createTab( "Trip Profitability",oTripTable);
//				
				oImage = new sap.ui.commons.Image("routeMap");
				oImage.setSrc("images/blr-delhi-horizontal.PNG");
			  //oImage.setHeight("");				
				oImage.setTooltip("Bangalore to Delhi 2,164 km");
				oImage.setDecorative(false);
			      		var routeTableFilter = new sap.ui.layout.VerticalLayout(
							"Layout1", {
								content : [ routeFilterLabel,
										routeTypeCombo, travelDateLabel,
										travelDatePicker ]
							});
			      		var oThirdCell0 = new sap.ui.commons.layout.MatrixLayoutCell(
							"idoThirdCell0", {
							//	content : oImage 
							});
						var oThirdCell = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoThirdCell", {
									content : oColumnChart
								});
						var oThirdCell3 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoThirdCell2", {
									//content : oColumnTripChart
								});
						var oThirdCell2 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoThirdCell3", {
									content : oColumnTripChart
								});
						var thirdRow = new sap.ui.commons.layout.MatrixLayoutRow();
						thirdRow.addCell(oThirdCell0);
						thirdRow.addCell(oThirdCell);
						thirdRow.addCell(oThirdCell2);
						thirdRow.addCell(oThirdCell3);
						var oSecCell0 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoSecCell0", {
									content : routeTableFilter
								});
						var oSecCell1 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoSecCell1", {
									content : oRouteTable
								});

						var oSecCell2 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoSecCell2", {
									content : oTripTable
								});
						var oSecCell3 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idoSecCell3", {
									content : oImage,
									rowSpan	:2
								});
						var secondRow = new sap.ui.commons.layout.MatrixLayoutRow();
						secondRow.addCell(oSecCell0);
						secondRow.addCell(oSecCell1);
						secondRow.addCell(oSecCell2);
						secondRow.addCell(oSecCell3);

						// Add route table filters
						
						var oCell0 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idCell0", {//content : routeTableFilter
								});
						var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idCell1", {//	content : 
								});

						var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idCell2", {// content : oImage,								
								});
						var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell(
								"idCell3", {// content : oImage,								
								});
						var firstRow = new sap.ui.commons.layout.MatrixLayoutRow();
						firstRow.addCell(oCell0);
						firstRow.addCell(oCell1);
						firstRow.addCell(oCell2);
						firstRow.addCell(oCell3);

						var oMainMaxtrixLayout = new sap.ui.commons.layout.MatrixLayout(
								{
									id : 'idoMainMaxtrixLayout',
									layoutFixed : true,
									columns : 4,
									widths : [ "10%","40%", "40%","12%" ]
								});

						oMainMaxtrixLayout.addRow(firstRow);
						oMainMaxtrixLayout.addRow(secondRow);
						oMainMaxtrixLayout.addRow(thirdRow);
		
		return oMainMaxtrixLayout;
	}

});
