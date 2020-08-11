﻿Ext.define('Admin.view.YeuCau.cnDMYeuCauModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.yeucau-cndmyeucau',
    stores: {
        store: { type: 'sdmyeucau' },
        loai: { type: 'sdmphannhom' }
    },
    data: {
        record: null,
        fnSauKhiSave: null,
        rSelected: null
    }

});

Ext.define('Admin.view.YeuCau.cnTrangThai', {
    extend: 'Ext.window.Window',
    controller: 'yeucau-cndmyeucau',
    viewModel: {
        type: 'yeucau-cndmyeucau'
    },
    width: '50%',
    modal: true,
    items: [{
        width: '100%',
        height: '100%',
        items: [{
            xtype: 'fieldset',
            title: 'Thông tin yêu cầu',
            width: '100%',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Mã yêu cầu',
                width: '100%',
                bind: '{record.maYeuCau}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nội dung',
                width: '100%',
                bind: '{record.noidung}'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Trạng thái',
                width: '100%',
                bind: '{record.tenTrangThai}'
            }]
        }, {
            xtype: 'combobox',
            fieldLabel: 'Trạng thái mới',
            emptyText: 'Trạng thái mới',
            width: '100%',
            bind: "{record.maTrangThai}",
            displayField: 'tenTrangThai',
            valueField: 'maTrangThai',
            store: Ext.create("Ext.data.Store", {
                fields: ["maTrangThai", "tenTrangThai"],
                data: [
                    { "maTrangThai": 1, "tenTrangThai": "Đang xử lý" },
                    { "maTrangThai": 2, "tenTrangThai": "Chưa xử lý" },
                    { "maTrangThai": 3, "tenTrangThai": "Đã xử lý" }
                ]
            }),
        }, {
            xtype: 'textarea',
            fieldLabel: 'Mô tả',
            width: '100%',
            bind: '{record.moTa}'
        }, {
        }]
    }],
    buttons: [{
        text: "Lưu",
        iconCls: 'x-fa fa-save',
        reference: "btnSave",
        handler: "onEditStatus"
    }, {
        text: "Đóng",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }]
});


Ext.define('Admin.view.YeuCau.cnDMYeuCau', {
    extend: 'Ext.window.Window',
    controller: 'yeucau-cndmyeucau',
    viewModel: {
        type: 'yeucau-cndmyeucau'
    },
    width: '80%',
    modal: true,
    items: [{
        xtype: 'form',
        padding: 5,
        reference: 'frmYeuCau',
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
            title: 'Thông tin người yêu cầu',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Người yêu cầu (*):',
                width: '100%',
                // bind: '{record.maKH}'
                bind: "{record.maKH}",
                displayField: 'tenKH',
                valueField: 'maKH',
                store: Ext.create("Ext.data.Store", {
                    fields: ["maKH", "tenKH"],
                }),
            }, {
                xtype: 'textfield',
                fieldLabel: 'Số điện thoại :',
                emptyText: 'Nhập số điện thoại',
                width: '100%',
                bind: ''
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email :',
                width: '100%',
                bind: ''
            }]
        }, {
            xtype: 'fieldset',
            title: 'Thông tin yêu cầu ',
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Loại yêu cầu',
                emptyText: 'Chọn loại yêu cầu ',
                width: '100%',
                queryMode: 'remote',
                valueField: "maLoai",
                displayField: "tenLoai",
                bind: {
                    store: {
                        type: 'sdmphannhom',
                        proxy: { url: 'api/loai' }
                    },
                    value: "{record.maLoai}",
                },
            }, {
                xtype: 'datefield',
                fieldLabel: 'Ngày tiếp nhận :',
                style: {
                    float: 'left',
                },
                width: '50%',
                value: new Date(),
                queryMode: 'remote',
                // bind: "{record.ngayTiepNhan}",
            }, {
                xtype: 'combobox',
                fieldLabel: 'Mức độ :',
                width: '50%',
                style: {
                    paddingLeft: '50px'
                },
                queryMode: 'remote',
                bind: "{record.maMucDo}",
                displayField: 'tenMucDo',
                emptyText: 'Chọn mục độ',
                valueField: 'maMucDo',
                store: Ext.create("Ext.data.Store", {
                    fields: ["maMucDo", "tenMucDo"],
                    data: [
                        { "maMucDo": 1, "tenMucDo": "Mức độ 1" },
                        { "maMucDo": 2, "tenMucDo": "Mức độ 2" },
                        { "maMucDo": 3, "tenMucDo": "Mức độ 3" }
                    ]
                }),
            }, {
                xtype: 'textarea',
                fieldLabel: 'Nội dung yêu cầu (*) :',
                emptyText: 'Nội dụng yêu cầu',
                width: '100%',
                bind: "{record.noidung}",
            }, {
                xtype: 'textfield',
                fieldLabel: 'Địa điểm :',
                emptyText: 'Nhập địa điểm',
                width: '100%',
                bind: "{record.diaDiem}",
            }, {
                xtype: 'combobox',
                fieldLabel: 'Người xử lý :',
                emptyText: 'Chọn người xử lý',
                width: '100%',
                queryMode: 'remote',
                bind: "{record.maNV}",
                displayField: 'tenNV',
                valueField: 'maNV',
                store: Ext.create("Ext.data.Store", {
                    fields: ["maNV", "tenNV"],
                    data: [

                        { "maNV": 1, "tenNV": "Nguyễn Thúc Quân" },
                        { "maNV": 2, "tenNV": "Phan Vũ Phong" },
                        /*  { "maMucDo": 3, "tenMucDo": "Mức độ 3" }*/
                    ]
                }),
            }, {
                xtype: 'combobox',
                // bind: { disabled: "{!rSelected}" },
                fieldLabel: 'Trạng thái :',
                width: '100%',
                queryMode: 'remote',
                enableToggle: true,
                bind: "{record.maTrangThai}",
                displayField: 'tenTrangThai',
                valueField: 'maTrangThai',
                store: Ext.create("Ext.data.Store", {
                    fields: ["maTrangThai", "tenTrangThai"],
                    data: [
                        { "maTrangThai": 1, "tenTrangThai": "Đang xử lý" },
                        { "maTrangThai": 2, "tenTrangThai": "Chưa xử lý" },
                        { "maTrangThai": 3, "tenTrangThai": "Đã xử lý" }
                    ]
                }),
            }]
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
});

