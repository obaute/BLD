var lines = loadText( ds.getModelFolder().path + "import/RECEIVAB.csv" ).split("\n");
var columns = [];
var log = 0
var vProjectPhases = ds.ProjectPhases;
var vProjects = ds.Projects;
var vBillingItems = ds.BillingItems;
var vStatus = "";
var vCode = "";
ds.BillingItems.all().remove();
ds.BillingItems.setAutoSequenceNumber(1);

lines.forEach(
	function(oneLine) {
		
		columns = oneLine.split("\t");
			
		if(columns[0].length <= 4) {
			while (columns[0].length < 4) {
				columns[0] = '0' + columns[0]
			}
		};
		
		if(columns[21].match(/US/) !== null) {
			var vCurrencies = ds.Currencies.find("key = 'USD'");
		} else {
			var vCurrencies = ds.Currencies.find("key = 'HKD'");
		};

		var vProject = ds.Projects.find("code = :1", columns[0]);

		var vProjectPhases = ds.ProjectPhases.find("project.code = :1 and phase = :2", columns[0], columns[1]);
		if(vProjectPhases == null){
			debugger; //project no found !!!!
		};
		
		// control the real date based on the date and the RGLPRD
//		debugger;
		var vDate = new Date(columns[3]); 
		
//		debugger;
		
		vDate.setMonth(columns[19]-1); 
		columns[3] = vDate;
		
		vBillingItems = new ds.BillingItems({
			amount: columns[9],
			date: columns[3],
			invoiceNo: columns[5],
			projectPhase: vProjectPhases,
			currency: vCurrencies,
			project: vProject
		});
		vBillingItems.save();
		log += 1;
	}
);

log = "Billing Items created: " + log; 

