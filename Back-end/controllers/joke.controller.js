/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { ObjectId } = require('mongodb');
const Joke = require('../models/Joke');
const User = require('../models/User');
const { errorHandle, successHandle, errorMongo, findUserId } = require('../helpers/index');

const scopeSearch = (req) => {
  const $or = [];
  if (req.query.joke) $or.push({ joke: { $regex: req.query.joke, $options: 'i' } });
  const query = $or.length > 0 ? { $or } : {};
  let sort = { updatedAt: -1 };
  if (req.query.order_by_field && req.query.order_by)
    sort = {
      [req.query.order_by_field]: req.query.order_by.toLowerCase() === 'desc' ? -1 : 1,
    };
  return { query, sort };
};

const methods = {
  async findById(req, res) {
    const { id } = req.params;
    try {
      const joke = await Joke.findById(id)
        .select({
          _id: 0,
          like: 1,
          dislike: 1,
          joke: 1,
          user_id: 1,
        })
        .populate('user_id', ['email'])
        .exec();
      res.success(successHandle(joke));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async findAll(req, res) {
    const { query, sort } = scopeSearch(req);
    const limit = +req.query.size || 10;
    const offset = +(limit * ((req.query.page || 1) - 1));
    try {
      const jokes = await Joke.aggregate([
        {
          $match: query,
        },
        {
          $sort: sort,
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_count',
          },
        },
        {
          $facet: {
            count: [
              {
                $count: 'value',
              },
            ],
            pipelineResults: [
              {
                $project: {
                  joke: '$joke',
                  user: {
                    $first: '$user_count.email',
                  },
                  like: '$like',
                  dislike: '$dislike',
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: '$count',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  data: '$pipelineResults',
                },
                {
                  count: '$count.value',
                },
              ],
            },
          },
        },
      ]);
      if (jokes.length <= 0) return res.success(successHandle({ data: [], count: 0 }));
      res.success(successHandle(jokes));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async create(req, res) {
    try {
      const user_id = findUserId(req);
      const { joke } = req.body;
      const find_user_id = await User.aggregate([
        {
          $match: {
            _id: new ObjectId(user_id),
          },
        },
        {
          $project: {
            _id: 1,
          },
        },
      ]);
      if (find_user_id.length <= 0) return res.error(errorHandle('Can not find user', 400));
      const create = new Joke({
        joke,
        user_id: find_user_id[0],
      });
      create.save((jokeError) => {
        if (jokeError) res.error(errorHandle(errorMongo(jokeError), 400));
        else res.success(successHandle({ _id: create._id }));
      });
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async like(req, res) {
    try {
      const { id } = req.params;
      const joke = await Joke.findById(id).exec();
      if (!joke) return res.error(errorHandle('Can not find Joke', 400));
      const update = await Joke.findByIdAndUpdate(id, {
        like: +joke.like + 1,
      });
      if (update) return res.success(successHandle({ _id: update._id }));
      return res.success(successHandle());
    } catch (error) {
      return res.error(errorHandle(errorMongo(error), 400));
    }
  },
  async dislike(req, res) {
    try {
      const { id } = req.params;
      const joke = await Joke.findById(id).exec();
      if (!joke) return res.error(errorHandle('Can not find Joke', 400));
      const update = await Joke.findByIdAndUpdate(id, {
        dislike: +joke.dislike + 1,
      });
      if (update) return res.success(successHandle({ _id: update._id }));
      return res.success(successHandle());
    } catch (error) {
      return res.error(errorHandle(errorMongo(error), 400));
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const remove = await Joke.findOneAndRemove({ _id: id });
      if (remove) return res.success(successHandle({ _id: id }));
      return res.success(successHandle());
    } catch (error) {
      return res.error(errorHandle(error.message));
    }
  },
};

module.exports = { ...methods };