Ext.define("Admin.view.YeuCau.cnDMYeuCauController", {
    extend: "Ext.app.ViewController",
    alias: "controller.yeucau-cndmyeucau",
    refs: null,
    storeInfo: null,

    init: function () {
        var me = this;
        me.callParent(arguments);
    },

    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        me.onClose();
    },

    onSave: function () {
        this.fnSave();
    },

    fnSave: function () {
        var me = this;
        /*  var frm = me.refs.frmYeuCau;
          if (!frm.getForm().isValid()) {
  
              return;
          }*/
        var view = me.getView();
        var fnSauKhiSave = me.getViewModel().data.fnSauKhiSave;
        var record = me.getViewModel().get("record");
        view.setLoading(false);

        if (record.data.maYeuCau != 0) {
            view.setLoading(false);
            me.fnPUTAjax();

        } else {
            var record = this.getViewModel().get("record");
            $.ajax({
                type: 'POST',
                context: this,
                async: false,
                url: '/api/yeucau',
                data: JSON.stringify(record.data),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (responseData) {
                    // record.set('maLoai', responseData.maLoai);
                    if (fnSauKhiSave) fnSauKhiSave();
                    console.log(responseData);
                },
                complete: function (responseData) {
                    if (fnSauKhiSave) fnSauKhiSave();
                },
                error: function (exx) {
                    console.log(exx);
                }
            });
        }
    },

    onClose: function () {
        var me = this;
        var store = me.storeInfo.store;
        var url = "/api/loai";
        console.log(store);
        store.proxy.api.read = url;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                console.log(records);
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    fnPUTStatusAjax: function () {
        me = this;
        var record = this.getViewModel().get("record");
        var fnSauKhiSave = me.getViewModel().data.fnSauKhiSave;
        $.ajax({
            type: 'PUT',
            context: this,
            async: false,
            url: '/api/yeucau/' + record.get('maYeuCau') + '/' + record.get('maTrangThai') + '/' + record.get('moTa'),
            data: JSON.stringify(record.data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                console.log(responseData);

            },
            complete: function () {
                //this.fnGETAjax();
                if (fnSauKhiSave) fnSauKhiSave();
            },
            error: function (exx) {
                //abp.notify.warn(exx);
                console.log(exx);

            }
        });
    },
    fnPUTAjax: function () {
        var record = this.getViewModel().get("record");
        var fnSauKhiSave = this.getViewModel().data.fnSauKhiSave;
        $.ajax({
            type: 'PUT',
            context: this,
            async: false,
            url: '/api/yeucau/',
            data: JSON.stringify(record.data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                console.log(responseData);
            },
            complete: function (responseData) {
                //this.fnGETAjax();
                if (fnSauKhiSave) fnSauKhiSave();
            },
            error: function (exx) {
                //abp.notify.warn(exx);
            }
        });
    },


    onEditStatus: function () {
        this.fnPUTStatusAjax();
    }
});