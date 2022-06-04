// Copyright (c) 2020, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on('Shipment', {
	refresh: function(frm) {
		if(frm.doc.docstatus ==1){
			frm.add_custom_button(__('Purchase Invoice'), () => {
				create_purchase_invoice(frm);
			}
			, __('Create'));
		}
		if(frm.doc.purchase_order){
			frm.set_df_property("value_of_goods", "reqd", 0);
			frm.set_df_property("value_of_goods", "hidden", 1);

			frm.set_df_property("pickup_date", "reqd", 0);
			frm.set_df_property("pickup_date", "hidden", 1);

			frm.set_df_property("pickup_from", "reqd", 0);
			frm.set_df_property("pickup_from", "hidden", 1);

			frm.set_df_property("pickup_to", "reqd", 0);
			frm.set_df_property("pickup_to", "hidden", 1);

			frm.set_df_property("shipment_delivery_note", "reqd", 0);
			frm.set_df_property("shipment_delivery_note", "hidden", 1);
		}
	},
	onload: function(frm) {
		if(frm.doc.purchase_order){
			frm.set_df_property("value_of_goods", "reqd", 0);
			frm.set_df_property("value_of_goods", "hidden", 1);

			frm.set_df_property("pickup_date", "reqd", 0);
			frm.set_df_property("pickup_date", "hidden", 1);

			frm.set_df_property("pickup_from", "reqd", 0);
			frm.set_df_property("pickup_from", "hidden", 1);

			frm.set_df_property("pickup_to", "reqd", 0);
			frm.set_df_property("pickup_to", "hidden", 1);

			frm.set_df_property("shipment_delivery_note", "reqd", 0);
			frm.set_df_property("shipment_delivery_note", "hidden", 1);
			// set address and Clear description_of_content
			frm.set_df_property("service_provider", "hidden", 1);
			frm.set_df_property("tracking_status", "hidden", 1);
		}
		if(frm.is_new() && frm.doc.purchase_order){
			frm.set_value("delivery_address_name", frm.doc.feach_address)
		}
	},
	before_submit: function(frm) {
		if( frm.doc.purchase_order){
			if(frm.doc.type =="IN"){
				frappe.db.get_list('Shipment', {
					fields: ['name'],
					filters: {
						purchase_order: frm.doc.purchase_order,
						type : frm.doc.type,
						currency : frm.doc.currency,
						docstatus : 1
					}
				}).then(records => {
					console.log(records.length);
					if(records.length != 0){
						frappe.msgprint(`You Have Already Make Shipment With Same Data On ${records[0].name}`)
						frappe.validated=false;
					}
				})
			}
			
		}
		
	},
	type: function(frm) {
		if(frm.doc.purchase_order && frm.doc.type=="OUT"){
			// Suppliyer
			let pickup_from_type = frm.doc.delivery_to_type
			let pickup_company = frm.doc.delivery_company
			let pickup_address_name = frm.doc.delivery_address_name
			// company
			let delivery_to_type = frm.doc.pickup_from_type
			let delivery_supplier = frm.doc.pickup_supplier
			let delivery_address_name = frm.doc.pickup_address_name
			frm.set_value("pickup_from_type", pickup_from_type)
			frm.set_value("pickup_company", pickup_company)
			frm.set_value("pickup_address_name", pickup_address_name)

			frm.set_value("delivery_to_type", delivery_to_type)
			frm.set_value("delivery_supplier", delivery_supplier)
			setTimeout(() => {
				frm.set_value("delivery_address_name", delivery_address_name)
			}, 300);
			
		}
		else if(frm.doc.purchase_order && frm.doc.type=="IN"){
			// Suppliyer
			let pickup_from_type = frm.doc.delivery_to_type
			let pickup_supplier = frm.doc.delivery_supplier
			let pickup_address_name = frm.doc.delivery_address_name
			// company
			let delivery_to_type = frm.doc.pickup_from_type
			let delivery_company = frm.doc.pickup_company
			let delivery_address_name = frm.doc.pickup_address_name
			frm.set_value("pickup_from_type", pickup_from_type)
			frm.set_value("pickup_supplier", pickup_supplier)
			frm.set_value("pickup_address_name", pickup_address_name)

			frm.set_value("delivery_to_type", delivery_to_type)
			frm.set_value("delivery_company", delivery_company)
			setTimeout(() => {
				frm.set_value("pickup_address_name", pickup_address_name)
			}, 300);
			
		}
	},
	
})

frappe.ui.form.on('Shipment Status', {
	status(frm,cdt,cdn) {
		const row = frappe.get_doc(cdt,cdn)
		if (row.status){
			frm.set_value("shipment_table_status", row.status)
		}
	},
	before_shipment_status_remove(frm,cdt,cdn) {
		const row = frappe.get_doc(cdt,cdn)
		if(row.idx > 1){
			if(row.idx == frm.doc.shipment_status.at(-1).idx ){
				frm.set_value("shipment_table_status", frm.doc.shipment_status.at(-2).status)
			}
		}
		else{
			if(frm.doc.shipment_status.at(-2)){
				frm.set_value("shipment_table_status", frm.doc.shipment_status.at(-1).status)
			}
			else{
				frm.set_value("shipment_table_status", "")
			}
			
		}
		
	},
	shipment_status_move(frm,cdt,cdn) {
			frm.set_value("shipment_table_status", frm.doc.shipment_status.at(-1).status)
	}
})

function create_purchase_invoice(frm){
	frappe.model.open_mapped_doc({
		method: "shipment.public.js.p_invoice.create_purchase_invoice",
		frm:frm
	})

}