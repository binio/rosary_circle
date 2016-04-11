// routes.js
Router.route('/', { controller: 'HomeController' });
Router.route('/about', { controller: 'AboutController' });
Router.route('/most', { controller: 'MostController' });
Router.route('/users', { controller: 'UsersController' });
Router.route('/bless', { controller: 'BlessController' });
Router.route('/assignments',{controller:'AssignmentController'});
Router.route('/user/:_id', function(){
    profile = UsersCollection.findOne({_id: this.params._id});
    this.render('userDetail', {
        //to: 'left',
        data: function(){
            return profile;
            }
        });
});
