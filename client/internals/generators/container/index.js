module.exports = {
  description: 'application container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'container name'
  }, {
    type: 'confirm',
    name: 'withRouter',
    message: 'with router',
    default: true
  }, {
    type: 'input',
    name: 'parent',
    message: 'parent folder'
  }],
  actions: [{
    type: 'add',
    path: '../../src/containers/{{#if parent}}{{properCase parent}}/{{/if}}{{properCase name}}/index.tsx',
    templateFile: './container/index.tsx.hbs'
  }, {
    type: 'add',
    path: '../../src/containers/{{#if parent}}{{properCase parent}}/{{/if}}{{properCase name}}/tests/index.test.tsx',
    templateFile: './container/index.test.tsx.hbs'
  }]
};
