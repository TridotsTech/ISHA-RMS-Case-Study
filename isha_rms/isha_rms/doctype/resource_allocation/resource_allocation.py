# Copyright (c) 2024, Raino and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ResourceAllocation(Document):
	def validate(self):
		if self.from_date > self.to_date:
			frappe.throw("From date cannot be greater than To date")
		
		if frappe.db.exists('Resource Allocation', {
			'resource': self.resource,
			'from_date': ('<=', self.from_date),
			'to_date': ('>=', self.from_date),
			'name': ('!=', self.name),
			'status': 'Allocated'
		}):
			frappe.throw("Resource allocation already exists for this resource")
		
	def on_submit(self):
		frappe.db.set_value('Resource', self.code, 'status', 'Allocated')
