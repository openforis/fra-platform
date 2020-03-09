const type = require('./type')

const designatedManagementObjective = require('./fra2020/designatedManagementObjective')

const sectionSpecs = {
  [type.fra2020]: {
    // section 3
    designatedManagementObjective
  }
}

module.exports = sectionSpecs
