Package.describe({
  name: 'swappa:swappa-matches',
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

  api.use(['swappa:swappa-lib']);

  api.versionsFrom('1.1.0.3');
  api.addFiles([
    'lib/collections.js'
  ]);

  api.addFiles([
    'server/lib/matcher.js',
    'server/publications.js',
    'server/methods.js'
  ], 'server');

  api.export('Matches');

});

Package.onTest(function(api) {
  api.use('mongo');
  api.use('tinytest');
  api.use('weedow:matches');
  api.addFiles('matches-tests.js');
});
