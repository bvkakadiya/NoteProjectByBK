/**
 * Created by bhavesh on 29-04-2017.
//  */
// var data1 = '';
// var data2 = {};
// var datares = {};
// var data2res = {};
// var rowIndex;
// var data1rep;
// var data2rep;
var online = navigator.onLine;
Ext.define('MyApp.view.NoteLayoutViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.notelayout',
    requires: ['MyApp.store.NoteNavStore'],

    addTab: function (button) {
        this.loadData();
        var name = Ext.ComponentQuery.query('#data1IID')[0].getValue();
        var tabpanel = Ext.ComponentQuery.query('#fieldsetIID')[0];
        var id = tabpanel.items.length;
        // for(i=0;i<id;i++){
        //
        // }

        if (name == "") {
            Ext.Msg.alert('Note', 'Please Enter Note Name');
            return;
        }

        var griddata=Ext.getStore('NoteNavStore').data.items;
        var gridlength=griddata.length;
        for (i = 0; i < gridlength; i++) {
            if (name == griddata[i].data.name) {
                Ext.Msg.alert('Note', 'It\'s already Exist');
                return;
            }
        }
        for (i = 0; i < id; i++) {
            if (name == tabpanel.items.items[0].getTitle()) {
                Ext.Msg.alert('Note', 'It\'s already Exist, but not Saved');
                return;
            }
        }
        var tab = Ext.ComponentQuery.query('#fieldsetIID')[0].add({
            title: name,
            closable: true,
            itemId: name + 'IID',
            items: [{
                xtype: 'htmleditor',
                margin: '10 10 10 10',
                height: 400,
            }],
            dockedItems: [{
                xtype: 'toolbar',
                itemId: 'savaPanelIID',
                dock: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Save',
                    width: 100,
                    margin: '10 10 10 10',
                    columnWidth: 0.20,
                    // handler: 'addTab',
                    listeners: {
                        click: 'saveData'
                    }
                }, {
                    xtype: 'button',
                    text: 'View',
                    width: 100,
                    margin: '10 10 10 10',
                    columnWidth: 0.20,
                    // handler: 'addTab',
                    listeners: {
                        click: 'viewData'
                    }
                }]
            }]
        });
        tabpanel.setActiveTab(tab);
    },
    saveData: function (button) {
        this.loadData();
        var data = button.up().up().down().getValue().toString();
        var userId = '2424';
        var noteName = Ext.ComponentQuery.query('#data1IID')[0].getValue();
        var timeStamp = +new Date();
        Ext.Ajax.request({
            url: '/savedata/online',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            jsonData: {
                'userId': userId,
                'noteName': noteName,
                'timeStamp': timeStamp,
                'dataStore': data},
            success: function (conn, response, options, eOpts) {
                var dtabIID=button.up().up().getItemId();// tab itemId
                Ext.ComponentQuery.query('#'+dtabIID)[0].close(); //close tab
                Ext.Msg.alert('Hello', conn.responseText);

            },
            failure: function (conn, response, options, eOpts) {
                Ext.Msg.alert(conn.responseText);
            }
        });

    },
    viewData: function (button) {
        // var data = button.up().up().down().getValue().toString();
        // var userId = '2424';
        // var timeStamp = +new Date();
        // var jsonString = {'userId': userId, 'timeStamp': timeStamp, 'dataStore': data};

        Ext.Ajax.request({
            url: '/viewdata',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            params: {'userId': '24241493629541210'},
            success: function (conn, request, response, options, eOpts) {
                data1 = request;
                datares = conn.response;
                data2 = response;
                Ext.Msg.alert('Hello', conn.responseText);
                // if (result.success) {
                //     Packt.util.Alert.msg('Success!', 'Stock was saved.');
                //     store.load();
                //     win.close();
                // } else {
                //     Packt.util.Util.showErrorMsg(result.msg);
                // }
            },
            failure: function (conn, response, options, eOpts) {
                // TODO get the 'msg' from the json and display it
                Ext.Msg.alert(conn.responseText);
            }
        });

    },
    loadData: function () {
        Ext.Ajax.request({
            url: '/loaddata',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            params: {'userId': '2424'},
            success: function (conn, request, response, options, eOpts) {
                data1 = request;
                datares = conn.responseText;
                data2 = JSON.parse(conn.responseText).docs;
                data2res = response;

                Ext.getStore('NoteNavStore').loadData(JSON.parse(conn.responseText).docs);
                // if (result.success) {
                //     Packt.util.Alert.msg('Success!', 'Stock was saved.');
                //     store.load();
                //     win.close();
                // } else {
                //     Packt.util.Util.showErrorMsg(result.msg);
                // }
            },
            failure: function (conn, response, options, eOpts) {
                // TODO get the 'msg' from the json and display it
                Ext.Msg.alert(conn.responseText);
            }
        });

    },
    onGridRawSelect: function (record, index, eOpts) {
        data1 = record;
        rowIndex = index;
        var tabpanel = Ext.ComponentQuery.query('#fieldsetIID')[0];
        var id = tabpanel.items.length;
        // for(i=0;i<id;i++){
        //
        // }
        var tab = Ext.ComponentQuery.query('#fieldsetIID')[0].add({
            title: index.data.name,
            closable: true,
            itemId: index.data.name + 'IID',
            items: [{
                xtype: 'htmleditor',
                margin: '10 10 10 10',
                height: 400,
                value: index.data.dataStore
            }],
            dockedItems: [{
                xtype: 'toolbar',
                itemId: 'savaPanelIID',
                dock: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Edit',
                    width: 100,
                    margin: '10 10 10 10',
                    columnWidth: 0.20,
                    // handler: 'addTab',
                    listeners: {
                        click: 'editData'
                    }
                }, {
                    xtype: 'button',
                    text: 'Cancle',
                    width: 100,
                    margin: '10 10 10 10',
                    columnWidth: 0.20,
                    // handler: 'addTab',
                    listeners: {
                        click: 'viewData'
                    }
                }]
            }]
        });
        tabpanel.setActiveTab(tab);
    },
    deleteFromGridRow:function (view, rowIndex, colIndex, item, e, record, row){
        Ext.Ajax.request({
            url: '/deletedata',
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            params: {'userId': record.data.userId,'_id':record.data._id},
            success: function (conn, response, options, eOpts) {

                Ext.Msg.alert('Note', conn.responseText);
            },
            failure: function (conn, response, options, eOpts) {
                // TODO get the 'msg' from the json and display it
                Ext.Msg.alert(conn.responseText);
            }

        });
        this.loadData();
    }
});
//
// getDatafromDb: function () {
//     Ext.Ajax.request({
//         url: 'getdata/pouchdb',
//         method: 'GET',
//         headers: {'Content-Type': 'application/json'},
//
//         params: Ext.JSON.encode(),
//         success: function (conn, response, options, eOpts) {
//             var result = Packt.util.Util.decodeJSON(conn.responseText);
//             if (result.success) {
//                 Packt.util.Alert.msg('Success!', 'Stock was saved.');
//                 store.load();
//                 win.close();
//             } else {
//                 Packt.util.Util.showErrorMsg(result.msg);
//             }
//         },
//         failure: function (conn, response, options, eOpts) {
//             // TODO get the 'msg' from the json and display it
//             Packt.util.Util.showErrorMsg(conn.responseText);
//         }
//     });
// },