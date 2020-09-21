Ext.define("Admin.store.sDMYeuCau", {
    extend: "Ext.data.Store",
    alias: "store.sdmyeucau",
    model: "Admin.model.mDMYeuCau",
    pageSize: 9,
    autoLoad: false,
    proxy: {
        type: "rest",
        api: {
            read: ""
        },
        reader: {
            type: "json",
            rootProperty: "items",
            totalProperty: "totalRecord"
        },
        
        appendId: true,
        writer: {
            writeAllFields: true,
            type: "json"
        },

    }
});
