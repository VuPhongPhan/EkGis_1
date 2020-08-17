Ext.define("Admin.view.KhachHang.dsKhachHangModel", {
    extend: "Ext.app.ViewModel",
    alias: "viewmodel.vmkhachhang",
    data: {
        rSelected: null,
    },
    stores: {
        store: { type: "skhachhang" }
    }
});

Ext.define("Admin.view.KhachHang.dsKhachHang", {
    extend: "Ext.grid.Panel",
    alias: 'widget.dskhachhang',
    controller: "ckhachhang",
    viewModel: {
        type: "vmkhachhang"
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
        text: "Tên Khach Hàng",
        flex: 4,
        minWidth: 200,
        dataIndex: "tenKH",
        align: 'center',
    }, {
        text: "Email",
        flex: 4,
        dataIndex: "email",
        align: 'center',
    }, {
        text: "Số Điện Thoại",
        flex: 3,
        dataIndex: "sdt",
        align: 'center',
    }, {
        text: "Địa Chỉ",
        flex: 3,
        dataIndex: "diaChi",
        align: 'center',
    }, {
        xtype: "datecolumn",
        text: "Ngày Sinh",
        flex: 3,
        dataIndex: "ngaySinh",
        format: "d/m/Y",
        align: 'center',
    }],
    viewConfig: {
        emptyText: "Không có dữ liệu"
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
                    emptyText: "Nhập tên khách hàng cần tìm kiếm",
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
            }, "->", {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{store}"
                },
            }
        ]
    }],

    title: "Danh sách loại",
    iconCls: "x-fa fa-object-group",

    listeners: {
        afterRender: "onAfterrender"
    }
});

Ext.define("Admin.view.KhachHang.dsKhachHangController", {
    extend: "Ext.app.ViewController",
    alias: "controller.ckhachhang",
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
        var url = "/api/khachhang/kh" + txt;
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
        var record = Ext.create("Admin.model.mKhachHang", { maKH: 0 });
        Ext.create("Admin.view.KhachHang.cnKhachHang", {
            title: "Thêm khách hàng",
            viewModel: {
                data: {
                    record: record,
                    fnLoad: function () {
                        me.onSearch();
                    }
                }
            }
        }).show();
    },

    onUpdate: function () {
        var me = this;
        var record = me.getViewModel().get("rSelected");
        Ext.create("Admin.view.KhachHang.cnKhachHang", {
            title: "Cập nhật thông tin khách hàng",
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


    fnDELETEAjax: function (fnLoad) {
        var record = this.getViewModel().get("rSelected");
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            async: false,
            url: '/api/khachhang/' + record.get('maKH'),
            success: function () {
                if (fnLoad) fnLoad();
            },
            complete: function () {
            },
            error: function (exx) {
            }
        });
    },
});
