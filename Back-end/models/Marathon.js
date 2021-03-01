const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    draft: { type: Boolean, default: true },
    prefix_name: { type: String, enum: ['นาย', 'นาง', 'นางสาว', 'MR', 'MISS', 'MS'] },
    first_name: { type: String },
    last_name: { type: String },
    date_of_birth: { type: Date },
    email: { type: String },
    tax_id: { type: String },
    address: { type: String },
    phone_number: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'File_upload' },
    BIB: { type: String },

    applicant_background_runner: { type: String },
    applicant_background_runner_time: { type: String },

    emergency_contact: {
      type: Array,
      default: [
        { first_name: null, last_name: null, relationship: null, phone_number: null },
        { first_name: null, last_name: null, relationship: null, phone_number: null },
      ],
    },

    blood_type: { type: String, enum: ['A', 'B', 'O', 'AB'] },
    medical_allergy: { type: String, default: 'No' },
    chronic_health: { type: String, default: 'No' },
    surgery_before: { type: String, default: 'No' },
    plan_baby: { type: String, default: 'No' },
    medicine_to_take: { type: String, default: 'No' },
    injured_from_marathon: { type: String, default: 'No' },
    exercise: { type: String, enum: ['1-2', '3-5', 'all'], default: '1-2' },
    sick: { type: String, default: 'No' },
    t_shirt_size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Marathon', schema);
