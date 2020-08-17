Ext.define("Admin.view.NhanVien.cnNhanVienModel", {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.vmnhanvien',
    stores: {
        store: { type: 'sNhanVien' }
    },
    data: {
        record: null,
        fnLoad: null
    },
});

Ext.define('Admin.view.NhanVien.cnNhanVien', {
    extend: 'Ext.window.Window',
    controller: 'nhanvien-cnhanvien',
    viewModel: {
        type: 'vmnhanvien'
    },
    width: '70%',
    modal: true,
    items: [{
        xtype: 'form',
        padding: 5,
        reference: 'frmNhanVien',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            flex: 1,
            labelAlign: 'right',
            labelWidth: 100
        },
        items: [{
            xtype: 'fieldset',
            title: 'Thông tin nhân viên',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Tên nhân viên :',
                width: '100%',
                bind: '{record.tenNV}',
                validator: function (val) {
                    return (val.trim().length > 0) ? true : 'Cần nhập tên nhân viên'
                },
                msgTarget: 'side',
            }, {
                xtype: 'combobox',
                fieldLabel: 'Chức vụ :',
                width: '100%',
                queryMode: 'remote',
                displayField: 'tenChucVu',
                emptyText: 'Chọn chức vụ',
                valueField: 'tenChucVu',
                store: Ext.create("Ext.data.Store", {
                    fields: ["tenChucVu"],
                    data: [
                        { "tenChucVu": 'Nhân viên' },
                        { "tenChucVu": 'Giám đốc' },
                    ]
                }),
                bind: '{record.chucVu}',
                validator: function (val) {
                    return (val.trim().length > 0) ? true : 'Cần chọn chức vụ'
                },
                msgTarget: 'side',
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email :',
                width: '100%',
                bind: '{record.email}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Số điện thoại :',
                width: '100%',
                bind: '{record.sdt}',
                vtype: 'num',
                msgTarget: 'side',
            }, {
                xtype: 'textfield',
                fieldLabel: 'Địa chỉ :',
                width: '100%',
                bind: '{record.diaChi}'
            }, {
                xtype: 'datefield',
                fieldLabel: 'Ngày sinh :',
                width: '100%',
                bind: '{record.ngaySinh}'
            }]
        }],
        buttons: [{
            text: "Lưu",
            iconCls: 'x-fa fa-save',
            reference: "btnSave",
            handler: "onSave"
        }, {
            text: "Đóng",
            handler: function () {
                this.up("window").close();
            },
            iconCls: "fa fa-times"
        }]
    }]
});

Ext.define('Admin.view.NhanVien.cnNhanVienController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.nhanvien-cnhanvien',
    refs: null,
    storeInfo: null,

    init: function () {
        this.callParent(arguments);
    },

    onAfterrender: function () {
        this.refs = this.getReferences();
        this.storeInfo = this.getViewModel().storeInfo;
        this.onClose();
    },

    onSave: function () {
        this.fnSave();
    },

    fnSave: function () {

        var view = this.getView();
        var fnLoad = this.getViewModel().data.fnLoad;
        var frm = view.getReferences('frmNhanVien').frmNhanVien;
        var record = this.getViewModel().get("record");
        view.setLoading(false);


        if (!frm.isValid()) {
            Ext.Msg.alert('Thông báo', 'Chưa đủ thông tin!');
        }
        else {
            if (record.data.maNV != 0) {
                view.setLoading(false);
                this.fnPUTAjax();
                Ext.Msg.alert('Thông báo', 'Đã lưu thành công!');
            }
            else {
                var record = this.getViewModel().get("record");
                $.ajax({
                    type: 'POST',
                    context: this,
                    async: false,
                    url: '/api/nhanvien',
                    data: JSON.stringify(record.data),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (responseData) {
                        console.log(responseData);
                    },
                    complete: function (responseData) {
                        if (fnLoad) fnLoad();
                    },
                    error: function (exx) {
                    }
                });
                Ext.Msg.alert('Thông báo', 'Đã thêm thành công!');
            }
        }
    },

    onClose: function () {

    },
    fnPUTAjax: function () {
        var record = this.getViewModel().get("record");
        var fnLoad = this.getViewModel().data.fnLoad;
        $.ajax({
            type: 'PUT',
            context: this,
            async: false,
            url: '/api/nhanvien/',
            data: JSON.stringify(record.data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                console.log(responseData);
            },
            complete: function (responseData) {
                if (fnLoad) fnLoad();
            },
            error: function (exx) {
            }
        });
    },
});


Ext.define('Override.form.field.VTypes', {
    override: 'Ext.form.field.VTypes',

    // vtype validation function
    num: function (value) {
        return this.numb.test(value);
    },
    numb: /^[0-9]+$/,
    numText: 'Số điện thoại là số',
});