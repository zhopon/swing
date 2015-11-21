Package.describe({
  name: 'swappa:swappa-profile',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'swappa:swappa-lib',
    'swappa:swappa-cards'
  ]);


  api.addFiles([
    'lib/client/profile.html',
    'lib/client/profile.js'
  ], 'client');

  api.addFiles([
      'lib/server/publications.js'
  ], 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('swappa:swappa-profile');
  api.addFiles('swappa-profile-tests.js');
});
