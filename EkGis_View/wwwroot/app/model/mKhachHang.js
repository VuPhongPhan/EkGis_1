Ext.define("Admin.model.mKhachHang", {
    extend: "Ext.data.Model",
    idProperty: "maKH",
    fields: [
        { name: "maKH", type: "int" },
        { name: "tenKH", type: "string" },
        { name: "email", type: "string" },
        { name: "sdt", type: "string" },
        { name: "diaChi", type: "string" },
        { name: "ngaySinh", type: "date" },
    ]
});
