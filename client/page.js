Session.setDefault('page', 'cards');

Template.page.helpers({
    template: function() {
        return Session.get('page');
    }
});