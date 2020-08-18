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
    plugins: 'gridfilters',
    flex: 1,
    columns: [{
        xtype: 'rownumberer',
        text: '#',
        flex: 1,
        align: 'center',
        sortable: false
    }, {

        xtype: 'gridcolumn',
        renderer: function () {
            return "<i class='x-fa fa-calendar'></i>";
        },
        flex: 0.5,
    }, {
        xtype: 'gridcolumn',
        cls: 'content-column',
        renderer: function () {
            return "<i class='x-fa fa-wrench'></i>";
        },
        flex: 0.5,
    }, {
        xtype: 'gridcolumn',
        cls: 'content-column',
        renderer: function () {
            return "<img src='https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg' width=50 height=50/>";
        },
    }, {
        xtype: "datecolumn",
        text: "Ngày Yêu Cầu",
        flex: 3,
        align: 'center',
        dataIndex: "ngayTiepNhan",
        format: "d/m/Y"
    }, {
        text: "Nội Dung",
        flex: 4,
        align: 'center',
        minWidth: 200,
        dataIndex: "noidung"
    }, {
        text: "Người Yêu Cầu",
        flex: 4,
        align: 'center',
        dataIndex: "tenKH",

    }, {
        text: "Loại Yêu Cầu",
        flex: 4,
        align: 'center',
        dataIndex: "tenLoai",
    }, {
        text: "Trạng Thái",
        flex: 3,
        align: 'center',
        dataIndex: "tenTrangThai",
        reference: 'state',
        filter: {
            type: 'string',
            itemDefaults: {
            }
        },
        renderer: function (value, metaData, opData) {
            if (value === "Đã xử lý") {
                metaData.style = "background-color:#EAA8A8;color:white;border-radius:10px";
            } else if (value === "Chưa xử lý") {
                metaData.style = "background-color:#daef2c;color:white;border-radius:10px";
            } else {
                metaData.style = "background-color:green;color:white;border-radius:10px";
            }
            return value;
        },

    }],
    viewConfig: {
        emptyText: "Không có dữ liệu bạn tìm kiếm"
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
            xtype: 'form',
            reference: 'frmSearch',
            items: [{
                xtype: "fieldset",
                title: 'Tìm kiếm yêu cầu',
                layout: 'column',
                reference: 'frmSearch',
                style: {
                    paddingTop: '10px'
                },
                paddingBottom: '10px',
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Ngày tiếp nhận',
                    combineErrors: true,
                    msgTarget: 'side',
                    layout: 'hbox',
                    defaults: {
                        flex: 1,
                    },
                    items: [{
                        xtype: 'datefield',
                        name: 'startDate',
                        emptyText: "Chọn ngày bắt đầu",
                        reference: 'startdate',
                        format: 'm/d/Y',
                    }, {
                        xtype: 'datefield',
                        name: 'endDate',
                        emptyText: "Chọn ngày kết thúc",
                        padding: '0 0 0 10',
                        reference: 'enddate',
                        format: 'm/d/Y',
                        listeners: {
                            'change': function (me) {
                                var sdate = this.up('fieldcontainer').getRefItems()[0].getSubmitValue();
                                var edate = me.getSubmitValue();
                                if (edate < sdate) {
                                    Ext.toast('Ngày kết thúc phải lớn hơn ngày bắt đầu!!Vui lòng nhập lại', 'Lỗi nhập')
                                }

                            }
                        }
                    }]
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Loại yêu cầu ',
                    style: {
                        paddingLeft: '50px'
                    },
                    emptyText: "Chọn loại yêu cầu",
                    queryMode: 'remote',
                    displayField: 'tenLoai',
                    valueField: 'maLoai',
                    reference: 'txtLoai',
                    store: {
                        type: 'sdmphannhom',
                        proxy: { url: 'api/loai' }
                    },
                    bind: { value: "{record.maLoai}" },
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Trạng thái ',
                    style: {
                        paddingLeft: '50px',
                    },
                    emptyText: "Chọn trạng thái",
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
                    reference: 'txtTrangThai',
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Người yêu cầu ',
                    emptyText: "Nhập người yêu cầu",
                    reference: 'txtKH',
                    width: '31%',
                    reference: 'txtKH',
                    style: {
                        paddingTop: '10px'
                    }
                }, {
                    xtype: "textfield",
                    fieldLabel: "Từ khóa ",
                    reference: "txtSearch",
                    emptyText: "Nhập từ khóa tìm kiếm",
                    width: "50%",
                    style: {
                        paddingLeft: '50px',
                        paddingTop: '10px'
                    },
                    listeners: {
                        specialkey: 'specialkey'
                    },
                    reference: 'txtNoiDung',
                }, {
                    xtype: "button",
                    reference: "btnTimKiem",
                    iconCls: "x-fa fa-search",
                    text: "Tìm",
                    style: {
                        marginTop: '10px',
                        marginLeft: '10px'
                    },
                    cls: "EnterToTab",
                    handler: "onSearch"
                }, {
                    xtype: "button",
                    reference: "reset",
                    iconCls: "fa fa-retweet",
                    text: "Tìm mới",
                    style: {
                        marginTop: '10px',
                        marginLeft: '10px'
                    },
                    cls: "EnterToTab",
                    handler: "onReset"
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
                iconCls: "fa fa-retweet",
                reference: "btnAdd",
                bind: { disabled: "{!rSelected}" },
                text: "Chuyển Trạng Thái",

                tooltip: "AddTooltip",
                handler: "onEditStatus"
            }, {
                xtype: "button",
                style: {
                    backgroundColor: '#EAA8A8',
                    marginLeft: "70px",
                    marginBottom: "20px"
                },
                reference: 'daxuli',
                width: 20,
                height: 20,
                listeners: {
                    click: function () {
                        var view = this.up('gridpanel');
                        var form = view.getReferences('state').state;
                        form.filter.setValue('Đã')
                    }
                }
            },
            {
                xtype: "button",
                style: {
                    backgroundColor: '#daef2c',
                    marginBottom: "15px"
                },
                reference: 'chuaxuli',
                listeners: {
                    click: function () {
                        var view = this.up('gridpanel');
                        var form = view.getReferences('state').state;
                        form.filter.setValue('Chưa')
                    }
                },
                width: 20,
                height: 20,
            }, {
                xtype: "button",
                style: {
                    backgroundColor: 'green',
                    marginBottom: "15px"
                },
                reference: 'dangxuli',
                width: 20,
                height: 20,
                listeners: {
                    click: function () {
                        var view = this.up('gridpanel');
                        var form = view.getReferences('state').state;
                        form.filter.setValue('Đang')
                    }
                }
            }, "->", {
                xtype: "pagingtoolbar",
                displayInfo: true,
                bind: {
                    store: "{store}"
                },
            }
        ]
    }],

    title: "Danh sách yêu cầu",
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
        var noidung = me.refs.txtNoiDung.getValue();
        var KH = me.refs.txtKH.getValue();
        var Loai = me.refs.txtLoai.getValue();
        var TrangThai = me.refs.txtTrangThai.getValue();
        var Sdate = me.getView().refs.startdate.getSubmitValue();
        var Edate = me.getView().refs.enddate.getSubmitValue();
        console.log(Sdate);
        if (Loai == null) {
            Loai = '';
        };
        if (TrangThai == null) {
            TrangThai = '';
        };
        console.log(Loai);
        var url = "/api/yeucau?" + '&noidung=' + noidung + '&tenKH=' + KH + '&maloai=' + Loai + '&matrangthai=' + TrangThai + '&ngaybatdau=' + Sdate + '&ngayketthuc=' + Edate;
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
        record.set("maTrangThai", 2);
        record.set("maKH", 1);
        Ext.create("Admin.view.YeuCau.cnDMYeuCau", {
            title: "Thêm mới yêu cầu",
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
        console.log(record);
        Ext.create("Admin.view.YeuCau.cnDMYeuCau", {
            title: "Cập nhật yêu cầu",
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
    },

    onReset: function () {
        var me = this;
        var view = me.getView();
        var frm = view.getReferences('frmSearch').frmSearch;
        frm.reset();
    }
});
