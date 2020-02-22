'use strict';
module.exports = {
  audits: [{
    path: 'lighthouse-plugin-blank-target/audits/blank-target.js',
  }],
  category: {
    title: 'Custom Plugins',
    description: 'Results from custom plugin',
    auditRefs: [
      {id: 'blank-target', weight: 1}
    ],
  },
};
