var vProject = [];
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var documentEvent = {};	// @document
	var vProjectEvent = {};	// @dataSource
	var dataGrid1 = {};	// @dataGrid
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		sources.billingItems.query(queryStr);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		sources.billingItems.declareDependencies('project');
		sources.projects.toArray('code, name',{
			onSuccess : function(e){
				vProject = e.result;
				sources.vProject.sync();
			}
		});
	};// @lock

	vProjectEvent.onCollectionChange = function vProjectEvent_onCollectionChange (event)// @startlock
	{// @endlock
			$('.waf-input-kendoUI').kendoComboBox({
	        dataTextField: "name",
	        dataValueField: "code", //to check 
	        dataSource: vProject
	    });

	    $$('dataGrid1')._vProject = vProject;

	    $('.waf-input-kendoUI').live({
	    	change : function(){
		   		var
		   		data 	= $(this).data(),
		   		kendo 	= data.kendoComboBox;
		   		if(!kendo){
		   			return;
		   		}		   		
		   		value	= $$('dataGrid1')._vProject[kendo.value() - 1];
		   		if(value.ID){
		   			ds.Projects.find('code = :1' , {
		   				params : [value.ID],
		   				onSuccess : function(e){
		   					var entity = e.entity;
		   					sources.billingItems.project.set(entity);
		   					sources.billingItems.save();
		   				}
		   			});
		   		}
		   	}
	   	});	
	};// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
		var	that		= this,
			vProject	=[],
			projectColumn	= 4,
			kendoInput	= $('<input>'),
			projectValue;
		debugger;
		if(event.element){
			projectValue	= event.element.getAttributeValue('project.code') // entity project from billingPhases
		}
		
		kendoInput.addClass('waf-input-kendoUI');

		projectColumn	= $(event.row.cells[projectColumn].dom);
		projectColumn.html(kendoInput);
		kendoInput.val(projectValue);

		if(that._vProject && that._vProject.length){
			kendoInput.kendoComboBox({
		        dataTextField: "name",
		        dataValueField: "code", 
		        dataSource: that._vProject
		    });

		    kendoInput.change(function(){
		   		$(this).parent().parent().data('kendoUI_oldVal' , $(this).data().kendoComboBox.value())
		   	});
		}		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("vProject", "onCollectionChange", vProjectEvent.onCollectionChange, "WAF");
	WAF.addListener("dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
// @endregion
};// @endlock
