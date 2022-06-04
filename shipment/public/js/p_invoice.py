# Copyright (c) 2022, Frontline Solutions and contributors
# For license information, please see license.txt

import frappe
from frappe.model.mapper import get_mapped_doc
from frappe.website.website_generator import WebsiteGenerator

@frappe.whitelist()
def create_purchase_invoice(source_name):
	def update_item(source, target, source_parent):
		target.from_candidate = 1
	doclist = get_mapped_doc("Shipment", source_name, {
		"Shipment": {
			"doctype": "Purchase Invoice",
			"field_map":{
				'name':'canidate_doctype_name'
			},"postprocess": update_item
		},
	})
	#You must return doclist
	return doclist