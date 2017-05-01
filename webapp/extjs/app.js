Ext.application({
	
	name: 'MyApp',
    views: ['NoteLayout'],
    stores: ['NoteNavStore'],
	 launch: function() {
        Ext.create('MyApp.view.NoteLayout', {renderTo: Ext.getBody()});
    }
});
