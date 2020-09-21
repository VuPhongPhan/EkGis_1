Ext.define("Admin.store.sDMPhanNhom", {
    extend: "Ext.data.Store",
    alias: "store.sdmphannhom",
    model: "Admin.model.mDMPhanNhom",
    pageSize: 3,
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
