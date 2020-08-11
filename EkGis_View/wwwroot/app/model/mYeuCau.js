Ext.define("Admin.model.mYeuCau", {
    extend: "Ext.data.Model",
    idProperty: "maLoai",
    fields: [
        { name: "maLoai", type: "int" },
        { name: "tenLoai", type: "string" },
        { name: "ngayTao", type: "date" },
    ]
});
