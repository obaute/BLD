
guidedModel =// @startlock
{
	Currencies :
	{
		events :
		{
			onRemove:function()
			{// @endlock
				if(this.BillingItemsCollection.length > 0){
					return {error: 123, errorMessage: 'This currency has items related on Billing and cannot be deleted'};
				}
			}// @startlock
		}
	},
	Projects :
	{
		events :
		{
			onRemove:function()
			{// @endlock
				if(this.phases.length > 0) {
					return {error:123, errorMessage: 'Projects with phases cannot be deleted'};
				}
			}// @startlock
		},
		upTo :
		{
			onGet:function()
			{// @endlock
				return this.bT/this.cT;
			}// @startlock
		},
		bT :
		{
			onGet:function()
			{// @endlock
				return this.billingItemsCollection.query("invoiceNo !== ''").sum("amount");
			}// @startlock
		},
		cT :
		{
			onGet:function()
			{// @endlock
				return this.phases.sum("fee");
			}// @startlock
		}
	},
	ProjectPhases :
	{
		events :
		{
			onRemove:function()
			{// @endlock
				if(this.billingItemsCollection.length > 0){
					return {error:123, errorMessage: 'phases with billing information cannot be deleted'};
				}
			}// @startlock
		},
		upTo :
		{
			onGet:function()
			{// @endlock
				return this.billingItemsCollection.sum("amount")/this.fee;
			}// @startlock
		},
		collectionMethods :
		{// @endlock
			subTotal:function()
			{// @lock
				return this.sum("fee");
			}// @startlock
		}
	},
	BillingItems :
	{
		percent :
		{
			onGet:function()
			{// @endlock
//				var ret = null;
//				if(this.projectPhase.fee != null) {
//					ret = this.amount/this.projectPhase.fee;
//				} else {
//					ret = null;
//				}
//				return ret;
				try {
					return this.amount/this.projectPhase.fee;
				} catch (e) {
					return null;
				}
			}// @startlock
		},
		month :
		{
			onGet:function()
			{// @endlock
				var ret = null;
				if(this.date != null){
					ret = this.date.getMonth()+1;
				} else {
					ret = null;
				};
				return ret;
			}// @startlock
		},
		collectionMethods :
		{// @endlock
			subTotal:function()
			{// @lock
				return this.sum("amount");
			}// @startlock
		},
		year :
		{
			onGet:function()
			{// @endlock
				var ret = null;
				if(this.date !== null){
					ret = this.date.getFullYear();
				} else {
					ret = null;
				};
				return ret
			}// @startlock
		}
	}
};// @endlock
