
var oSumTabStrip;
var oLoadTable;
var routeTypeCombo;
var oColumnChart;
var defaultData;
var oImage;

var oTrendGraphWithOutPlanned =[ {
    name : 'Actual', // 'name' is used as label in the Legend 
    value : '{actual}' // 'value' defines the binding for the displayed value   
},
{
    name : 'Benchmark', //actual
    value : '{benchmark}'
}
];

var kpiData = {
	"BLR-DELHI-10:00am": [{
			"Measure": "Average Time",
			"Actual": "2",
			"Benchmark": "2:05",
			"src": "images/green_up_New.png"	
		},
		{
			"Measure": "Average Speed",
			"Actual": "58",
			"Benchmark": "60",
			"src": "images/green_up_New.png"	
		},
		{
			"Measure": "Distance",
			"Actual": "69",
			"Benchmark": "70",
			"src": "images/green_up_New.png"	
		},
		{
			"Measure": "No.of Stops",
			"Actual": "8",
			"Benchmark": "8",
			"src": "images/green_up_New.png"	
		},
		{
			"Measure": "No.of Halts",
			"Actual": "3",
			"Benchmark": "4",
			"src": "images/red_down_new.png"	
		},
		{
			"Measure": "Traffic Jams",
			"Actual": "5",
			"Benchmark": "2",
			"src": "images/red_down_new.png"	
		}
		],
	
	"BLR-DELHI-11:30am": [{
		"Measure": "Average Time",
		"Actual": "3",
		"Benchmark": "3:05",
		"src": "images/green_up_New.png"	
	},
	{
		"Measure": "Average Speed",
		"Actual": "65",
		"Benchmark": "60",
		"src": "images/red_down_new.png"	
	},
	{
		"Measure": "Distance",
		"Actual": "75",
		"Benchmark": "70",
		"src": "images/red_down_new.png"	
	},
	{
		"Measure": "No.of Stops",
		"Actual": "8",
		"Benchmark": "9",
		"src": "images/red_down_new.png"	
	},
	{
		"Measure": "No.of Halts",
		"Actual": "4",
		"Benchmark": "5",
		"src": "images/red_down_new.png"	
	},
	{
		"Measure": "Traffic Jams",
		"Actual": "7",
		"Benchmark": "4",
		"src": "images/red_down_new.png"	
	}
	],
	
	"BLR-DELHI-20:00pm": [{
		"Measure": "Average Time",
		"Actual": "2",
		"Benchmark": "2:05",
		"src": "images/green_up_New.png"	
	},
	{
		"Measure": "Average Speed",
		"Actual": "58",
		"Benchmark": "60",
		"src": "images/green_up_New.png"	
	},
	{
		"Measure": "Distance",
		"Actual": "69",
		"Benchmark": "70",
		"src": "images/green_up_New.png"
	},
	{
		"Measure": "No.of Stops",
		"Actual": "7",
		"Benchmark": "8",
		"src": "images/green_up_New.png"	
	},
	{
		"Measure": "No.of Halts",
		"Actual": "4",
		"Benchmark": "5",
		"src": "images/green_up_New.png"	
	},
	{
		"Measure": "Traffic Jams",
		"Actual": "7",
		"Benchmark": "4",
		"src": "images/red_down_new.png"	
	}
	]
};
var kpiRouteData = {
		"BLR-DELHI-10:00am": [{
				"TripProfitablity": "No. of Passengers",
				"Actual": "95",
				"Benchmark": "90",
				"src": "images/green_up_New.png"	
			},
			{
				"TripProfitablity": "No. of Trips/Day",
				"Actual": "2",
				"Benchmark": "2",
				"src": "images/green_up_New.png"	
			},
			{
				"TripProfitablity": "Fuel Consumption",
				"Actual": "35",
				"Benchmark": "30",
				"src": "images/red_down_new.png"	
			},
			{
				"TripProfitablity": "Milege",
				"Actual": "13",
				"Benchmark": "15",
				"src": "images/red_down_new.png"	
			},
			{
				"TripProfitablity": "Overtime Trips",
				"Actual": "3",
				"Benchmark": "2",
				"src": "images/red_down_new.png"	
			}
			],
		
		"BLR-DELHI-11:30am": [{
			"TripProfitablity": "No. of Passengers",
			"Actual": "125",
			"Benchmark": "75",
			"src": "images/red_down_new.png"	
		},
		{
			"TripProfitablity": "No. of Trips/Day",
			"Actual": "3",
			"Benchmark": "4",
			"src": "images/green_up_New.png"	
		},
		{
			"TripProfitablity": "Fuel Consumption",
			"Actual": "40",
			"Benchmark": "35",
			"src": "images/green_up_New.png"	
		},
		{
			"TripProfitablity": "Milege",
			"Actual": "16",
			"Benchmark": "15",
			"src": "images/green_up_New.png"	
		},
		{
			"TripProfitablity": "Overtime Trips",
			"Actual": "4",
			"Benchmark": "3",
			"src": "images/red_down_new.png"	
		}
		],
		
		"BLR-DELHI-20:00pm": [{
			"TripProfitablity": "No. of Passengers",
			"Actual": "85",
			"Benchmark": "70",
			"src": "images/green_up_New.png"	
		},
		{
			"TripProfitablity": "No. of Trips/Day",
			"Actual": "4",
			"Benchmark": "3",
			"src": "images/green_up_New.png"	
		},
		{
			"TripProfitablity": "Fuel Consumption",
			"Actual": "35",
			"Benchmark": "30",
			"src": "images/red_down_new.png"	
		},
		{
			"TripProfitablity": "Milege",
			"Actual": "18",
			"Benchmark": "15",
			"src": "images/red_down_new.png"	
		},
		{
			"TripProfitablity": "Overtime Trips",
			"Actual": "3",
			"Benchmark": "1",
			"src": "images/green_up_New.png"	
		}]
	};

