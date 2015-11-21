Package.describe({
  name: 'swappa:swappa-cards',
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
  ]);

  api.use([
      'swappa:swappa-matches'
  ], 'server');

  api.addFiles('lib/collections.js');

  api.addFiles([
      'client/cards.css',
      'client/cards.html',
      'client/cards.js',
      'lib/client/methods.js'
  ], 'client');

  api.addFiles([
      'server/migrations.js',
      'server/publications.js',
      'server/methods.js'
  ], 'server');

  api.export('Cards');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cards');
  api.addFiles('cards-tests.js');
});
