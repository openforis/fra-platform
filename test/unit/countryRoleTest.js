const assert = require('chai').assert
const R = require('ramda')
const countryRole = require('../../webapp/user/countryRole')

const plainUserInfo = {
  roles: [
    {
      'countryIso': 'ARM',
      'role': 'REVIEWER'
    },
    {
      'countryIso': 'AUS',
      'role': 'REVIEWER'
    },
    {
      'countryIso': 'AUS',
      'role': 'NATIONAL_CORRESPONDENT'
    },
    {
      'countryIso': 'ERI',
      'role': 'NATIONAL_CORRESPONDENT'
    },
    {
      'countryIso': 'EST',
      'role': 'NATIONAL_CORRESPONDENT'
    },
    {
      'countryIso': 'ETH',
      'role': 'NATIONAL_CORRESPONDENT'
    }
  ]
}

const masterReviewer = {
  roles: [
    {
      'countryIso': null,
      'role': 'REVIEWER_ALL'
    }
  ]
}

const masterNc = {
  roles: [
    {
      'countryIso': null,
      'role': 'NATIONAL_CORRESPONDENT_ALL'
    }
  ]
}

const mixedBagButMasterOfBoth = {
  roles: [
    {
      'countryIso': null,
      'role': 'REVIEWER_ALL'
    },
    {
      'countryIso': null,
      'role': 'NATIONAL_CORRESPONDENT_ALL'
    },
    {
      'countryIso': 'ERI',
      'role': 'NATIONAL_CORRESPONDENT'
    },
    {
      'countryIso': 'AUS',
      'role': 'REVIEWER'
    }
  ]

}

describe('countryRole', () => {
  it('Gives N/A role when user has no access to the country', () => {
    assert.equal(countryRole.noRole, countryRole.mostPowerfulRole('FIN', plainUserInfo))
  })
  it('Gives NATIONAL_CORRESPONDENT when user has matching role for country', () => {
    assert.equal(countryRole.nationalCorrespondent, countryRole.mostPowerfulRole('ERI', plainUserInfo))
  })
  it('Gives REVIEWER when user has matching role for country', () => {
    assert.equal(countryRole.reviewer, countryRole.mostPowerfulRole('ARM', plainUserInfo))
  })
  it('Gives REVIEWER (the more powerful one) when user has both NC and REVIEWER for country', () => {
    assert.equal(countryRole.reviewer, countryRole.mostPowerfulRole('AUS', plainUserInfo))
  })
  it('Gives REVIEWER for REVIEWER_ALL user', () => {
    assert.equal(countryRole.reviewer, countryRole.mostPowerfulRole('AUS', masterReviewer))
  })
  it('Gives NATIONAL_CORRESPONDENT for NATIONAL_CORRESPONDENT_ALL user', () => {
    assert.equal(countryRole.nationalCorrespondent, countryRole.mostPowerfulRole('DOESNT MATTER BLAH BLAH', masterNc))
  })
  it('Gives REVIEWER for user with all kinds of stuff but REVIEWER_ALL which shall triumph', () => {
    assert.equal(countryRole.reviewer, countryRole.mostPowerfulRole('still doesnt matter', mixedBagButMasterOfBoth))
  })
})
