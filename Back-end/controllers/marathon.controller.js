/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const { ObjectId } = require('mongodb');
const Marathon = require('../models/Marathon');
const { errorHandle, successHandle, errorMongo, findUserId } = require('../helpers/index');
const methods = {
  async createStepOne(req, res) {
    try {
      const { prefix_name, first_name, last_name, date_of_birth, email, tax_id, address, phone_number, image, BIB } = req.body;
      const create = new Marathon({
        prefix_name,
        first_name,
        last_name,
        date_of_birth,
        email,
        tax_id,
        address,
        phone_number,
        image,
        BIB,
        user_id: findUserId(req),
      });
      create.save((marathonError) => {
        if (marathonError) return res.error(errorHandle(errorMongo(marathonError), 400));
        else res.success(successHandle({ _id: create._id }));
      });
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },

  async updateStepOne(req, res) {
    const { id } = req.params;
    const { prefix_name, first_name, last_name, date_of_birth, email, tax_id, address, phone_number, image, BIB } = req.body;
    try {
      const update = await Marathon.findByIdAndUpdate(id, {
        prefix_name,
        first_name,
        last_name,
        date_of_birth,
        email,
        tax_id,
        address,
        phone_number,
        image,
        BIB,
      });
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },

  async updateStepTwo(req, res) {
    const { applicant_background_runner, applicant_background_runner_time } = req.body;
    const { id } = req.params;
    try {
      const update = await Marathon.findByIdAndUpdate(id, {
        applicant_background_runner,
        applicant_background_runner_time,
      });
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async updateStepThree(req, res) {
    const { emergency_contact } = req.body;
    const { id } = req.params;
    try {
      const update = await Marathon.findByIdAndUpdate(id, {
        emergency_contact,
      });
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async updateStepFour(req, res) {
    const {
      blood_type,
      medical_allergy,
      chronic_health,
      surgery_before,
      plan_baby,
      medicine_to_take,
      injured_from_marathon,
      exercise,
      sick,
    } = req.body;
    const { id } = req.params;
    try {
      const update = await Marathon.findByIdAndUpdate(id, {
        blood_type,
        medical_allergy,
        chronic_health,
        surgery_before,
        plan_baby,
        medicine_to_take,
        injured_from_marathon,
        exercise,
        sick,
      });
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },

  async updateStepFive(req, res) {
    const { t_shirt_size } = req.body;
    const { id } = req.params;
    try {
      const update = await Marathon.findByIdAndUpdate(id, {
        t_shirt_size,
      });
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },

  async updateStepSubmit(req, res) {
    const { id } = req.params;
    try {
      req.body.user_id = findUserId(req);
      req.body.draft = false;
      const update = await Marathon.findByIdAndUpdate(id, req.body);
      if (!update) return res.error(errorHandle('Can not find The marathon ID', 400));
      res.success(successHandle({ _id: update._id }));
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
};

module.exports = { ...methods };
