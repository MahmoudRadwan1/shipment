// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.ui.form.on("Purchase Order", {


	refresh: function(frm) {
		if(frm.doc.docstatus ==1){
			frm.add_custom_button(__('Shipment'), () => {
				create_shipment(frm);
			}
			, __('Create'));
		}
		
	},

});
function create_shipment(frm){
	var shipment = frappe.model.get_new_doc('Shipment');

	// Pickup from
	shipment.pickup_from_type="Supplier"
	shipment.pickup_supplier = frm.doc.supplier
	shipment.pickup_address_name = frm.doc.supplier_address
	shipment.pickup_contact_name =frm.doc.contact_person
	// Delivery to
	shipment.delivery_to_type ="Company"
	shipment.delivery_company=frm.doc.company
	shipment.delivery_address_name = frm.doc.shipping_address
	// shipment.delivery_contact_name = frm.doc.billing_address
	shipment.feach_address = frm.doc.shipping_address
	shipment.purchase_order = frm.doc.name
	shipment.order_confirmation_number =frm.doc.order_confirmation_no
	shipment.order_confirmation_date = frm.doc.order_confirmation_date
	shipment.po_remarks = frm.doc.po_remarks
	shipment.delivery_contact_name = frm.doc.contact
	shipment.rma = frm.doc.rma
	shipment.total_qty =frm.doc.total_qty
	shipment.base_grand_total=frm.doc.base_grand_total
	shipment.grand_total = frm.doc.grand_total
	shipment.type = "IN"
	shipment.currency = frm.doc.currency
	shipment.grand_total_currency =  frm.doc.currency
	shipment.value_of_goods = 1
	shipment.pickup_date = frappe.datetime.nowdate()
	frappe.set_route('Form', 'Shipment', shipment.name);
	}
