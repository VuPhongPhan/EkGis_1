Ext.define("Admin.store.sKhachHang", {
    extend: "Ext.data.Store",
    alias: "store.skhachhang",
    model: "Admin.model.mKhachHang",
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
