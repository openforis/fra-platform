module.exports.sendErr = (res, err) => console.error(err) || res.status(500).json({error: 'Could not serve', err})
