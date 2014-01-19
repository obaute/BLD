
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button5 = {};	// @button
	var textField6 = {};	// @textField
	var button4 = {};	// @button
	var documentEvent = {};	// @document
	var button3 = {};	// @button
	var button2 = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	var button1 = {};	// @button
	var billingItemsEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		var vTitle = 'BILLING SUMARY REPORT'; //check cache 3
		var vContentH = '<!DOCTYPE html>';
		var vCount = 0;
		var vPage = 1;
		var myBIPerPage = 35;
		var myBI = sources.billingItems; // ds.BillingItems.query('year == :1 and month == :2', vYear, vMonth);      //
		var vTotal = 0;
		var vGroupTotal = 0;
		
		var vP = 0;
		
//		myBI = myBI.orderBy("project.code desc, projectPhase.phase");
		
		
		var vPages = parseInt(myBI.length / myBIPerPage) +1 ;
		
		vContentH += '<html><head><title>' + vTitle + '</title>';
		vContentH += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style type="text/css"> a {text-decoration: none}</style>';
		vContentH += '</head>';
		
		vContentH += '<body>';  // 1
		vContentH += '<table with=100% cellpadding="0" cellspacing="0" border="0">'; //2
		vContentH += '<tbody>'; //3
		vContentH += '<tr>'; //4
		vContentH += '<td width="50%">&nbsp;</td>';
		vContentH += '<td align="center">'; //5
		vContentH += '<table style="width: 612px; border-collapse: collapse" cellpadding="0" cellspacing="0" border="0" bgcolor="white">'; //6 width 612
		vContentH += '<tbody>'; //7
			
		// Mani Title
		vContentH += '<tr><td colSpan="5" style="text-align: center;"><p style="margin: auto; font-size: 24px;">SUMMARY MONTHY REPORT</p></td></tr>';
		vContentH += '<tr><td colSpan="5" style="text-align: center;"><p style="margin: auto; font-size: 14px;">Year:' + vYear + ' Month: ' + vMonth + '</p></td></tr>';


		// TODO: columns heathers
		vContentH += '<tr style="height: 63px; vertical-align: top; border-bottom-width: 1px; border-bottom-style: solid; "><td><p style="width: 100px; height: 15px;">Project / Phase</p></td>';
		vContentH += '<td style="text-align: right;"><p style="width: 100px; height: 15px;">Total Fee</p></td>';
		vContentH += '<td  style="text-align: right;"><p style="width: 100px; height: 15px;">Amount</p></td>';
		vContentH += '<td style="text-align: right;"><p style="width: 100px; height: 15px;">Monthly Progress</p></td>';
		vContentH += '<td style="text-align: right;"><p style="width: 90px; height: 15px;">Phase Up To</p></td></tr>';


		myBI.select(1);
		var projectGroup = '';
		var vContent = vContentH

		for( var i = 0; i <= myBI.length-1; i++) {
			
			myBI.select(i);

			if ( vCount > myBIPerPage ) {

				// TODO: Blank fill row then the footer with date 
				vContent = vContent + '<tr><td colspan="4"><p style="page-break-after: always; margin: initial;">Page ' + vPage + ' of ' + vPages + '</p></td></tr>';
				vContent += '</tbody>';		
				vContent += '</table>';
				vContent += '</td">';
				vContent += '<td width="50%">&nbsp;</td>';
				vContent += '</tr">';
				vContent += '</tbody>';		
				vContent += '</table>';
				vContent += '</body>';
				vContent += vContentH;
				vPage = vPage + 1;
				vCount = 0;
				// TODO: page Title and columns heathers 
			}

			if(sources.project.code != projectGroup){                     // bracke the group
				if(vCount != 0){
					vContent += '<tr style="height: 10px;"><td></td></tr>';
				}
				projectGroup = sources.project.code;
				vContent += '<tr valign="top">';
				
				// <p style="overflow: hidden; text-indent: 0px; margin: initial; "><span style="font-family: "DejaVu Sans", Arial, Helvetica, sans-serif; color: #000000; font-size: 10px; line-height: 1.2578125;">'; //9
				
				vContent += '<td colspan="4"><p style="overflow: hidden; text-indent: 0px; margin: initial; "><b>'; //9
				vContent += sources.project.code + " " + sources.project.name;
				vContent += '</b></p></td>';
				
				vContent += '<td style="text-align: right;"><p style="overflow: hidden; text-indent: 0px; margin: initial; ">'; //9
				vContent +=  sources.billingItems.invoiceNo;
				vContent += '</p></td>';

				vContent += '</tr>';
				vCount = vCount + 2;
			}
			vContent += '<tr valign="top">';
//			vContent += '<td colspan="2"></td>';
			
			vContent += '<td><p style="overflow: hidden; text-indent: 0px; margin: initial;">';
			vP = sources.projectPhase.description;
			vContent += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sources.projectPhase.phase + " " + vP.substring(20,0);
			vContent += '</p></td>';
			
			vContent += '<td style="text-align: right;"><p style="overflow: hidden; text-indent: 0px; margin: initial;">';
			if (sources.projectPhase.fee != null) {
				vContent += "$" + sources.projectPhase.fee.toLocaleString();
			}
			vContent += '</p></td>';
			
			vContent += '<td style="text-align: right;"><p style="overflow: hidden; text-indent: 0px; margin: initial;">';
			vContent += "$" + sources.billingItems.amount.toLocaleString();
			vContent += '</p></td>';
			
			vTotal += sources.billingItems.amount;
			
			vContent += '<td style="text-align: right;"><p style="overflow: hidden; text-indent: 0px; margin: initial;">';
			vP = sources.billingItems.percent*100;
			vContent += vP.toFixed(1) + "%";
			vContent += '</p></td>';
			
			vContent += '<td style="text-align: right;"><p style="overflow: hidden; text-indent: 0px; margin: initial;">';
			vP = sources.projectPhase.upTo*100;
			vContent += vP.toFixed(1) + "%";   //sources.billingItems.date.toLocaleDateString();
			vContent += '</p></td></tr>'; 
	
			vCount = vCount +1;

		}  //======Enf FOR loop=================================================
		

		// TODO: Blank fill row then the footer with date 
		vContent = vContent + '<tr><td colspan="3" style="text-align: right;"><p style="page-break-after: always; margin: initial;"><b>Grand Total: $' + vTotal.toLocaleString() + '</b></p></td></tr>';

		
		vContent = vContent + '<tr><td colspan="4"><p style="page-break-after: always; margin: initial;">Page ' + vPage + ' of ' + vPages + '</p></td></tr>';


		vContent += '</tbody>';		
		vContent += '</table>';

		vContent += '</td">';
		vContent += '<td width="50%">&nbsp;</td>';
		
		vContent += '</tr">';

		vContent += '</tbody>';		
		vContent += '</table>';
		
		vContent += '</body>';
		vContent += '</html>';
		
		myWindow=window.open();
		myWindow.document.write(vContent);
	};// @lock

	textField6.change = function textField6_change (event)// @startlock
	{// @endlock
		if((sources.phases.upTo + (vPercentage/100) > 1)) {
			if(!confirm("Billing more than 100%?")) {
				vPercentage = 0;
//				textField6.value = '0'; need refresh the field
			}
		}
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		if(sources.phases.upTo >= 1){
			alert("There is no % left to be billed");
		} else {
			vPercentage = (1-sources.phases.upTo)*100;
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$('#textField1, #textField2').on('keyup', 
			function (e) { if (e.keyCode == 13) { button1.click(); }});
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		sources.billingItems.projectPhase.set(sources.phases1);
		sources.billingItems.save();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		// cheking information
		if (sources.currencies == null) {
			alert("Please select a currency, information was not saved");
			// check amount against the remaining fee to be billed
} 		else {
			if(vPercentage != 0) {sources.billingItems.amount = sources.phases.fee * (vPercentage/100);}
			sources.billingItems.currency.set(sources.currencies);
			sources.billingItems.project.set(sources.projects);
			sources.billingItems.projectPhase.set(sources.phases);
			sources.billingItems.save();
		}
	};// @lock

	dataGrid1.onCellClick = function dataGrid1_onCellClick (event)// @startlock
	{// @endlock
//		if(event.data.columnNumber == 0 || event.data.columnNumber == 1) { 		// code or project name clicked select project and phase
//			if(event.data.cell.value == null) {
//				alert('value null: click on the project code or name cell with value:'+event.data.cell.value);
//			} else {
//				alert('click on the project code or name cell with value:'+event.data.cell.value);
//			}
//		}
//		if(event.data.columnNumber == 2 ) { 		// phase clicked select phase for current project 
//			if(event.data.cell.value == null) {
//				// new record?
//			} else {
//				alert('click on the phase cell with value:'+event.data.cell.value);
//			}
//		}

	};// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
//		debugger;
		if(event.row.cells[8].value > 1) {
			event.row.cells[8].insideCell.html('<b>' + event.row.cells[8].insideCell[0].innerText + '</b><img src = "/images/flag_red.png"/>') //event.row.cells[8].value.formatNumber("0.0%")
		};
		
		if(event.row.cells[9].value > 1) {
			event.row.cells[9].insideCell.html('<b>' + event.row.cells[9].insideCell[0].innerText + '</b><img src = "/images/flag_red.png"/>') //+ event.row.cells[7].value +
		};
		
		
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
//		debugger;
		if(vMonth == "") {
			sources.billingItems.query('year = :1', vYear);
		} else {
			sources.billingItems.query('year = :1 and month = :2', vYear, vMonth);
		};
	};// @lock

	billingItemsEvent.onCollectionChange = function billingItemsEvent_onCollectionChange (event)// @startlock
	{// @endlock
		richText1.textContent = "$" + sources.billingItems.subTotal().toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("textField6", "change", textField6.change, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("dataGrid1", "onCellClick", dataGrid1.onCellClick, "WAF");
	WAF.addListener("dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("billingItems", "onCollectionChange", billingItemsEvent.onCollectionChange, "WAF");
// @endregion
};// @endlock