var  tripGraphModel = {
	"0": [{date :"January",benchmark:90,actual:95,},
			{date :"Febrary",benchmark:95,actual:85},
			{date :"March",benchmark:100,actual:80},
			{date :"April",benchmark:75,actual:95},
			{date :"May",benchmark:84,actual:75},
			{date :"June",benchmark:79,actual:90}        
       ],
	
    "1": [		
		{date :"January",benchmark:2,actual:2,},
        {date :"Febrary",benchmark:4,actual:3},
        {date :"March",benchmark:3,actual:4},
        {date :"April",benchmark:6,actual:8},
        {date :"May",benchmark:6,actual:7},
        {date :"June",benchmark:6,actual:6}
        ],
	"2": [
        {date :"January",benchmark:57,actual:57,},
        {date :"Febrary",benchmark:59,actual:56},
        {date :"March",benchmark:62,actual:56},
        {date :"April",benchmark:61,actual:58},
        {date :"May",benchmark:60,actual:55},
        {date :"June",benchmark:60,actual:57}
        ],
	"3": [
        {date :"January",benchmark:57,actual:57,},
        {date :"Febrary",benchmark:59,actual:56},
        {date :"March",benchmark:62,actual:56},
        {date :"April",benchmark:61,actual:58},
        {date :"May",benchmark:60,actual:55},
        {date :"June",benchmark:60,actual:57}
        ],
    "4":  [
		{date :"January",benchmark:2,actual:2,},
		{date :"Febrary",benchmark:4,actual:3},
		{date :"March",benchmark:3,actual:4},
		{date :"April",benchmark:6,actual:8},
		{date :"May",benchmark:6,actual:7},
		{date :"June",benchmark:6,actual:6}
           ],
   "5": [		
		{date :"January",benchmark:57,actual:57,},
        {date :"Febrary",benchmark:59,actual:56},
        {date :"March",benchmark:62,actual:56},
        {date :"April",benchmark:61,actual:58},
        {date :"May",benchmark:60,actual:55},
        {date :"June",benchmark:60,actual:57}
    		  	    ]

}; 
var routeGraphModel = {
		"0": [{date :"January",benchmark:1,actual:1.5,},
				{date :"Febrary",benchmark:2,actual:1},
				{date :"March",benchmark:2,actual:1.6},
				{date :"April",benchmark:1.8,actual:2},
				{date :"May",benchmark:2,actual:1},
				{date :"June",benchmark:3,actual:2}        
	       ],
		
	    "1": [		
			{date :"January",benchmark:57,actual:57,},
	        {date :"Febrary",benchmark:59,actual:56},
	        {date :"March",benchmark:62,actual:56},
	        {date :"April",benchmark:61,actual:58},
	        {date :"May",benchmark:60,actual:55},
	        {date :"June",benchmark:60,actual:57}
	        ],
		"2": [
	        {date :"2January",benchmark:57,actual:57,},
	        {date :"Febrary",benchmark:59,actual:56},
	        {date :"March",benchmark:62,actual:56},
	        {date :"April",benchmark:61,actual:58},
	        {date :"May",benchmark:60,actual:55},
	        {date :"June",benchmark:60,actual:57}
	        ],
		"3": [
	        {date :"3January",benchmark:57,actual:57,},
	        {date :"Febrary",benchmark:59,actual:56},
	        {date :"March",benchmark:62,actual:56},
	        {date :"April",benchmark:61,actual:58},
	        {date :"May",benchmark:60,actual:55},
	        {date :"June",benchmark:60,actual:57}
	        ],
	   "4":  [
	        {date :"January",benchmark:2,actual:2,},
	        {date :"Febrary",benchmark:4,actual:3},
	        {date :"March",benchmark:3,actual:4},
	        {date :"April",benchmark:6,actual:8},
	        {date :"May",benchmark:6,actual:7},
	        {date :"June",benchmark:6,actual:6}
	        ],
	   "5": [		
  			{date :"January",benchmark:57,actual:57,},
  	        {date :"Febrary",benchmark:59,actual:56},
  	        {date :"March",benchmark:62,actual:56},
  	        {date :"April",benchmark:61,actual:58},
  	        {date :"May",benchmark:60,actual:55},
  	        {date :"June",benchmark:60,actual:57}
	  	    ]
	}; 

function dataForSumDropDown(comboxText, comboKey, comboboxobj, id) {
	var oItem2 = new sap.ui.core.ListItem(id);
	oItem2.setText(comboxText);
	oItem2.setKey(comboKey);
	comboboxobj.addItem(oItem2);

}

function resetTableRowData(TableObject, data) {
	//alert("hello");
	var model = new sap.ui.model.json.JSONModel();
	model.setData({
		modelData : data
	});
	TableObject.setModel(model);
	TableObject.bindRows("/modelData");
	//TableObject.invalidate();
}

