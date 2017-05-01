/**
 * Created by bhavesh on 01-05-2017.
 */
Ext.define('MyApp.store.NoteNavStore', {
    extend: 'Ext.data.Store',
    storeId: 'NoteNavStore',
    fields:[ 'name', 'timeStamp', 'dataStore'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
    },
});