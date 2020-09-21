var _phanNhomServices = "";
Ext.define("Admin.view.configs.dsDMPhanNhomModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.configs-dsdmphannhom",
    data: {
        rSelected: null,
    },
    stores: {
        store: { type: "sdmphannhom" }
    }
});

Ext.define("Admin.view.configs.dsDMPhanNhom", {
    extend: "Ext.grid.Panel",
    alias: "widget.dsdmphannhom",
    requires: ["Admin.view.configs.dsDMPhanNhomController", "Admin.view.configs.dsDMPhanNhomModel"],
    controller: "configs-dsdmphannhom",
    viewModel: {
        type: "configs-dsdmphannhom"
    },
    layout: 'fit',
    bind: {
        selection: "{rSelected}",
        store: "{store}"
    },
    flex: 1,
    columns: [{
        xtype: 'rownumberer',
        text: '#',
        flex: 1,
        align: 'center',
        sortable: false
    }, {
        text: "Mã loại",
        flex: 3,
        dataIndex: "maLoai",
        align: 'center',
    }, {
        text: "Tên loại",
        flex: 3,
        minWidth: 200,
        dataIndex: "tenLoai",
        align: 'center',
    }, {
        xtype: "datecolumn",
        text: "Ngày Tạo",
        flex: 3,
        dataIndex: "ngayTao",
        format: "d/m/Y",
        align: 'center',
    }],
    viewConfig: {
        emptyText: "Không có dữ liệu cần tìm"
    },
    dockedItems: [{
        xtype: "toolbar",
        border: false,
        dock: "top",
        layout: "fit",
        style: {
            borderTop: "solid 1px #d0d0d0 !important",
            paddingBottom: "0px",
            paddingTop: "4px"
        },
        items: [{
            xtype: "panel",
            layout: {
                type: "vbox",
                align: "stretch"
            },
            items: [{
                xtype: "fieldcontainer",
                layout: "hbox",
                combineErrors: true,
                defaultType: "textfield",
                defaults: {
                    labelWidth: 60,
                    labelAlign: "right",
                    margin: "5 0 0 0"
                },
                items: [{
                    xtype: "textfield",
                    fieldLabel: "Tìm",
                    reference: "txtSearch",
                    emptyText: "Nhập tên loại",
                    tabIndex: 1,
                    flex: 6,
                    cls: "EnterToTab",
                    listeners: {
                        specialkey: 'specialkey'
                    }
                }, {
                    xtype: "button",
                    reference: "btnTimKiem",
                    iconCls: "x-fa fa-search",
                    text: "Tìm",
                    flex: 1,
                    tabIndex: 12,
                    cls: "EnterToTab",
                    handler: "onSearch"
                }]
            }]
        }]
    }, {
        xtype: "toolbar",
        dock: "bottom",
        items: [
            {
                xtype: "button",
                iconCls: "fa fa-plus",
                reference: "btnAdd",
                text: "Thêm",

                tooltip: "AddTooltip",
                handler: "onAdd"
            }, {
                xtype: "button",
                iconCls: "fa fa-pencil",
                reference: "btnUpdate",
                bind: { disabled: "{!rSelected}" },
                text: "Sửa",

                tooltip: "EditTooltip",
                handler: "onUpdate"
            }, {
                xtype: "button",
                iconCls: "fa fa-minus",
                reference: "btnDelete",
                bind: { disabled: "{!rSelected}" },
                text: "Xóa",
                tooltip: "DeleteTooltip",
                handler: "onDelete"
            }, "->", {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{store}"
                },
                displayInfo: true,
                displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                emptyMsg: "No records to display&nbsp;"

            }
        ]
    }],

    title: "Danh sách loại",
    iconCls: "x-fa fa-object-group",

    listeners: {
        afterRender: "onAfterrender"
    }
});

Ext.define("Admin.view.configs.dsDMPhanNhomController", {
    extend: "Ext.app.ViewController",
    alias: "controller.configs-dsdmphannhom",
    storeInfo: null,
    refs: null,
    init: function () {
        var me = this;
        me.callParent(arguments);
    },
    onAfterrender: function () {
        var me = this;
        me.refs = me.getReferences();
        me.storeInfo = me.getViewModel().storeInfo;
        me.onSearch();
    },

    specialkey: function (field, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },

    onSearch: function () {
        var me = this;
        var store = me.storeInfo.store;
        var txt = me.refs.txtSearch.getValue();
        var url = "/api/loai/paging/" + txt;
        store.proxy.api.read = url;
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                // console.log(records);
                if (records == null) {
                    store.removeAll();
                }
            }
        });
    },

    onAdd: function () {
        var me = this;
        var record = Ext.create("Admin.model.mDMPhanNhom", { maLoai: 0 });
        //console.log(record);
        Ext.create("Admin.view.configs.cnDMPhanNhom", {
            title: "Thêm mới loại",
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    },

    onUpdate: function () {
        var me = this;
        var record = me.getViewModel().get("rSelected");
        Ext.create("Admin.view.configs.cnDMPhanNhom", {
            title: "Cập nhật loại",
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    },

    onDelete: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Xóa loại',
            message: 'Bạn có muốn xóa loại này không?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    me.fnDELETEAjax();
                    me.onSearch();
                } else {
                }
            }
        });

    },
    fnGETAjax: function (url, fnSauKhiLoad) {
        console.log(url);
        $.ajax({
            type: 'GET',
            dataType: 'json',
            async: false,
            url: url,
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

    fnDELETEAjax: function (url, fnSauKhiLoad) {
        var record = this.getViewModel().get("rSelected");
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            async: false,
            url: '/api/loai/' + record.get('maLoai'),
            success: function (responseData) {
                if (fnSauKhiLoad) fnSauKhiLoad(responseData);
            },
            complete: function () {
            },
            error: function (exx) {
                // abp.notify.warn(exx);
            }
        });
    },

    fnPUTAjax: function (url, data, fnSauKhiLoad) {
        $.ajax({
            type: 'PUT',
            context: this,
            async: false,
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                if (fnSauKhiLoad) fnSauKhiLoad(responseData);
            },
            complete: function () {
            },
            error: function (exx) {
                abp.notify.warn(exx);
            }
        });
    },

    fnPOSTAjax: function (url, data, fnSauKhiLoad) {
        $.ajax({
            type: 'POST',
            context: this,
            async: false,
            url: '/api/loai/' + record.get('tenLoai'),
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: 'jsonp',
            success: function (responseData) {
                if (fnSauKhiLoad) fnSauKhiLoad(responseData);
            },
            complete: function () {
            },
            error: function (exx) {
                //abp.notify.warn(exx);
            }
        });
    },
});
