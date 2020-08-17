
Ext.define('Admin.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.Panel',
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: 'EkGis_SpeedMaint'
            },
            flex: 0
        },
        iconCls: 'x-fa fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    layout: {
        type: "vbox",
        align: "stretch"
    },

    items: [{
        title: 'Yêu Cầu',
        layout: {
            type: "vbox",
            align: "stretch"
        },
        iconCls: 'x-fa fa-home',
        // The following grid shares a store with the classic version's grid as well!
        items: [
            {
                xtype: 'dsdmyeucau',
            }
        ]
    }, {
        title: 'Loại yêu cầu',
        layout: {
            type: "vbox",
            align: "stretch"
        },
        iconCls: 'x-fa fa-user',
        items: [
            {
                xtype: 'dsdmphannhom',
            }
        ]
    }, {
        title: 'Nhân viên',
        iconCls: 'x-fa fa-users',
        layout: {
            type: "vbox",
            align: "stretch"
        },
        items: [
            {
                xtype: 'dsnhanvien',
            }]
    }, {
        title: 'Khách hàng',
        iconCls: 'x-fa fa-user',
        layout: {
            type: "vbox",
            align: "stretch"
        },
        items: [
            {
                xtype: 'dskhachhang',
            }]
    }]
});


Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
