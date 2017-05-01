Ext.define('MyApp.view.NoteLayout', {
    extend: 'Ext.panel.Panel',
    title: 'Note Project',
    itemId: 'NoteMainIID',
    requires: ['MyApp.view.NoteLayoutViewController', 'MyApp.store.NoteNavStore'],
    controller: 'notelayout',
    height: window.screen.height,
    width: window.screen.width,
    layout: {
        type: 'border',
        regionWeights: {
            north: 10,
            east: 5,
            south: 3,
            west: 7
        }
    },
    defaults: {
        frame: true
    },
    items: [
        {
            region: 'west',
            collapsible: true,
            title: 'Navigation',
            width: '20%',
            itemId: 'navPanelIID',
            items: [
                //     {
                //     xtype: 'button',
                //     text: 'View Note',
                //     width: 100,
                //     margin: '10 10 10 10',
                //     columnWidth: 0.20,
                //     // handler: 'addTab',
                //     listeners: {
                //         click: 'loadData'
                //     }
                // },
                {
                    xtype: 'gridpanel',
                    title: 'Notes',

                    autoScroll: true,
                    selModel: {
                        selType: 'rowmodel'// rowmodel is the default selection model
                    },
                    store: 'NoteNavStore',
                    listeners: {
                        select: 'onGridRawSelect'
                    },
                    columns: [
                        {
                            text: 'Note Name',
                            flex: 1,
                            dataIndex: 'name',

                        },
                        {
                            xtype: 'actioncolumn',
                            width: 70,
                            text: 'Del',
                            items: [
                                {

                                    tooltip: 'Delete',
                                    icon: '../images/close.png',
                                    handler: 'deleteFromGridRow'
                                }]
                        }
                        // {
                        //     text: 'TimeStamp',
                        //     dataIndex: 'timeStamp'
                        // }
                    ]
                }]
        },
        {
            region: 'center',
            header: false,
            itemId: 'centerPanelIID',
            //height: '70%',
            // width: '70%',
            items: [
                {
                    xtype: 'form',
                    maxHeight: 50,
                    padding: '0 10 0 10',
                    itemId: 'formIID',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            columnWidth: 0.25,
                            fieldLabel: 'Name',
                            margin: '10 10 10 10',
                            itemId: 'data1IID',
                            allowBlank: false

                        },
                        {
                            xtype: 'button',
                            text: 'New',
                            width: 50,
                            margin: '10 10 10 10',
                            columnWidth: 0.20,
                            // handler: 'addTab',
                            listeners: {
                                click: 'addTab'
                            }
                        },]
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'fieldsetIID'
                }
            ]
        }
    ]

});
