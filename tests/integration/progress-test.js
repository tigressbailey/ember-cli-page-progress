import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, findAll } from '@ember/test-helpers';

module('Acceptance | Progress', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /documents', async function (assert) {
    await visit('/documents');

    assert.equal(await findAll('.page-progress').length, 1, "Page progress is added");
    assert.equal(await findAll('.page-progress .bar').length, 1, 'Bar is added');
  });
});
