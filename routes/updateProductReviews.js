/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */

const utils = require('../lib/utils')
const challenges = require('../data/datacache').challenges
const db = require('../data/mongodb')
const insecurity = require('../lib/insecurity')

module.exports = function productReviews () {
  return (req, res, next) => {
    const user = insecurity.authenticatedUsers.from(req)
    db.reviews.update(
      { _id: req.body.id },
      { $set: { message: req.body.message } },
      { multi: true }
    ).then(
      result => {
        utils.solveIf(challenges.noSqlReviewsChallenge, () => { return result.modified > 1 })
        utils.solveIf(challenges.forgedReviewChallenge, () => { return user && user.data && result.original[0].author !== user.data.email && result.modified === 1 })
        res.json(result)
      }, err => {
        res.status(500).json(err)
      })
  }
}

// create and export a function to delete reviews
module.exports.deleteReviews = function deleteReviews () {
  return (req, res, next) => {
    const id = req.params.id
    db.reviews.remove({ _id: id })
      .then(() => {
        res.status(200).json({ status: 'success', data: 'Review deleted!' })
      }).catch(error => {
        next(error)
      })
  }
}