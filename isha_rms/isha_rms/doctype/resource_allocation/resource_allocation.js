// Copyright (c) 2024, Raino and contributors
// For license information, please see license.txt

frappe.ui.form.on("Resource Allocation", {
	refresh(frm) {
        if(frm.doc.docstatus ==1 && frm.doc.allocation_type == 'Allocated') {
            frm.add_custom_button("Deallocate", function () {
                frappe.db.set_value('Resource', frm.doc.code, 'status', 'Available')
                .then(r => {
                frm.set_value('allocation_type', 'Deallocated')
                frm.refresh_field('allocation_type')
                frm.save('Update')
                })
            })
        }
	},
    resource_type(frm){
        frm.set_query("resource", function() {
            return {
                filters: {
                    "type": frm.doc.resource_type
                }
            };
        });
    }
});
