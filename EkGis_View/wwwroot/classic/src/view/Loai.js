Ext.define('LoaiYeuCau.view.Loai',{
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        
        'Ext.form.Panel',
        'Ext.window.Window'
    ],

    
    bodyPadding: 10,
    title: 'Thêm mới loại yêu cầu',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'Mã loại',
            fieldLabel: 'Ma',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'Tên Loại',
            fieldLabel: 'Ten',
            allowBlank: false
        }],
        buttons: [{
            text: 'Thêm mới loại',
            formBind: true,
            listeners: {
                click: 'onAddClick'
            }
        }]
    }	
})