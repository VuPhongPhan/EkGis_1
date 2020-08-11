Ext.define("Admin.store.sDMPhanNhom", {
    extend: "Ext.data.Store",
    alias: "store.sdmphannhom",
    model: "Admin.model.mDMPhanNhom",
    pageSize: 100,
    autoLoad: false,
    proxy: {
        type: "rest",
        api: {
            read: ""
        },
        reader: {
            type: "json",
            rootProperty: "result.items",
            totalProperty: "result.totalCount"
        },
        appendId: true,
        writer: {
            writeAllFields: true,
            type: "json"
        },
     
    }
});
