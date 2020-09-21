Ext.define("Admin.view.configs.cnDMPhanNhomModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.configs-cndmphannhom",
    stores: {
        store: { type: "sdmphannhom" }
    },
    data: {
        record: null,
        fnSauKhiSave: null
    }
});

Ext.define("Admin.view.configs.cnDMPhanNhom", {
    extend: "Ext.window.Window",
    requires: ["Admin.view.configs.cnDMPhanNhomController", "Admin.view.configs.cnDMPhanNhomModel"],
    controller: "configs-cndmphannhom",
    viewModel: {
        type: "configs-cndmphannhom"
    },

    width: 580,
    modal: true,
    items: [{
        xtype: "form",
        padding: 5,
        reference: "frmPhanNhom",
        layout: {
            type: "vbox",
            align: "stretch"
        },
        defaults: {
            flex: 1,
            labelAlign: "right",
            labelWidth: 100
        },
        items: [{
            xtype: "textarea",
            name: "tenLoai",
            validator: function (val) {
                return (val.trim().length > 0) ? true : 'Cần nhập tên loại'
            },
            msgTarget: 'under',
            fieldLabel: "Tên loại",
            bind: "{record.tenLoai}"
        }]
    }],
    buttons: [{
        text: "Lưu",
        iconCls: "fa fa-floppy-o",
        reference: "btnSave",
        // hidden: !abp.auth.hasPermission("CMMS.Category.Manager"),
        handler: "onSave"
    }, {
        text: "Đóng",
        handler: function () {
            this.up("window").close();
        },
        iconCls: "fa fa-times"
    }],
    listeners: {
        afterRender: "onAfterrender",
        close: "onClose"
    }
});

Ext.define("Admin.view.configs.cnDMPhanNhomController", {
    extend: "Ext.app.ViewController",
    alias: "controller.configs-cndmphannhom",
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
        var view = me.getView();
        var frm = view.getReferences('frmPhanNhom').frmPhanNhom;
        var fnSauKhiSave = me.getViewModel().data.fnSauKhiSave;
        var record = me.getViewModel().get("record");
        view.setLoading(false);

        if (record.data.maLoai != 0) {
            if (!frm.isDirty()) {
                Ext.Msg.alert('Thông báo', 'bạn chưa thay đổi gì');
                console.log("ok");
            }
            else if (!frm.isValid()) {
                Ext.Msg.alert('Thông báo', 'bạn chưa thay đổi gì');
            } else {
                view.setLoading(false);
                me.fnPUTAjax();
                Ext.Msg.alert('Thông báo', 'Đã lưu thành công!');
            }
        } else {
            if (!frm.isValid()) {
                Ext.Msg.alert('Thông báo', 'bạn chưa thêm ');
            } else {
                var record = this.getViewModel().get("record");
                $.ajax({
                    type: 'POST',
                    context: this,
                    async: false,
                    url: '/api/loai',
                    data: JSON.stringify(record.data),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'jsonp',
                    success: function (responseData) {
                        // record.set('maLoai', responseData.maLoai);
                        if (fnSauKhiSave) fnSauKhiSave();
                    },
                    complete: function (responseData) {
                        if (fnSauKhiSave) fnSauKhiSave();
                    },
                    error: function (exx) {
                        console.log(exx);
                        //abp.notify.warn(exx);
                    }
                });
                Ext.Msg.alert('Thông báo', 'Đã thêm thành công!');
            }

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

    fnPUTAjax: function () {
        var record = this.getViewModel().get("record");
        $.ajax({
            type: 'PUT',
            context: this,
            async: false,
            url: '/api/loai/' + record.get('maLoai'),
            data: JSON.stringify(record.data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                console.log(responseData);
            },
            complete: function () {
                this.fnGETAjax();
            },
            error: function (exx) {
                //abp.notify.warn(exx);
            }
        });
    },
    fnGETAjax: function (url, fnSauKhiLoad) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            async: false,
            url: '/api/loai',
            success: function (responseData) {
                if (fnSauKhiLoad) fnSauKhiLoad(responseData);
            },
            complete: function () {
            },
            error: function (exx) {
                console.log(exx);
            }
        });
    },
});
