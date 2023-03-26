'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_clinic_cpectialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Doctor_clinic_cpectialty.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        spectialtyId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Doctor_clinic_cpectialty',
    });
    return Doctor_clinic_cpectialty;
};