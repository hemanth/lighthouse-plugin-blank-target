'use strict';
const Audit = require('lighthouse').Audit;
const allowedTypes = new Set(['audio', 'video']);

class BlankTargetAudit extends Audit {
  static get meta() {
    return {
      id: 'blank-target',
      title: 'Blank Targets',
      failureTitle: 'Some of the blank targets don\'t have rel attribute',
      description: 'Add rel="noopener noreferrer" to target="_blank"', 
      requiredArtifacts: ['URL', 'AnchorElements'],
    };
  }

  static audit(artifacts) {
      console.log(JSON.stringify(artifacts.AnchorElements))
      const badTargets = artifacts.AnchorElements
        .filter(link => link.target && link.target.includes('_blank') && !link.rel.includes('noopener noreferrer'))
        .map(link => {
          return {
            href: link.href,
            rel: link.rel,
          };
        });

      console.log(badTargets)
  
      const headings = [
        {key: 'href', itemType: 'url', text: 'Link destination'},
        {key: 'rel', itemType: 'text', text: 'Link rel'},
      ];
  
      const details = Audit.makeTableDetails(headings, badTargets, {});
      let displayValue;
  
      return {
        score: Number(badTargets.length === 0),
        details,
        displayValue,
      };
    }
}

module.exports = BlankTargetAudit;
