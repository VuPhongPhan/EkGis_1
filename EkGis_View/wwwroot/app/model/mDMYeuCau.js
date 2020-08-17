Ext.define("Admin.model.mDMYeuCau", {
    extend: "Ext.data.Model",
    idProperty: "maYeuCau",
    fields: [
        { name: 'maYeuCau', type: 'int' },
        { name: 'maLoai', type: 'int' },
        { name: 'tenLoai', type: 'string' },
        { name: 'maTrangThai', type: 'int' },
        { name: 'tenTrangThai', type: 'string' },
        { name: 'maMucDo', type: 'int'},
        { name: 'maNV', type: 'int' },
        { name: 'tenNV', type: 'string' },
        { name: 'maKH', type: 'int'},
        { name: 'tenKH', type: 'string'},
        { name: 'ngayTiepNhan', type: 'date'},
        { name: 'noidung', type: 'string'},
        { name: 'diaDiem', type: 'string'},
        { name: 'moTa', type: 'string'},
        { name: 'email', type: 'string'},
        { name: 'sdt', type: 'string'},
    ]
});
