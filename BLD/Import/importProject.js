	var lines = loadText(ds.getModelFolder().path + "import/PROJECTS.csv").split("\n");
	var columns = [];
	var log = 0
	var vProjects = ds.Projects;
	var vStatus = "";
	var vCode = "";
	ds.Projects.all().remove();

	lines.forEach(
		function(oneLine) {
			
			columns = oneLine.split("\t");
			
			if(columns[0].length <= 4) {
				while (columns[0].length < 4) {
					columns[0] = '0' + columns[0]
				}
			};
			
			vProjects = new ds.Projects({
				code: columns[0],
				name: columns[1],
				status: columns[2],
				comments: columns[9],
				issueBy: columns[10]
			});
			vProjects.save();
			log += 1;
		}
	);
	
	log = "Projects created: " + log; 


