var _phanNhomServices = "";
Ext.define("Admin.view.YeuCau.dsDMYeuCauModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.yeucau-dsdmyeucau",
    data: {
        rSelected: null,
    },
    stores: {
        store: { type: "sdmyeucau" }
    }
});

Ext.define("Admin.view.YeuCau.dsDMYeuCau", {
    extend: "Ext.grid.Panel",
    alias: 'widget.dsdmyeucau',
    requires: ["Admin.view.YeuCau.dsDMYeuCauController", "Admin.view.YeuCau.dsDMYeuCauModel"],
    controller: "yeucau-dsdmyeucau",
    viewModel: {
        type: "yeucau-dsdmyeucau"
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
        xtype: "datecolumn",
        text: "Ngày Yêu Cầu",
        flex: 3,
        dataIndex: "ngayTiepNhan",
        format: "d/m/Y"
    }, {
        text: "Nội Dung",
        flex: 4,
        minWidth: 200,
        dataIndex: "noidung"
    }, {
        text: "Người Yêu Cầu",
        flex: 4,
        dataIndex: "tenKH",

    }, {
        text: "Loại Yêu Cầu",
        flex: 4,
        dataIndex: "tenLoai",
    }, {
        text: "Trạng Thái",
        flex: 3,
        dataIndex: "tenTrangThai",
    }],
    viewConfig: {
        emptyText: "ExtNoData"
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
                    emptyText: "Tìm kiếm",
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
                handler: "onDelete"
            }, {
                xtype: "button",
                iconCls: "fa fa-calendar",
                reference: "btnAdd",
                text: "Thêm Công Việc",
                bind: { disabled: "{!rSelected}" },
                tooltip: "AddTooltip",
                handler: "onAddJob"
            }, {
                xtype: "button",
                iconCls: "fa fa-retweet",
                reference: "btnAdd",
                bind: { disabled: "{!rSelected}" },
                text: "Chuyển Trạng Thái",

                tooltip: "AddTooltip",
                handler: "onEditStatus"
            }, "->", {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{store}"
                },
                style: "padding: 0px !important",
                lastText: "ExtLastText",
                prevText: "ExtPrevText",
                firstText: "ExtFirstText",
                nextText: "ExtNextText",
                refreshText: "ExtRefreshText",
                beforePageText: "ExtBeforePageText",
                afterPageText: "ExtAfterPageText",
                displayMsg: "ExtDisplayMsg",
                emptyMsg: "ExtEmptyMsg",
                listeners: {
                    beforechange: function (page, currentPage) {
                        //--- Get Proxy ------//
                        var myProxy = this.store.getProxy();
                        //--- Define Your Parameter for send to server ----//
                        myProxy.params = {
                            skipCount: 0,
                            maxResultCount: 0
                        };
                        //--- Set value to your parameter  ----//
                        myProxy.setExtraParam("skipCount", (currentPage - 1) * this.store.pageSize);
                        myProxy.setExtraParam("maxResultCount", this.store.pageSize);
                    }
                }
            }
        ]
    }],

    title: "Danh sách loại",
    iconCls: "x-fa fa-object-group",

    listeners: {
        afterRender: "onAfterrender"
    }
});

Ext.define("Admin.view.YeuCau.dsDMYeuCauController", {
    extend: "Ext.app.ViewController",
    alias: "controller.yeucau-dsdmyeucau",
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
        var url = "/api/yeucau";
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

    onAdd: function () {
        var me = this;
        var record = Ext.create("Admin.model.mDMYeuCau", { maYeuCau: 0 });
        //console.log(record);
        record.set("maTrangThai", 2);
        record.set("maKH", 1);
        Ext.create("Admin.view.YeuCau.cnDMYeuCau", {
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
        Ext.create("Admin.view.YeuCau.cnDMYeuCau", {
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
            message: 'Bạn có muốn xóa yêu cầu này không?',
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


    fnDELETEAjax: function (fnSauKhiLoad) {
        var record = this.getViewModel().get("rSelected");
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            async: false,
            url: '/api/yeucau/' + record.get('maYeuCau'),
            success: function (responseData) {
                if (fnSauKhiLoad) fnSauKhiLoad(responseData);
                console.log("ok");
            },
            complete: function () {
                console.log(record.get('maYeuCau'));
            },
            error: function (exx) {
                //abp.notify.warn(exx);
            }
        });
    },
    onEditStatus: function () {
        var me = this;
        var record = me.getViewModel().get("rSelected");
        console.log(record);
        Ext.create("Admin.view.YeuCau.cnTrangThai", {
            title: "Thay đổi trạng thái",
            viewModel: {
                data: {
                    record: record,
                    fnSauKhiSave: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    }
});
