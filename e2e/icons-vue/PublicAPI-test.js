/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const CarbonIconsVue = require('@rocketsoftware/icons-vue');

describe('@rocketsoftware/icons-vue', () => {
  it('should not update exports without a semver change', () => {
    expect(Object.keys(CarbonIconsVue).sort()).toMatchSnapshot();
  });
});
