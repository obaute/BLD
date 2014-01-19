var lines = loadText( ds.getModelFolder().path + "import/PROJECT PHASE.csv" ).split("\n");
var columns = [];
var log = 0
var vProjectPhases = ds.ProjectPhases;
var vProjects = ds.Projects;
var vStatus = "";
var vCode = "";
ds.ProjectPhases.all().remove();
ds.ProjectPhases.setAutoSequenceNumber(1);

lines.forEach(
	function(oneLine) {
		
		columns = oneLine.split("\t");
		
//		if(columns[0] == "1318") debugger;			
		
		if(columns[0].length <= 4) {
				while (columns[0].length < 4) {
					columns[0] = '0' + columns[0]
				}
			};
		
		var vProjects = ds.Projects.find("code = :1", columns[0]);
		
		if(vProjects == null){
			debugger; //project no found !!!!
		};
		
		
		vProjectPhases = new ds.ProjectPhases({
			phase: columns[1],
			description: columns[2],
			fee: columns[6],
			downPayment: (columns[7] == 1) ? true : false ,
			project: vProjects
		});
		vProjectPhases.save();
		log += 1;
	}
);

log = "Projects created: " + log; 
