Ext.define("Admin.model.mNhanVien", {
    extend: "Ext.data.Model",
    idProperty: "maNV",
    fields: [
        { name: "maNV", type: "int" },
        { name: "tenNV", type: "string" },
        { name: "chucVu", type: "string" },
        { name: "email", type: "string" },
        { name: "sdt", type: "string" },
        { name: "diaChi", type: "string" },
        { name: "ngaySinh", type: "date" },
    ]
});
