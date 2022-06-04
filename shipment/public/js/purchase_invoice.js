frappe.ui.form.on('Purchase Invoice', {
	get_shipment_items(frm) {
		frm.get_field("items").grid.remove_all()
		frappe.db.get_list('Shipment Item Screen', {
			filters: {
			},
			fields: ['item_code','qty',"item_name","uom"],
		}).then(res => {
			
			res.forEach(element => {
				var childTable = frm.add_child("items");
				childTable.item_code=element.item_code
				frm.refresh_fields("item_code");
				childTable.qty=element.qty
				frm.refresh_fields("qty");
				childTable.uom=element.uom
				frm.refresh_fields("qty");
				childTable.item_name=element.item_name
				frm.refresh_fields("qty");
			});
			frm.refresh()
		});
	
	}
})