Ext.define("Admin.store.sDMYeuCau", {
    extend: "Ext.data.Store",
    alias: "store.sdmyeucau",
    model: "Admin.model.mDMYeuCau",
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
