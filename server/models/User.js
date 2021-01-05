const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Your First Name is required',
        },
      },
    },

    last_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Your Last Name is required',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
        // is: {
        //   msg: 'Invalid Password!',
        //   args: [
        //     '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{}$',
        //   ],
        // },
      },
    },

    bio: {
      type: DataTypes.STRING(160),
      allowNull: true,
      defaultValue: '',
    },
  },
  { tableName: 'users', timestamps: false, underscored: true }
);

module.exports = User;
