Ext.define("Admin.store.sNhanVien", {
    extend: "Ext.data.Store",
    alias: "store.snhanvien",
    model: "Admin.model.mNhanVien",
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
