
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var billingItemsCollection1Event = {};	// @dataSource
	var billingItemsCollectionEvent = {};	// @dataSource
	var phasesEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	billingItemsCollection1Event.onCollectionChange = function billingItemsCollection1Event_onCollectionChange (event)// @startlock
	{// @endlock
		richText3.textContent = sources.billingItemsCollection1.subTotal().toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	};// @lock

	billingItemsCollectionEvent.onCollectionChange = function billingItemsCollectionEvent_onCollectionChange (event)// @startlock
	{// @endlock
		richText2.textContent = sources.billingItemsCollection.subTotal().toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	};// @lock

	phasesEvent.onCollectionChange = function phasesEvent_onCollectionChange (event)// @startlock
	{// @endlock
//		$$('richText1').setErrorMessage({message: "This is the contrac total amount", tooltip: true});
		richText1.textContent = sources.phases.subTotal().toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("billingItemsCollection1", "onCollectionChange", billingItemsCollection1Event.onCollectionChange, "WAF");
	WAF.addListener("billingItemsCollection", "onCollectionChange", billingItemsCollectionEvent.onCollectionChange, "WAF");
	WAF.addListener("phases", "onCollectionChange", phasesEvent.onCollectionChange, "WAF");
// @endregion
};// @endlock
